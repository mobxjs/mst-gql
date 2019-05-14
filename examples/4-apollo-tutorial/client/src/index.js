import React from "react"
import ReactDOM from "react-dom"

import { Observer } from "mobx-react-lite"

import Pages from "./pages"
import Login from "./pages/login"
import injectStyles from "./styles"

import { createHttpClient } from "mst-gql"

import { RootStore } from "./models"
import { StoreContext } from "./models/reactUtils"

const gqlHttpClient = createHttpClient("http://localhost:4000/graphql", {
  headers: {
    authorization: localStorage.getItem("token"),
    "client-name": "Space Explorer [web]",
    "client-version": "1.0.0"
  }
})

const rootStore = RootStore.create(
  {
    loginStatus: localStorage.getItem("token") ? "loggedIn" : "loggedOut",
    cartItems: []
  },
  {
    gqlHttpClient
  }
)

/**
 * Render our app
 * - We need a router, so we can navigate the app. We're using Reach router for this.
 *    The router chooses between which component to render, depending on the url path.
 *    ex: localhost:3000/login will render only the `Login` component
 */

injectStyles()
ReactDOM.render(
  <StoreContext.Provider value={rootStore}>
    <Observer>
      {() => (rootStore.loginStatus === "loggedIn" ? <Pages /> : <Login />)}
    </Observer>
  </StoreContext.Provider>,
  document.getElementById("root")
)

window.store = rootStore // for debugging / demo
