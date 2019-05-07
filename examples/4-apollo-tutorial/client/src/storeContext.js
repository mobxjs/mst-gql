import { createContext, useContext } from "react"

import { useObserver } from "mobx-react-lite"

export const StoreContext = createContext()

export function withStore(component) {
  const store = useContext(StoreContext)
  return useObserver(() => component(store))
}

export function renderQuery(query, variables, handlers) {
  return withStore(store => store.query(query, variables).case(handlers))
}
