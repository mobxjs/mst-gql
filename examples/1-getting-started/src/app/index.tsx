import React from "react"
import * as ReactDOM from "react-dom"
import { createHttpClient } from "mst-gql"

import "./index.css"

import { RootStore } from "./models/RootStore"
import { StoreContext } from "./models/reactUtils"
import { Home } from "./Home"
import { ServerString } from "./components"

const rootStore = RootStore.create(undefined, {
  gqlHttpClient: createHttpClient("http://localhost:3001/graphql")
})

export const App: React.FC = () => (
  <StoreContext.Provider value={rootStore}>
    <main>
      <h1>
        <ServerString />
      </h1>
      <Home />
    </main>
  </StoreContext.Provider>
)

ReactDOM.render(<App />, document.getElementById("root"))
