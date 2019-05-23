import React from "react"

import { Loading, Error } from "./utils"
import { Message } from "./Message"
import { Composer } from "./Composer"

import { Query } from "../models/reactUtils"
import { MessageModelType } from "../models"

export const Replies = ({ message }: { message: MessageModelType }) => (
  <div className="replies">
    <Query<MessageModelType[]> query={() => message.loadReplies()}>
      {({ data, error, loading }) => {
        if (error) return <Error>{error}</Error>
        if (loading) return <Loading />
        return (
          <>
            <ul>
              {data.map(message => (
                <Message key={message.id} message={message} asChild />
              ))}
            </ul>
          </>
        )
      }}
    </Query>
    <Composer replyTo={message} />
  </div>
)
