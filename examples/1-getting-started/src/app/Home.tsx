import React from "react"
import { observer } from "mobx-react-lite"
import { useQuery } from "./models/reactUtils"

import { Error, Loading, Todo } from "./components"

export const Home = observer(() => {
  const { loading, error, data, query } = useQuery((store) =>
    store.queryTodos()
  )
  if (error) return <Error>{error.message}</Error>
  if (data)
    return (
      <>
        <ul>
          {data.todos.map((todo) => (
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
})
