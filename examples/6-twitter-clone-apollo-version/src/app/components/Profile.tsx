import React, { useRef } from "react"
import gql from "graphql-tag"
import { Query, Mutation } from "react-apollo"

import { Error, Loading } from "./"

const ME = gql`
  query {
    me {
      id
      name
      avatar
    }
  }
`

const UPDATE_NAME = gql`
  mutation changeName($id: ID!, $name: String!) {
    changeName(id: $id, name: $name) {
      id
      name
    }
  }
`

export const Profile = () => {
  const inputRef = useRef<HTMLInputElement>()
  return (
    <Query query={ME}>
      {({ loading, error, data }) => {
        if (error) return <Error>{error.message}</Error>
        if (loading) return <Loading />
        if (data)
          return (
            <Mutation mutation={UPDATE_NAME}>
              {(updateName, { error, loading }) => {
                if (error) return <Error>{error.message}</Error>
                if (loading) return <Loading />
                return (
                  <>
                    <input defaultValue={data.me.name} ref={inputRef} />
                    <button
                      onClick={() => {
                        updateName({
                          variables: {
                            id: data.me.id,
                            name: inputRef.current!.value
                          }
                        })
                      }}
                    >
                      Save
                    </button>
                  </>
                )
              }}
            </Mutation>
          )
      }}
    </Query>
  )
}
