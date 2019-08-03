import React, { useRef } from "react"
import { observer } from "mobx-react-lite"

import { Error } from "./utils"

import { useQuery } from "../models/reactUtils"

export const Profile = observer(() => {
  const inputRef = useRef<HTMLInputElement>()
  const { loading, error, data, store, setQuery } = useQuery(store =>
    store.queryMe()
  )

  if (error) return <Error>{error.message}</Error>
  return (
    <>
      <h3>Edit profile</h3>
      <input
        disabled={!data || loading}
        defaultValue={data && data.me.name}
        ref={inputRef}
      />
      <button
        disabled={!data || loading}
        onClick={() => {
          data.me.changeName(inputRef.current!.value)
        }}
      >
        Save
      </button>
    </>
  )
})
