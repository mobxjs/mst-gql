import * as React from "react"
import { useState } from "react"
import { observer } from "mobx-react"

import { Query } from "mst-gql"

import { TodoType } from "../models"

export const Todo = observer(({ todo }: { todo: TodoType }) => {
  const [mutation, setMutation] = useState<Query | undefined>(undefined)

  const handleToggle = () => {
    setMutation(todo.toggle())
  }

  return (
    <li onClick={handleToggle}>
      <p className={`${todo.complete ? "strikethrough" : ""}`}>{todo.text}</p>
      {mutation && mutation.loading && <span>(updating)</span>}
    </li>
  )
})
