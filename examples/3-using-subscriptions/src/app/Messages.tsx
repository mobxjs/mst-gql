import React, { FC, useContext } from "react"
import { Message } from "./components"
import { observer } from "mobx-react-lite"

import { StoreContext } from "./models/reactUtils"

export const Messages: FC = observer(() => {
  const store = useContext(StoreContext)
  return (
    <ul>
      {store.messages.size === 0 && <p>No new messages</p>}
      {Array.from(store.messages.values()).map(notif => (
        <Message key={notif.id} {...notif} />
      ))}
    </ul>
  )
})
