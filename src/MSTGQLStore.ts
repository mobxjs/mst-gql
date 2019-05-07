import { SubscriptionClient } from "subscriptions-transport-ws"
import { types, getEnv, recordPatches } from "mobx-state-tree"
import { GraphQLClient } from "graphql-request"
import { action, extendObservable, observable } from "mobx"

import { mergeHelper } from "./mergeHelper"
import { getFirstValue } from "./utils"

export interface QueryOptions {
  raw?: boolean
  // TODO: headers
  // TODO: cacheStrategy
}

export type CaseHandlers<T, R> = {
  fetching(): R
  error(error: any): R
  data(data: T): R
}

export interface QueryResult<T = unknown> extends Promise<T> {
  fetching: boolean
  data: T | undefined
  error: any
  refetch(): Promise<T>
  case<R>(handlers: CaseHandlers<T, R>): R
}

export const MSTGQLStore = types.model("MSTGQLStore").actions(self => {
  const {
    gqlHttpClient,
    gqlWsClient
  }: { gqlHttpClient: GraphQLClient; gqlWsClient: SubscriptionClient } = getEnv(
    self
  )
  if (!gqlHttpClient && !gqlWsClient)
    throw new Error(
      "Either gqlHttpClient or gqlWsClient (or both) should provided in the MSTGQLStore environment"
    )

  function merge(data: unknown) {
    if (Array.isArray(data)) return data.map(item => mergeHelper(self, item))
    else return mergeHelper(self, data)
  }

  function makeSingleRequest(query: string, variables: any): Promise<any> {
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
  ): QueryResult<T> {
    // TODO: support options.headers
    // TODO: support options.cacheStrategy
    const req = makeSingleRequest(query, variables)

    const handleSuccess = action(data => {
      const value = getFirstValue(data)
      if (options.raw) {
        promise.fetching = false
        return Promise.resolve((promise.data = value))
      } else {
        try {
          promise.fetching = false
          const normalized = (self as any).merge(value)
          return Promise.resolve((promise.data = normalized))
        } catch (e) {
          return Promise.reject((promise.error = e))
        }
      }
    })

    const handleFailure = action(error => {
      promise.fetching = false
      return Promise.reject((promise.error = error))
    })

    const promise: QueryResult<T> = req.then(
      handleSuccess,
      handleFailure
    ) as any
    extendObservable(
      promise,
      {
        fetching: true,
        data: undefined,
        error: undefined,
        refetch() {
          // refech returs the old observable states
          promise.fetching = false
          return makeSingleRequest(query, variables).then(
            handleSuccess,
            handleFailure
          )
        },
        case<R>(handlers: CaseHandlers<T, R>): R {
          return promise.fetching && !promise.data
            ? handlers.fetching()
            : promise.error
            ? handlers.error(promise.error)
            : handlers.data(promise.data!)
        }
      } as any,
      { data: observable.ref }
    )
    return promise
  }

  function mutate<T>(
    mutation: string,
    params?: any,
    optimisticUpdate?: () => void
  ): QueryResult<T> {
    if (optimisticUpdate) {
      const recorder = recordPatches(self)
      optimisticUpdate()
      recorder.stop()
      const promise = query<T>(mutation, params)
      promise.catch(e => {
        recorder.undo()
      })
      return promise
    } else {
      return query(mutation, params)
    }
  }

  function subscribe(query: string, variables?: any): () => void {
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

  return { merge, mutate, query, subscribe }
})
