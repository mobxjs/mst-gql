import React, { FC, useContext, useState } from "react"
import { observer } from "mobx-react-lite"

import { storeContext } from "./components/StoreContext"

import { Error, Loading, Todo } from "./components"

export const Home: FC = observer(() => {
  const store = useContext(storeContext)
  const [res] = useState(() => store.loadTodos())

  return (
    <>
      {res.case({
        loading() {
          return <Loading />
        },
        error(error) {
          return <Error>{error.message}</Error>
        },
        data(todos) {
          return (
            <ul>
              {todos.map(todo => (
                <Todo key={todo.id} todo={todo} />
              ))}
            </ul>
          )
        }
      })}
      <button onClick={res.refetch}>Refetch</button>
    </>
  )
})
