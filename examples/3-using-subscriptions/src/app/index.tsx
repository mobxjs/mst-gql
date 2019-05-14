import React, { FC } from "react"
import * as ReactDOM from "react-dom"
import { SubscriptionClient } from "subscriptions-transport-ws"
import "./index.css"
import { Messages } from "./Messages"

import { RootStore } from "./models/RootStore"
import { StoreContext } from "./models/reactUtils"

const gqlWsClient = new SubscriptionClient("ws://localhost:4001/graphql", {
  reconnect: true
})

const rootStore = RootStore.create(undefined, {
  gqlWsClient
})
const unsubscribe = rootStore.subscribeNewMessages()

export const App: FC = () => (
  <StoreContext.Provider value={rootStore}>
    <main>
      <h1>New messages</h1>
      <Messages />
      <button onClick={unsubscribe}>Stop subscription</button>
    </main>
  </StoreContext.Provider>
)

ReactDOM.render(<App />, document.getElementById("root"))
