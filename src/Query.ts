// @ts-ignore
import stringify from "fast-json-stable-stringify"
import { DocumentNode, print } from "graphql"

import { StoreType } from "./MSTGQLStore"
import { action, observable } from "mobx"

export type CaseHandlers<T, R> = {
  loading(): R
  error(error: any): R
  data(data: T): R
}

export type FetchPolicy =
  | "cache-first" // Use cache if available, avoid network request if possible
  | "cache-only" // Use cache if available, or error
  | "cache-and-network" // Use cache, but still send request and update cache in the background
  | "network-only" // Skip cache, but cache the result
  | "no-cache" // Skip cache, and don't cache the response either

export interface QueryOptions {
  fetchPolicy?: FetchPolicy
  noSsr?: boolean
}

const isServer: boolean = typeof window === "undefined"

export class Query<T = unknown> implements PromiseLike<T> {
  @observable loading = false
  @observable.ref data: T | undefined = undefined
  @observable error: any = undefined

  public query: string
  public promise!: Promise<T>
  private fetchPolicy: FetchPolicy
  private cacheKey: string

  constructor(
    public store: StoreType,
    query: string | DocumentNode,
    public variables: any,
    public options: QueryOptions = {}
  ) {
    this.query = typeof query === "string" ? query : print(query)
    // possible optimization: merge double in-flight requests
    let fetchPolicy = options.fetchPolicy || "cache-and-network"
    if (
      this.store.ssr &&
      !this.options.noSsr &&
      (isServer || !store.__afterInit)
    ) {
      fetchPolicy = "cache-first"
    }
    this.fetchPolicy = fetchPolicy
    this.cacheKey = this.query + stringify(variables)
    if (this.store.ssr && this.options.noSsr && isServer) {
      this.promise = Promise.resolve() as any
      return
    }
    const inCache = this.store.__queryCache.has(this.cacheKey)
    switch (this.fetchPolicy) {
      case "no-cache":
      case "network-only":
        this.fetchResults()
        break
      case "cache-only":
        if (!inCache) {
          this.error = new Error(
            `No results for query ${this.query} found in cache, and policy is cache-only`
          )
          this.promise = Promise.reject(this.error)
        } else {
          this.useCachedResults()
        }
        break
      case "cache-and-network":
        if (inCache) {
          this.useCachedResults()
          this.refetch() // refetch async, so that callers chaining to the initial promise should resovle immediately!
        } else {
          this.fetchResults()
        }
        break
      case "cache-first":
        if (inCache) {
          this.useCachedResults()
        } else {
          this.fetchResults()
        }
        break
    }
  }

  refetch = (): Promise<T> => {
    return Promise.resolve().then(
      action(() => {
        if (!this.loading) {
          this.fetchResults()
        }
        return this.promise
      })
    )
  }

  private fetchResults() {
    this.loading = true
    this.promise = this.store
      .rawRequest(this.query, this.variables)
      .then((data: any) => {
        // cache query and response
        if (this.fetchPolicy !== "no-cache") {
          this.store.__cacheResponse(this.cacheKey, this.store.deflate(data))
        }
        return this.store.merge(data)
      })
    if (this.store.ssr) {
      this.promise = this.promise.finally(() => {
        this.store.unpushPromise(this.promise)
      })
      this.store.pushPromise(this.promise)
    }
    this.promise.then(
      action((data: any) => {
        this.loading = false
        this.data = data
      }),
      action(error => {
        this.loading = false
        this.error = error
      })
    )
  }

  private useCachedResults() {
    this.data = this.store.merge(this.store.__queryCache.get(this.cacheKey))
    this.promise = Promise.resolve(this.data!)
  }

  case<R>(handlers: CaseHandlers<T, R>): R {
    return this.loading && !this.data
      ? handlers.loading()
      : this.error
      ? handlers.error(this.error)
      : handlers.data(this.data!)
  }

  currentPromise() {
    return this.promise
  }

  then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | PromiseLike<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | PromiseLike<TResult2>)
      | undefined
      | null
  ): PromiseLike<TResult1 | TResult2>
  then(onfulfilled: any, onrejected: any) {
    return this.promise.then(
      d => {
        this.store.__runInStoreContext(() => onfulfilled(d))
      },
      e => {
        this.store.__runInStoreContext(() => onrejected(e))
      }
    )
  }
}
