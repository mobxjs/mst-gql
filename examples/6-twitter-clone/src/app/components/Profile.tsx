import React, { useRef } from "react"

import { Error, Loading, Message } from "./"
import { Query } from "../models/reactUtils"

export const Profile = () => {
  const inputRef = useRef<HTMLInputElement>()
  return (
    <Query query={`query { me { id __typename avatar name } }`}>
      {({ loading, error, data, store }) => {
        if (error) return <Error>{error.message}</Error>
        if (loading) return <Loading />
        if (data)
          return (
            <>
              <input defaultValue={data.name} ref={inputRef} />
              <button
                onClick={() => {
                  store.changeName(data.id, inputRef.current!.value)
                }}
              >
                Save
              </button>
            </>
          )
      }}
    </Query>
  )
}
