// @ts-ignore
import stringify from "fast-json-stable-stringify"
import { DocumentNode, print } from "graphql"

import { StoreType } from "./MSTGQLStore"
import { getFirstValue } from "./utils"
import { observable, action } from "mobx"
import { refStructEnhancer } from "mobx/lib/internal"

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
  raw?: boolean // If set, the response data is returned verbatim, rather than parsing them into the relevant MST models
  fetchPolicy?: FetchPolicy
}

export class Query<T = unknown> implements PromiseLike<T> {
  @observable loading = false
  @observable.ref data: T | undefined = undefined
  @observable error: any = undefined

  public query: string
  private fetchPolicy: FetchPolicy
  private cacheKey: string
  private promise!: Promise<T>
  private onResolve!: (data: T) => void
  private onReject!: (error: any) => void

  constructor(
    public store: StoreType,
    query: string | DocumentNode,
    public variables: any,
    public options: QueryOptions = {}
  ) {
    this.query = typeof query === "string" ? query : print(query)
    // possible optimization: merge double in-flight requests
    this.fetchPolicy = options.fetchPolicy || "cache-and-network"
    this.cacheKey = this.query + stringify(variables)
    this.initPromise()
    this.start()
  }

  private start() {
    const inCache = this.store.__queryCache.has(this.cacheKey)
    switch (this.fetchPolicy) {
      case "no-cache":
      case "network-only":
        this.fetchForCurrentPromise()
        break
      case "cache-only":
        if (!inCache)
          this.onFailure(
            new Error(
              `No results for query ${
                this.query
              } found in cache, and policy is cache-only`
            )
          )
        else this.onSuccess(this.store.__queryCache.get(this.cacheKey))
        break
      case "cache-and-network":
        if (inCache) {
          this.onSuccess(this.store.__queryCache.get(this.cacheKey))
          this.refetch() // refetch async, so that callers chaining to the initial promise should resovle immediately!
        } else {
          this.fetchForCurrentPromise()
        }
        break
      case "cache-first":
        if (inCache) this.onSuccess(this.store.__queryCache.get(this.cacheKey))
        else this.fetchForCurrentPromise()
        break
    }
  }

  initPromise() {
    this.promise = new Promise<T>((resolve, reject) => {
      this.onResolve = resolve
      this.onReject = reject
    })
  }

  @action onSuccess = (data: any) => {
    // cache query and response
    if (this.fetchPolicy !== "no-cache") {
      this.store.__cacheResponse(this.cacheKey, data)
    }

    const value = getFirstValue(data)
    if (this.options.raw) {
      this.loading = false
      this.data = data
      this.onResolve(this.data!)
    } else {
      try {
        this.loading = false
        const normalized = this.store.merge(value)
        this.data = normalized
        this.onResolve(this.data!)
      } catch (e) {
        this.onFailure(e)
      }
    }
  }

  @action onFailure = (error: any) => {
    this.loading = false
    this.error = error
    this.onReject(error)
  }

  refetch = (): Promise<T> => {
    return Promise.resolve().then(() => {
      if (this.loading) return this.currentPromise()
      this.initPromise()
      this.fetchForCurrentPromise()
      return this.promise
    })
  }

  private fetchForCurrentPromise() {
    this.loading = true

    this.store
      .rawRequest(this.query, this.variables)
      .then(this.onSuccess, this.onFailure)
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
  ): PromiseLike<TResult1 | TResult2> {
    return this.promise.then(onfulfilled, onrejected)
  }
}
