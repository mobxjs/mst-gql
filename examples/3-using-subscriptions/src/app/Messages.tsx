import React, { FC, useContext } from "react"
import { storeContext } from "./components/StoreContext"
import { Message } from "./components"
import { observer } from "mobx-react-lite"

export const Messages: FC = observer(() => {
  const store = useContext(storeContext)
  return (
    <ul>
      {store.messages.size === 0 && <p>No new messages</p>}
      {Array.from(store.messages.values()).map(notif => (
        <Message key={notif.id} {...notif} />
      ))}
    </ul>
  )
})
