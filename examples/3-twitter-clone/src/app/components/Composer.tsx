import React, { useRef } from "react"
import { Query } from "../models/reactUtils"
import { Loading } from "./Loading"
import { Error } from "./Error"

export const Composer = ({ replyTo }: { replyTo?: string }) => {
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
              onClick={() => {
                const query = store.sendTweet(inputRef.current!.value, replyTo)
                inputRef.current.value = ""
                setQuery(query)
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
