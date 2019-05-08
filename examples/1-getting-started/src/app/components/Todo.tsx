import * as React from "react"
import { useState } from "react"
import { observer } from "mobx-react-lite"

import { Query } from "mst-gql"

import { Todo as TodoModel } from "../models/Todo"

export const Todo = observer(({ todo }: { todo: typeof TodoModel.Type }) => {
  const [mutation, setMutation] = useState<Query | undefined>(undefined)

  const handleToggle = () => {
    setMutation(todo.toggle())
  }

  return (
    <li onClick={handleToggle}>
      <p className={`${todo.complete ? "strikethrough" : ""}`}>{todo.text}</p>
      {mutation && mutation.fetching && <span>(updating)</span>}
    </li>
  )
})
