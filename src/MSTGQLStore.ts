import { SubscriptionClient } from "subscriptions-transport-ws"
import { types, getEnv, recordPatches, IAnyModelType } from "mobx-state-tree"
import { GraphQLClient } from "graphql-request"

import { mergeHelper } from "./mergeHelper"
import { getFirstValue } from "./utils"
import { QueryOptions, Query } from "./Query"

export const MSTGQLStore = types
  .model("MSTGQLStore", {
    __queryCache: types.optional(types.map(types.frozen()), {})
  })
  .actions(self => {
    const {
      gqlHttpClient,
      gqlWsClient
    }: {
      gqlHttpClient: GraphQLClient
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
      query: string,
      variables?: any,
      options: QueryOptions = {}
    ): Query<T> {
      return new Query(self as StoreType, query, variables, options)
    }

    function mutate<T>(
      mutation: string,
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
    function subscribe<T = any>(query: string, variables?: any): () => void {
      if (!gqlWsClient) throw new Error("No WS client available")
      const sub = gqlWsClient
        .request({
          query,
          variables
        })
        .subscribe({
          next(data) {
            if (data.errors) throw new Error(JSON.stringify(data.errors))
            else {
              ;(self as any).merge(getFirstValue(data.data))
            }
          }
        })
      return () => sub.unsubscribe()
    }

    // exposed actions
    return {
      merge,
      mutate,
      query,
      subscribe,
      rawRequest,
      __cacheResponse(key: string, response: any) {
        self.__queryCache.set(key, response)
      }
    }
  })

// TODO: rename to configureStoreMixin
export function typeInfo(
  knownTypes: [string, IAnyModelType][],
  rootTypes: string[]
) {
  const kt = new Map(knownTypes)
  const rt = new Set(rootTypes)
  return () => ({
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
