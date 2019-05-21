import React, { useRef } from "react"
import { Query } from "../models/reactUtils"
import { Loading } from "./Loading"
import { Error } from "./Error"
import { MessageModelType } from "../models"

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
                  replyTo.id
                )
                inputRef.current.value = ""
                setQuery(query)
                await query
                replyTo.loadReplies()
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
