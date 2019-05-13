import React from "react"

import { Error, Loading, Message } from "./"
import { Query } from "../models/reactUtils"

export const Home = () => (
  <Query query={store => store.loadMessages()}>
    {({ loading, error, data, query }) => {
      if (error) return <Error>{error.message}</Error>
      if (loading) return <Loading />
      if (data)
        return (
          <>
            <ul>
              {data.map(message => (
                <Message key={message.id} message={message} />
              ))}
            </ul>
            <button onClick={query.refetch}>Refetch</button>
          </>
        )
    }}
  </Query>
)
