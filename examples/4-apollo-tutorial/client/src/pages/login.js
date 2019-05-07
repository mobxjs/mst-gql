import React, { useContext } from "react"
import { Observer } from "mobx-react-lite"

import { withStore } from "../storeContext"
import { LoginForm, Loading } from "../components"

export default function Login() {
  return withStore((store) => {
      switch (store.loginStatus) {
        case "loggedIn":
        case "pending":
          return <Loading />
        case "loggedOut":
          return <LoginForm login={store.login} />
        case "error":
          return <p>An error occurred</p>
      }
  }) 
}
