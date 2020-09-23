import { Instance } from "mobx-state-tree"
import { TodoModelBase } from "./TodoModel.base"
import { Query } from "mst-gql"

/* The TypeScript type of an instance of TodoModel */
export interface TodoModelType extends Instance<typeof TodoModel.Type> {}

/* A graphql query fragment builders for TodoModel */
export {
  selectFromTodo,
  todoModelPrimitives,
  TodoModelSelector
} from "./TodoModel.base"

/**
 * TodoModel
 */
export const TodoModel = TodoModelBase.actions((self) => ({
  toggle(): Query<{
    toggleTodo: TodoModelType
  }> {
    return self.store.mutateToggleTodo({ id: self.id }, undefined, () => {
      self.complete = !self.complete
    })
  }
}))
