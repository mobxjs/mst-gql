import { MSTGQLStore, primitiveFields } from "mst-gql"
import { types } from "mobx-state-tree"
import { Todo } from "./Todo"

const TodoQuery = `
  query {
    todos {
      ${primitiveFields(Todo)}
    }
  }
`

const RootStore = MSTGQLStore.props({
  todos: types.optional(types.map(Todo), {})
}).actions(self => ({
  loadTodos() {
    return self.query<Array<typeof Todo.Type>>(TodoQuery)
  }
}))

export { RootStore }
