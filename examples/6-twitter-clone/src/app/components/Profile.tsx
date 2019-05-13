import React, { useRef } from "react"

import { Error, Loading } from "./"
import { Query } from "../models/reactUtils"

export const Profile = () => {
  const inputRef = useRef<HTMLInputElement>()
  return (
    <Query query={store => store.queryMe()}>
      {({ loading, error, data, store, setQuery }) => {
        if (error) return <Error>{error.message}</Error>
        if (loading) return <Loading />
        if (data)
          return (
            <>
              <input defaultValue={data.name} ref={inputRef} />
              <button
                onClick={() => {
                  setQuery(store.changeName(data.id, inputRef.current!.value))
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
