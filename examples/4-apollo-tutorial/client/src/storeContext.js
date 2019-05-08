import { createContext, useContext, useState } from "react"

import { useObserver } from "mobx-react-lite"

export const StoreContext = createContext()

export function withStore(component) {
  const store = useContext(StoreContext)
  return useObserver(() => component(store))
}

export function renderQuery(query, variables, handlers) {
  const store = useContext(StoreContext)
  const [queryResult] = useState(() => store.query(query, variables))
  return useObserver(() => queryResult.case(handlers))
}

export function useMutation(component) {
  const store = useContext(StoreContext)
  const [queryMutation, startMutation] = useState(null)
  return useObserver(() =>
    component(store, startMutation, {
      loading: queryMutation ? queryMutation.fetching : false,
      error: queryMutation ? queryMutation.error : undefined,
      data: queryMutation ? queryMutation.data : undefined
    })
  )
}
