import React, { useContext } from "react"

import { StoreContext } from "../models"
import { LoginForm, Loading } from "../components"

export default function Login() {
  const store = useContext(StoreContext)
  switch (store.loginStatus) {
    case "loggedIn":
    case "pending":
      return <Loading />
    case "loggedOut":
      return <LoginForm login={email => store.login(email)} />
    case "error":
      return <p>An error occurred</p>
  }
}
