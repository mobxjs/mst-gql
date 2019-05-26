import React from "react"
import { observer } from "mobx-react-lite"

import { Loading, Error } from "./utils"
import { Message } from "./Message"
import { Composer } from "./Composer"

import { useQuery } from "../models/reactUtils"
import { MessageModelType } from "../models"

export const Replies = observer(
  ({ message }: { message: MessageModelType }) => {
    const { data, error, loading } = useQuery(() => message.loadReplies())
    return (
      <div className="replies">
        {error ? (
          <Error>{error}</Error>
        ) : loading ? (
          <Loading />
        ) : (
          <>
            <ul>
              {data.map(message => (
                <Message key={message.id} message={message} asChild />
              ))}
            </ul>
            <Composer replyTo={message} />
          </>
        )}
      </div>
    )
  }
)
