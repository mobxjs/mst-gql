import React from "react"
import * as ReactDOM from "react-dom"
import { createHttpClient } from "mst-gql"

import "./index.css"

import { RootStore } from "./models/RootStore"
import { StoreContext } from "./models/reactUtils"

import { Home } from "./components/Home"
import { Profile } from "./components/Profile"

const gqlHttpClient = createHttpClient("http://localhost:4000/graphql")

const rootStore = RootStore.create(undefined, {
  gqlHttpClient
})

export const App = () => (
  <StoreContext.Provider value={rootStore}>
    <main>
      <h1>Twitter</h1>
      <Profile />
      <Home />
    </main>
  </StoreContext.Provider>
)

ReactDOM.render(<App />, document.getElementById("root"))
