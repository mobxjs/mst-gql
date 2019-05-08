import React from "react"

import { withStore } from "../storeContext"
import { LoginForm, Loading } from "../components"

export default function Login() {
  return withStore(store => {
    switch (store.loginStatus) {
      case "loggedIn":
      case "pending":
        return <Loading />
      case "loggedOut":
        return <LoginForm login={email => store.login(email)} />
      case "error":
        return <p>An error occurred</p>
    }
  })
}
