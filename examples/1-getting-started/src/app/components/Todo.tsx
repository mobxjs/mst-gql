import * as React from "react"

import { TodoType } from "../models"
import { Query } from "../models/reactUtils"

export const Todo = ({ todo }: { todo: TodoType }) => (
  <Query>
    {({ setQuery, loading, error }) => (
      <li onClick={() => setQuery(todo.toggle())}>
        <p className={`${todo.complete ? "strikethrough" : ""}`}>{todo.text}</p>
        {error && <span>Failed to update</span>}
        {loading && <span>(updating)</span>}
      </li>
    )}
  </Query>
)
