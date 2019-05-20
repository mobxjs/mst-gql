import React from "react"

import { Error, Loading, Message } from "./"
import { Query } from "../models/reactUtils"
import { Composer } from "./Composer"

export const Home = () => (
  <>
    <Composer />
    <Query query={store => store.loadInitialMessages()}>
      {({ store, error, loading, setQuery }) => {
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
              <button onClick={() => setQuery(store.loadMore())}>more</button>
            )}
          </>
        )
      }}
    </Query>
  </>
)
