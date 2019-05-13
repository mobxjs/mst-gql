import React from "react"
import * as ReactDOM from "react-dom"

import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { HttpLink } from "apollo-link-http"
import { ApolloProvider } from "react-apollo"

import "./index.css"

import { Home } from "./components/Home"
import { Profile } from "./components/Profile"

const cache = new InMemoryCache()
const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: "http://localhost:4000/graphql"
  })
})

export const App = () => (
  <ApolloProvider client={client}>
    <main>
      <h1>Twitter</h1>
      <Profile />
      <Home />
    </main>
  </ApolloProvider>
)

ReactDOM.render(<App />, document.getElementById("root"))
