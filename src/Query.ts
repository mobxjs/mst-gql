import { StoreType } from "./MSTGQLStore"
import { getFirstValue } from "./utils"
import { observable, action } from "mobx"

export type CaseHandlers<T, R> = {
  fetching(): R
  error(error: any): R
  data(data: T): R
}

export interface QueryOptions {
  raw?: boolean
  // TODO: headers
  // TODO: cacheStrategy
}

export class Query<T = unknown> {
  @observable fetching = false
  @observable.ref data: T | undefined = undefined
  @observable error: any = undefined

  private promise!: Promise<T>
  private onResolve!: (data: T) => void
  private onReject!: (error: any) => void

  constructor(
    public store: StoreType,
    public query: string,
    public variables: any,
    public options: QueryOptions = {}
  ) {
    // TODO: support options.headers
    // TODO: support options.cacheStrategy
    this.refetch()
  }

  @action onSuccess = (data: any) => {
    const value = getFirstValue(data)
    if (this.options.raw) {
      this.fetching = false
      this.data = data
      this.onResolve(this.data!)
    } else {
      try {
        this.fetching = false
        const normalized = this.store.merge(value)
        this.data = normalized
        this.onResolve(this.data!)
      } catch (e) {
        this.onFailure(e)
      }
    }
  }

  @action onFailure = (error: any) => {
    this.fetching = false
    this.error = error
    this.onReject(error)
  }

  refetch = () => {
    if (this.fetching)
      throw new Error("Can only refetch if not pending already")
    this.fetching = true
    this.promise = new Promise<T>((resolve, reject) => {
      this.onResolve = resolve
      this.onReject = reject
    })
    this.store
      .rawRequest(this.query, this.variables)
      .then(this.onSuccess, this.onFailure)
  }

  case<R>(handlers: CaseHandlers<T, R>): R {
    return this.fetching && !this.data
      ? handlers.fetching()
      : this.error
      ? handlers.error(this.error)
      : handlers.data(this.data!)
  }

  toPromise(): Promise<T> {
    return this.promise
  }
}
