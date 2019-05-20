import React, { useRef } from "react"
import { Query } from "../models/reactUtils"
import { Loading } from "./Loading"
import { MessageModelType } from "../models"

import { Message } from "./Message"
import { Composer } from "./Composer"

export const Replies = ({ message }: { message: MessageModelType }) => (
  <div>
    <Query<MessageModelType> query={() => message.loadReplies()}>
      {({ data, error, loading }) => {
        if (error) return <p>{error}</p>
        if (loading) return <Loading />
        console.dir(data)
        return (
          <>
            <ul>
              {data.replies.map(message => (
                <Message key={message.id} message={message} />
              ))}
            </ul>
            <Composer replyTo={message.id} />
          </>
        )
      }}
    </Query>
  </div>
)
