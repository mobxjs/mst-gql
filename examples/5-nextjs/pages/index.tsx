import { useState } from "react"
import { AllTodosView, DoneTodosView } from "../components/todos"
import { UsersView } from "../components/users"

export default function Index() {
  const [showDoneTodos, setShowDoneTodos] = useState(true)
  return (
    <>
      <h3>All Todos</h3>
      <AllTodosView />
      <hr />
      <h3>Done Todos</h3>
      <button onClick={() => setShowDoneTodos(!showDoneTodos)}>
        {showDoneTodos ? "Hide" : "Show"}
      </button>
      {showDoneTodos && <DoneTodosView />}
      <hr />
      <h3>Users (query with no SSR)</h3>
      <UsersView />
    </>
  )
}
