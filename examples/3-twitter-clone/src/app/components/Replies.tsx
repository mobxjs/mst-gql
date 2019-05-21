import React, { useRef } from "react"
import { Query } from "../models/reactUtils"
import { Loading } from "./Loading"
import { MessageModelType } from "../models"

import { Message } from "./Message"
import { Composer } from "./Composer"
import { Error } from "./Error"

export const Replies = ({ message }: { message: MessageModelType }) => (
  <div className="replies">
    <Query<MessageModelType> query={() => message.loadReplies()}>
      {({ data, error, loading }) => {
        if (error) return <Error>{error}</Error>
        if (loading) return <Loading />
        return (
          <>
            <ul>
              {data.replies.map(message => (
                <Message key={message.id} message={message} asChild />
              ))}
            </ul>
          </>
        )
      }}
    </Query>
    <Composer replyTo={message.id} />
  </div>
)
