import { DocumentNode } from "graphql"
import { renderToStaticMarkup } from "react-dom/server"

import { Query, FetchPolicy } from "./Query"
import { MSTGQLStore } from "./MSTGQLStore"

// import react namespace only; statement gets removed after transpiling
declare var ReactNamespace: typeof import("react")

export type QueryLike<STORE, DATA> =
  | ((store: STORE) => Query<DATA>)
  | Query<DATA>
  | string
  | DocumentNode

export function createStoreContext<STORE extends typeof MSTGQLStore.Type>(
  React: typeof ReactNamespace
) {
  return React.createContext<STORE>(null as any)
}

export async function getDataFromTree<STORE extends typeof MSTGQLStore.Type>(
  tree: React.ReactElement<any>,
  client: STORE,
  renderFunction: (
    tree: React.ReactElement<any>
  ) => string = renderToStaticMarkup
): Promise<string> {
  const html = renderFunction(tree)
  await Promise.all(client.__promises as Promise<{}>[])
  client.cleanPromises()
  return html
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
  if (typeof window === "undefined") {
    const queryPromise = store.query<DATA>(query, variables, {
      fetchPolicy: fetchPolicy,
      raw: raw
    })
    store.pushPromise(queryPromise.promise)
    return queryPromise
  } else {
    return store.query(query, variables, {
      fetchPolicy: fetchPolicy,
      raw: raw
    })
  }
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
  context: React.Context<STORE>,
  React: typeof ReactNamespace
): UseQueryHook<STORE> {
  return function<DATA>(
    queryIn: undefined | QueryLike<STORE, DATA> = undefined,
    opts: UseQueryHookOptions<STORE> = {}
  ) {
    const store = (opts && opts.store) || React.useContext(context)
    // const prevData = useRef<DATA>() // TODO: is this useful?
    const [query, setQuery] = React.useState<Query<DATA> | undefined>(() => {
      if (!queryIn) return undefined
      return normalizeQuery(store, queryIn, opts)
    })

    const setQueryHelper = React.useCallback(
      (newQuery: QueryLike<STORE, DATA>) => {
        // if the current query had results already, save it in prevData
        // if (query && query.data) prevData.current = query.data
        setQuery(normalizeQuery(store, newQuery, opts))
      },
      []
    )

    // if new query or variables are passed in, replace the query!
    React.useEffect(() => {
      if (!queryIn || typeof queryIn === "function") return // ignore changes to initializer func
      setQueryHelper(queryIn)
    }, [queryIn, opts.raw, opts.fetchPolicy, JSON.stringify(opts.variables)]) // TODO: use a decent deep equal

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
