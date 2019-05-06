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
