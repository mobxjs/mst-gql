import * as React from "react"
import { useState, useContext, useRef, useCallback } from "react"
import { observer } from "mobx-react"
import { DocumentNode } from "graphql"

import { Query, FetchPolicy } from "./Query"
import { MSTGQLStore } from "./MSTGQLStore"

export type QueryLike<STORE, DATA> =
  | ((store: STORE) => Query<DATA>)
  | Query<DATA>
  | string
  | DocumentNode

export type QueryProps<STORE, DATA> = {
  store?: STORE
  query?: QueryLike<STORE, DATA>
  variables?: any
  fetchPolicy?: FetchPolicy
  raw?: boolean
  children: (args: {
    store: STORE
    loading: boolean
    error: any
    data: DATA | undefined
    // prevData: DATA | undefined // set of previously fetched values, in case the query was replaced
    query: Query<DATA> | undefined
    setQuery: (query: QueryLike<STORE, DATA>) => void
  }) => React.ReactElement
}

export function createStoreContext<STORE extends typeof MSTGQLStore.Type>() {
  return React.createContext<STORE>(null as any)
}

function normalizeQuery<STORE extends typeof MSTGQLStore.Type, DATA>(
  store: STORE,
  query: QueryLike<STORE, DATA>,
  {
    variables,
    fetchPolicy = "cache-and-network",
    raw = false
  }: {
    variables?: any
    fetchPolicy?: FetchPolicy
    raw?: boolean
  }
): Query<DATA> {
  if (typeof query === "function") return query(store)
  if (query instanceof Query) return query
  return store.query(query, variables, { fetchPolicy, raw })
}

export type UseQueryHookOptions<STORE> = {
  store?: STORE
  variables?: any
  fetchPolicy?: FetchPolicy
  raw?: boolean
}

export type UseQueryHookResult<STORE, DATA> = {
  store: STORE
  loading: boolean
  error: any
  data: DATA | undefined
  // prevData: DATA | undefined // set of previously fetched values, in case the query was replaced
  query: Query<DATA> | undefined
  setQuery: (query: QueryLike<STORE, DATA>) => void
}

export type UseQueryHook<STORE> = <DATA>(
  query?: QueryLike<STORE, DATA>,
  options?: UseQueryHookOptions<STORE>
) => UseQueryHookResult<STORE, DATA>

export function createUseQueryHook<STORE extends typeof MSTGQLStore.Type>(
  context: React.Context<STORE>
): UseQueryHook<STORE> {
  return function<DATA>(
    queryIn: undefined | QueryLike<STORE, DATA> = undefined,
    opts: UseQueryHookOptions<STORE> = {}
  ) {
    const store = (opts && opts.store) || useContext(context)
    // const prevData = useRef<DATA>() // TODO: is this useful?
    const [query, setQuery] = useState<Query<DATA> | undefined>(() => {
      if (!queryIn) return undefined
      return normalizeQuery(store, queryIn, opts)
    })

    const setQueryHelper = useCallback((newQuery: QueryLike<STORE, DATA>) => {
      // if the current query had results already, save it in prevData
      // if (query && query.data) prevData.current = query.data
      setQuery(normalizeQuery(store, newQuery, opts))
    }, [])

    // if new query or variables are passed in, replace the query!
    React.useEffect(() => {
      if (!queryIn || typeof queryIn === "function") return // ignore changes to initializer func
      setQueryHelper(queryIn)
    }, [queryIn, opts.raw, opts.fetchPolicy, opts.variables]) // TODO: props.variables should be checked on shallow-equality!

    return {
      store,
      loading: query ? query.loading : false,
      error: query && query.error,
      data: query && query.data,
      // prevData: prevData.current,
      query,
      setQuery: setQueryHelper
    }
  }
}

export function createQueryComponent<STORE extends typeof MSTGQLStore.Type>(
  context: React.Context<STORE>
) {
  // TODO: it would be great to infer DATA from the props.query property, but saddly, we cannot infer the .children prop from the .query prop atm
  return observer(function Query<DATA = any>(props: QueryProps<STORE, DATA>) {
    const store = props.store || useContext(context)
    // const prevData = useRef<DATA>() // TODO: is this useful?
    const [query, setQuery] = useState<Query<DATA> | undefined>(() => {
      if (!props.query) return undefined
      return normalizeQuery<STORE, DATA>(store, props.query, props)
    })

    const setQueryHelper = useCallback((newQuery: QueryLike<STORE, DATA>) => {
      // if the current query had results already, save it in prevData
      // if (query && query.data) prevData.current = query.data
      setQuery(normalizeQuery(store, newQuery, props))
    }, [])

    // if new query or variables are passed in, replace the query!
    React.useEffect(() => {
      if (!props.query || typeof props.query === "function") return // ignore changes to initializer func
      setQueryHelper(props.query)
    }, [props.query, props.raw, props.fetchPolicy, props.variables]) // TODO: props.variables should be checked on shallow-equality!

    return props.children({
      store,
      loading: query ? query.loading : false,
      error: query && query.error,
      data: query && query.data,
      // prevData: prevData.current,
      query,
      setQuery: setQueryHelper
    })
  })
}
