import { Instance } from "mobx-state-tree"
import { DocumentNode } from "graphql"

import { Query, FetchPolicy } from "./Query"
import { MSTGQLStore } from "./MSTGQLStore"

// import react namespace only; statement gets removed after transpiling
declare var ReactNamespace: typeof import("react")

export type QueryLike<STORE, DATA> =
  | ((store: STORE) => Query<DATA>)
  | Query<DATA>
  | string
  | DocumentNode

export function createStoreContext<STORE extends Instance<typeof MSTGQLStore>>(
  React: typeof ReactNamespace
) {
  return React.createContext<STORE>(null as any)
}

export async function getDataFromTree<
  STORE extends Instance<typeof MSTGQLStore>
>(
  tree: React.ReactElement<any>,
  client: STORE,
  renderFunction: (
    tree: React.ReactElement<any>
  ) => string = require("react-dom/server").renderToStaticMarkup
): Promise<string> {
  while (true) {
    const html = renderFunction(tree)
    if (client.__promises.size === 0) {
      return html
    }
    await Promise.all(client.__promises.values())
  }
}

function normalizeQuery<STORE extends Instance<typeof MSTGQLStore>, DATA>(
  store: STORE,
  query: QueryLike<STORE, DATA>,
  {
    variables,
    fetchPolicy = "cache-and-network"
  }: {
    variables?: any
    fetchPolicy?: FetchPolicy
  }
): Query<DATA> {
  if (typeof query === "function") return query(store)
  if (query instanceof Query) return query
  return store.query(query, variables, {
    fetchPolicy: fetchPolicy
  })
}

export type UseQueryHookOptions<STORE> = {
  store?: STORE
  variables?: any
  fetchPolicy?: FetchPolicy
}

export type UseQueryHookResult<STORE, DATA> = {
  store: STORE
  loading: boolean
  error: any
  data: { [key in keyof DATA]: DATA[key] } | undefined
  // prevData: DATA | undefined // set of previously fetched values, in case the query was replaced
  query: Query<DATA> | undefined
  setQuery: (query: QueryLike<STORE, DATA>) => void
}

export type UseQueryHook<STORE> = <DATA>(
  query?: QueryLike<STORE, DATA>,
  options?: UseQueryHookOptions<STORE>
) => UseQueryHookResult<STORE, DATA>

export function createUseQueryHook<STORE extends Instance<typeof MSTGQLStore>>(
  context: React.Context<STORE>,
  React: typeof ReactNamespace
): UseQueryHook<STORE> {
  return function <DATA>(
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
    }, [queryIn, opts.fetchPolicy, JSON.stringify(opts.variables)]) // TODO: use a decent deep equal

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
