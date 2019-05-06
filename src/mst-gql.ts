import {
  types,
  getEnv,
  getParent,
  recordPatches,
  getPropertyMembers,
  isPrimitiveType,
  IAnyModelType
} from "mobx-state-tree"
import {observable, extendObservable, action} from "mobx"

import {GraphQLClient} from "graphql-request"
import {SubscriptionClient} from "subscriptions-transport-ws"

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
  }: {gqlHttpClient: GraphQLClient; gqlWsClient: SubscriptionClient} = getEnv(
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
      {data: observable.ref}
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
          ;(self as any).merge(getFirstValue(data.data))
        }
      })
    return () => sub.unsubscribe()
  }

  return {merge, mutate, query, subscribe}
})

export const MSTGQLObject = types
  .model("MSTGQLObject", {
    __typename: types.string,
    id: types.identifier
  })
  .views(self => ({
    get store(): typeof MSTGQLStore.Type {
      return getParent(self, 2)
    }
  }))

export type HttpClientOptions = ConstructorParameters<typeof GraphQLClient>[1]

export function createHttpClient(url: string, options: HttpClientOptions = {}) {
  return new GraphQLClient(url, options)
}

function typenameToCollectionName(typename: string) {
  return typename.toLowerCase() + "s"
}

function mergeHelper(store: any, itemData: any) {
  const {__typename, id} = itemData
  if (__typename === undefined)
    throw new Error(
      "__typename field is not available on " + JSON.stringify(itemData)
    )
  if (id === undefined)
    throw new Error("id field is not available on " + JSON.stringify(itemData))
  const collection = typenameToCollectionName(__typename)
  const current = store[collection].get(id)
  if (!current) {
    store[collection].set(id, itemData)
    return store[collection].get(id)
  } else {
    // TODO: merge should be recursive for complex values
    Object.assign(current, itemData)
    return current
  }
}

function getFirstValue(data: any) {
  const keys = Object.keys(data)
  if (keys.length !== 1)
    throw new Error(
      `Expected exactly one response key, got: ${keys.join(", ")}`
    )
  return data[keys[0]]
}

export const coreFields = `\n__typename\nid\n`

export function primitiveFields(
  mstType: IAnyModelType,
  exclude: string[] = []
) {
  const excludes = new Set(exclude)
  const primitives = new Set(["id", "__typename"])
  const reflectionData = getPropertyMembers(mstType)
  for (const key in reflectionData.properties)
    if (!excludes.has(key)) {
      const type = reflectionData.properties[key]
      if (isPrimitiveType(type)) primitives.add(key)
    }
  return Array.from(primitives).join("\n")
}

// TODO: also have a utility for nested objects?
