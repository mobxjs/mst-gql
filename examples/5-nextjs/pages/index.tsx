import React from "react"
import { observer } from "mobx-react"
import { useQuery } from "../src/models/reactUtils"

const Home = observer(() => {
  const { loading, error, data, query } = useQuery(store => store.queryTodos())
  if (error) return error.message
  if (data)
    return (
      <>
        <ul>
          {data.todos.map(todo => (
            <li key={todo.id}>{todo.text}</li>
          ))}
        </ul>
        {loading ? (
          "Loading..."
        ) : (
          <button onClick={query!.refetch}>Refetch</button>
        )}
      </>
    )
  return "Loading"
})

export default Home
