import React, { FC, createContext } from "react"
import * as ReactDOM from "react-dom"

import { createHttpClient } from "mst-gql"

import { RootStore } from "./models/RootStore"

import { storeContext } from "./components/StoreContext"
import { Home } from "./Home"
import "./index.css"

const gqlHttpClient = createHttpClient("http://localhost:4000/graphql")

const rootStore = RootStore.create(undefined, {
  gqlHttpClient
})

export const App: FC = () => (
  <storeContext.Provider value={rootStore}>
    <main>
      <h1>Twitter</h1>
      <Home />
    </main>
  </storeContext.Provider>
)

ReactDOM.render(<App />, document.getElementById("root"))
