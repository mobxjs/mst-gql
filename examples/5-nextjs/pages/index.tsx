import { useState } from "react"
import { AllTodosView, DoneTodosView } from "../components/todos"

export default function Index() {
  const [showDoneTodos, setShowDoneTodos] = useState(false)
  return (
    <>
      <h3>All Todos</h3>
      <AllTodosView/>
      <hr/>
      <h3>Done Todos</h3>
      <button onClick={() => setShowDoneTodos(!showDoneTodos)}>
        {showDoneTodos ? "Hide" : "Show"}
      </button>
      {showDoneTodos && <DoneTodosView/>}
    </>
  )
}

