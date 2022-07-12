import camelcase from "camelcase"
import { DocumentNode } from "graphql"
import {
   getEnv,
   IAnyModelType,
   Instance,
   recordPatches,
   types
} from "mobx-state-tree"
import pluralize from "pluralize"
import { SubscriptionClient } from "subscriptions-transport-ws"
import { Client as GraphqlClient } from 'graphql-ws';

import { deflateHelper } from "./deflateHelper"
import { mergeHelper } from "./mergeHelper"
import { Query, QueryHttpClientOptions, QueryOptions } from "./Query"
import { getFirstValue } from "./utils"

type RequestOptions = {
   document: string
   variables?: any
   signal?: QueryHttpClientOptions["signal"]
}

export type RequestHandler<T = any> = {
   request(query: string, variables: any): Promise<T>
   request(options?: RequestOptions): Promise<T>
}

// TODO: also provide an interface for stream handler

export const MSTGQLStore = types
   .model("MSTGQLStore", {
      __queryCache: types.optional(types.map(types.frozen()), {})
   })
   .volatile(
      (
         self
      ): {
         ssr: boolean
         __promises: Map<string, Promise<unknown>>
         __afterInit: boolean
         gqlHttpClient: RequestHandler
         gqlWsClient: SubscriptionClient
         graphqlWsClient: GraphqlClient
      } => {
         const {
            ssr = false,
            gqlHttpClient,
            gqlWsClient,
            graphqlWsClient
         }: {
            ssr: boolean
            gqlHttpClient: RequestHandler
            gqlWsClient: SubscriptionClient
            graphqlWsClient: GraphqlClient
         } = getEnv(self)
         return {
            ssr,
            gqlHttpClient,
            gqlWsClient,
            __promises: new Map(),
            __afterInit: false,
            graphqlWsClient
         }
      }
   )
   .actions((self) => {
      Promise.resolve().then(() => (self as any).__onAfterInit())

      function merge(data: unknown) {
         return mergeHelper(self, data)
      }

      function deflate(data: unknown) {
         return deflateHelper(self, data)
      }

      function rawRequest(
         query: string,
         variables: any,
         options?: QueryHttpClientOptions
      ): Promise<any> {
         if (!self.gqlHttpClient && !self.gqlWsClient)
            throw new Error(
               "Either gqlHttpClient or gqlWsClient (or both) should provided in the MSTGQLStore environment"
            )
         if (self.gqlHttpClient) {
            if (options)
               return self.gqlHttpClient.request({
                  document: query,
                  variables,
                  signal: options.signal
               })
            else return self.gqlHttpClient.request(query, variables)
         } else {
            return new Promise((resolve, reject) => {
               self.gqlWsClient
                  .request({
                     query,
                     variables
                  })
                  .subscribe({
                     next(data) {
                        resolve(data.data)
                     },
                     error: reject
                  })
            })
         }
      }

      function query<T>(
         query: string | DocumentNode,
         variables?: any,
         options: QueryOptions = {}
      ): Query<T> {
         return new Query(self as StoreType, query, variables, options)
      }

      function mutate<T>(
         mutation: string | DocumentNode,
         variables?: any,
         optimisticUpdate?: () => void
      ): Query<T> {
         if (optimisticUpdate) {
            const recorder = recordPatches(self)
            optimisticUpdate()
            recorder.stop()
            const q = query<T>(mutation, variables, {
               fetchPolicy: "network-only"
            })
            q.currentPromise().catch(() => {
               recorder.undo()
            })
            return q
         } else {
            return query(mutation, variables, {
               fetchPolicy: "network-only"
            })
         }
      }

      // N.b: the T is ignored, but it does simplify code generation
      function subscribe<T = any>(
         query: string | DocumentNode | undefined,
         variables?: any,
         onData?: (item: T) => void,
         onError: (error: Error) => void = (error) => {
            throw error
         }
      ): () => void {
         let cleanup: () => void;
         if (self.graphqlWsClient) {
            cleanup = self.graphqlWsClient
               .subscribe(
                  {
                     query: query ? query.toString() : '',
                  },
                  {
                     next: (data) => {
                        (self as any).__runInStoreContext(() => {
                           // CABDEBUG
                           console.log('DATA', JSON.stringify(data));
                           const res = (self as any).merge(getFirstValue(data))
                           if (onData) onData(res)
                           return res
                        })
                     },
                     // error: (error) => { onError(new Error(JSON.stringify(error))) },
                     error: (error) => { console.error('graphqlWsClient subscribe error', error) },
                     complete: () => { console.log('graphqlWsClient complete') },
                  },
               )
         }
         else {
            if (!self.gqlWsClient) throw new Error("No WS client available")
            const sub = self.gqlWsClient
               .request({
                  query: query ? query.toString() : '',
                  variables
               })
               .subscribe({
                  next(data) {
                     if (data.errors) {
                        return onError(new Error(JSON.stringify(data.errors)))
                     }
                     ; (self as any).__runInStoreContext(() => {
                        const res = (self as any).merge(getFirstValue(data.data))
                        if (onData) onData(res)
                        return res
                     })
                  }
               });
            cleanup = () => { sub.unsubscribe() }
         }
         return cleanup
      }

      function setHttpClient(value: RequestHandler) {
         self.gqlHttpClient = value
      }

      function setWsClient(value: SubscriptionClient) {
         self.gqlWsClient = value
      }

      function setGraphqlWsClient(value: GraphqlClient) {
         self.graphqlWsClient = value
      }

      // exposed actions
      return {
         merge,
         deflate,
         mutate,
         query,
         subscribe,
         rawRequest,
         setHttpClient,
         setWsClient,
         setGraphqlWsClient,
         __pushPromise(promise: Promise<{}>, queryKey: string) {
            self.__promises.set(queryKey, promise)
            const onSettled = () => self.__promises.delete(queryKey)
            promise.then(onSettled, onSettled)
         },
         __runInStoreContext<T>(fn: () => T) {
            return fn()
         },
         __cacheResponse(key: string, response: any) {
            self.__queryCache.set(key, response)
         },
         __onAfterInit() {
            self.__afterInit = true
         }
      }
   })

export function configureStoreMixin(
   knownTypes: [string, () => IAnyModelType][],
   rootTypes: string[],
   namingConvention?: string
) {
   const kt = new Map()
   const rt = new Set(rootTypes)
   return () => ({
      actions: {
         afterCreate() {
            // initialized lazily, so that there are no circular dep issues
            knownTypes.forEach(([key, typeFn]) => {
               const type = typeFn()
               if (!type)
                  throw new Error(
                     `The type provided for '${key}' is empty. Probably this is a module loading issue`
                  )
               kt.set(key, type)
            })
         }
      },
      views: {
         isKnownType(typename: string): boolean {
            return kt.has(typename)
         },
         isRootType(typename: string): boolean {
            return rt.has(typename)
         },
         getTypeDef(typename: string): IAnyModelType {
            return kt.get(typename)!
         },
         getCollectionName(typename: string): string {
            if (namingConvention == "js") {
               // Pluralize only last word (pluralize may fail with words that are
               // not valid English words as is the case with LongCamelCaseTypeNames)
               const newName = camelcase(typename)
               const parts = newName.split(/(?=[A-Z])/)
               parts[parts.length - 1] = pluralize(parts[parts.length - 1])
               return parts.join("")
            }
            return typename.toLowerCase() + "s"
         }
      }
   })
}

export type StoreType = Instance<typeof MSTGQLStore>
