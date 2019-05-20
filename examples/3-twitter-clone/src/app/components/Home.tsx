import React from "react"

import { Error, Loading, Message } from "./"
import { Query } from "../models/reactUtils"
import { Composer } from "./Composer"

export const Home = () => (
  <>
    <Composer />
    <Query query={store => store.loadMessages()}>
      {({ store, error, query }) => {
        if (error) return <Error>{error.message}</Error>
        if (!store.messages.size) return <Loading />
        return (
          <>
            <ul>
              {Array.from(store.messages.values())
                .reverse()
                .map(message => (
                  <Message key={message.id} message={message} />
                ))}
            </ul>
            <button onClick={query.refetch}>Refetch</button>
          </>
        )
      }}
    </Query>
  </>
)
