import { MSTGQLStore, primitiveFields, typeInfo } from "mst-gql"
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
})
  .extend(typeInfo([["Todo", Todo]], ["Todo"])) // The mapping of __typename to MST types, and the collection of types to be cached in the store
  .actions(self => ({
    loadTodos() {
      return self.query<Array<typeof Todo.Type>>(TodoQuery)
    }
  }))

export { RootStore }
