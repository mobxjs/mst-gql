import React, { FC } from "react"

import { Query } from "./models/reactUtils"
import { TodoType } from "./models"

import { Error, Loading, Todo } from "./components"

export const Home = () => (
  <Query<TodoType[]> query={store => store.queryTodos()}>
    {({ loading, error, data, query }) => {
      if (error) return <Error>{error.message}</Error>
      if (data)
        return (
          <>
            <ul>
              {data.map(todo => (
                <Todo key={todo.id} todo={todo} />
              ))}
            </ul>
            {loading ? (
              <Loading />
            ) : (
              <button onClick={query!.refetch}>Refetch</button>
            )}
          </>
        )
      return <Loading />
    }}
  </Query>
)
