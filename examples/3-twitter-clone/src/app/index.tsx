import React from "react"
import * as ReactDOM from "react-dom"
import { createHttpClient } from "mst-gql"
import { SubscriptionClient } from "subscriptions-transport-ws"

import "./index.css"

import { RootStore } from "./models/RootStore"
import { StoreContext } from "./models/reactUtils"

import { Home } from "./components/Home"
import { Profile } from "./components/Profile"

const gqlHttpClient = createHttpClient("http://localhost:4000/graphql")

const gqlWsClient = new SubscriptionClient("ws://localhost:4001/graphql", {
  reconnect: true
})

const rootStore = RootStore.create(undefined, {
  gqlHttpClient,
  gqlWsClient
})

export const App = () => (
  <StoreContext.Provider value={rootStore}>
    <main>
      <Home />
      <Profile />
    </main>
  </StoreContext.Provider>
)

ReactDOM.render(<App />, document.getElementById("root"))

// For debugging
// @ts-ignore
window.store = rootStore
