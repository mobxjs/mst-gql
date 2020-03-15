import React, { useRef } from "react"
import { observer } from "mobx-react-lite"

import { MessageModelType } from "../models"

import { Loading, Error } from "./utils"
import { useQuery } from "../models/reactUtils"

export const Composer = observer(
  ({ replyTo }: { replyTo?: MessageModelType }) => {
    const inputRef = useRef<HTMLInputElement>()
    const { store, loading, error, setQuery } = useQuery()
    return error ? (
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
)
