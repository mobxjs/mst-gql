import { SubscriptionClient } from "subscriptions-transport-ws"
import { types, getEnv, recordPatches, IAnyModelType } from "mobx-state-tree"
import { DocumentNode } from "graphql"

import { mergeHelper } from "./mergeHelper"
import { getFirstValue } from "./utils"
import { QueryOptions, Query } from "./Query"

export interface RequestHandler<T = any> {
  request(query: string, variables: any): Promise<T>
}

// TODO: also provide an interface for stream handler

export const MSTGQLStore = types
  .model("MSTGQLStore", {
    __queryCache: types.optional(types.map(types.frozen()), {})
  })
  .volatile(
    (self): { ssr: boolean; __promises: Set<Promise<unknown>> } => {
      const {
        ssr = false
      }: {
        ssr: boolean
      } = getEnv(self)
      return {
        __promises: new Set(),
        ssr
      }
    }
  )
  .actions(self => {
    const {
      gqlHttpClient, // TODO: rename to requestHandler
      gqlWsClient // TODO: rename to streamHandler
    }: {
      gqlHttpClient: RequestHandler
      gqlWsClient: SubscriptionClient
    } = getEnv(self)
    if (!gqlHttpClient && !gqlWsClient)
      throw new Error(
        "Either gqlHttpClient or gqlWsClient (or both) should provided in the MSTGQLStore environment"
      )

    function merge(data: unknown) {
      return mergeHelper(self, data)
    }

    function rawRequest(query: string, variables: any): Promise<any> {
      if (gqlHttpClient) return gqlHttpClient.request(query, variables)
      else {
        return new Promise((resolve, reject) => {
          gqlWsClient
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
      query: string | DocumentNode,
      variables?: any,
      onData?: (item: T) => void
    ): () => void {
      if (!gqlWsClient) throw new Error("No WS client available")
      const sub = gqlWsClient
        .request({
          query,
          variables
        })
        .subscribe({
          next(data) {
            if (data.errors) throw new Error(JSON.stringify(data.errors))
            ;(self as any).__runInStoreContext(() => {
              const res = (self as any).merge(getFirstValue(data.data))
              if (onData) onData(res)
              return res
            })
          }
        })
      return () => sub.unsubscribe()
    }

    function pushPromise(promise: Promise<{}>) {
      self.__promises.add(promise)
    }

    function unpushPromise(promise: Promise<{}>) {
      self.__promises.delete(promise)
    }

    // exposed actions
    return {
      merge,
      mutate,
      query,
      subscribe,
      rawRequest,
      pushPromise,
      unpushPromise,
      __runInStoreContext<T>(fn: () => T) {
        return fn()
      },
      __cacheResponse(key: string, response: any) {
        self.__queryCache.set(key, response)
      }
    }
  })

export function configureStoreMixin(
  knownTypes: [string, () => IAnyModelType][],
  rootTypes: string[]
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
      }
    }
  })
}

export type StoreType = typeof MSTGQLStore.Type
