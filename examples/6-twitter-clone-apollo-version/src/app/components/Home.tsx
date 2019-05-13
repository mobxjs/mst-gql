import React from "react"
import gql from "graphql-tag"
import { Query } from "react-apollo"

import { Error, Loading, Message } from "./"

const GET_MESSAGES = gql`
  query {
    messages {
      id
      text
      user {
        id
        avatar
        name
      }
    }
  }
`

export const Home = () => (
  <Query query={GET_MESSAGES}>
    {({ loading, error, data, refetch }) => {
      if (error) return <Error>{error.message}</Error>
      if (loading) return <Loading />
      if (data)
        return (
          <>
            <ul>
              {data.messages.map(message => (
                <Message key={message.id} message={message} />
              ))}
            </ul>
            <button onClick={() => refetch()}>Refetch</button>
          </>
        )
    }}
  </Query>
)
