import { observer } from "mobx-react"
import { selectFromTodo, useQuery } from "../src/models"
import { UserPreview } from "./users"

const todoSelector = selectFromTodo()
  .text.done.assignee()
  .toString()

const TodosList = observer(({ todos }) => {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <span style={{ textDecoration: todo.done ? "line-through" : "none" }}>
            {todo.text}
          </span>
          &emsp;
          <button onClick={todo.toggle}>
            toggle
          </button>
          &emsp;
          {
            todo.assignee
              ? <>Assignee: <UserPreview userId={todo.assignee.id}/></>
              : <>Unassigned</>
          }
        </li>
      ))}
    </ul>
  )
})

export const AllTodosView = observer(() => {
  const { error, data, loading, query } = useQuery(store => {
    return store.queryTodos({}, todoSelector)
  })
  if (error) return error.message
  if (!data) return "Loading..."
  return (
    <>
      {data && <TodosList todos={data.todos} />}
      {loading ? (
        "Loading..."
      ) : (
        <button onClick={query!.refetch}>Refetch</button>
      )}
    </>
  )
})

export const DoneTodosView = observer(() => {
  const { error, data, loading, query } = useQuery(store => {
    return store.queryDoneTodos({}, todoSelector)
  })
  if (error) return error.message
  if (!data) return "Loading..."
  return (
    <>
      {data && <TodosList todos={data.doneTodos} />}
      {loading ? (
        "Loading..."
      ) : (
        <button onClick={query!.refetch}>Refetch</button>
      )}
    </>
  )
})
