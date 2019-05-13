import React, { FC, useContext, useState } from "react"
import { observer } from "mobx-react-lite"

import { storeContext } from "./components/StoreContext"

import { Error, Loading, Message } from "./components"

export const Home: FC = observer(() => {
  const store = useContext(storeContext)
  const [res] = useState(() => store.loadMessages())

  return (
    <>
      {res.case({
        fetching() {
          return <Loading />
        },
        error(error) {
          return <Error>{error.message}</Error>
        },
        data(messages) {
          return (
            <ul>
              {messages.map(message => (
                <Message key={message.id} message={message} />
              ))}
            </ul>
          )
        }
      })}
      <button onClick={res.refetch}>Refetch</button>
    </>
  )
})
