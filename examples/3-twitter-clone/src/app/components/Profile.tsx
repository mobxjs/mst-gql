import React, { useRef } from "react"

import { Query } from "../models/reactUtils"
import { Error } from "./Error"
import { Loading } from "./Loading"

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
              <h3>Edit profile</h3>
              <input defaultValue={data.name} ref={inputRef} />
              <button
                onClick={() => {
                  setQuery(
                    store.mutateChangeName({
                      id: data.id,
                      name: inputRef.current!.value
                    })
                  )
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
