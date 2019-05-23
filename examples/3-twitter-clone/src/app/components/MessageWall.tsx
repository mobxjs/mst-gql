import React from "react"
import { observer } from "mobx-react-lite"

import { Loading, Error } from "./utils"

import { useQuery } from "../models/reactUtils"
import { Message } from "./Message"

export const MessageWall = observer(() => {
  const { store, error, loading, setQuery } = useQuery(store =>
    store.loadInitialMessages()
  )
  if (error) return <Error>{error.message}</Error>
  if (!store.messages.size) return <Loading />
  return (
    <>
      <ul>
        {store.sortedMessages.map(message => (
          <Message key={message.id} message={message} />
        ))}
      </ul>
      {loading ? (
        <Loading />
      ) : (
        <button
          className="loadmore"
          onClick={() => {
            setQuery(store.loadMore())
          }}
        >
          Load more...
        </button>
      )}
    </>
  )
})
