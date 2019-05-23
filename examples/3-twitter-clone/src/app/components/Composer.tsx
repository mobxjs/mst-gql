import React, { useRef } from "react"

import { MessageModelType } from "../models"

import { Loading, Error } from "./utils"
import { Query } from "../models/reactUtils"

export const Composer = ({ replyTo }: { replyTo?: MessageModelType }) => {
  const inputRef = useRef<HTMLInputElement>()
  return (
    <Query>
      {({ store, loading, error, setQuery }) =>
        error ? (
          <Error>Failed to post message: ${error}</Error>
        ) : loading ? (
          <Loading />
        ) : (
          <div className="composer">
            <input ref={inputRef} />
            <button
              onClick={async () => {
                const query = store.sendTweet(
                  inputRef.current!.value,
                  replyTo && replyTo.id
                )
                inputRef.current.value = ""
                setQuery(query)
                await query
                if (replyTo) replyTo.loadReplies()
              }}
            >
              Send
            </button>
          </div>
        )
      }
    </Query>
  )
}
