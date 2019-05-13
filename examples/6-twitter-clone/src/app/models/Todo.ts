import { MSTGQLObject, coreFields } from "mst-gql"
import { types } from "mobx-state-tree"

const Todo = MSTGQLObject.named("Todo")
  .props({
    text: types.string,
    complete: types.boolean
  })
  .actions(self => ({
    toggle() {
      return self.store.mutate(RemoveTodo, { id: self.id }, () => {
        // optimistic update (will revert on failure!)
        self.complete = !self.complete
      })
    }
  }))

const RemoveTodo = `
mutation($id: ID!) {
  toggleTodo(id: $id) {
    ${coreFields}
    complete
  }
}
`

export { Todo }
