import { Instance } from "mobx-state-tree"
import { TodoModelBase, TodoModelBaseRefsType } from "./TodoModel.base"
import { Query } from "mst-gql"

/* A graphql query fragment builders for TodoModel */
export {
  selectFromTodo,
  todoModelPrimitives,
  TodoModelSelector
} from "./TodoModel.base"

/* The TypeScript type of an instance of TodoModelBase */
export interface TodoModelType extends Instance<typeof TodoModel.Type> {}
export interface TodoModelType extends TodoModelBaseRefsType {}

/* Helper function to cast self argument to a TodoModel instance */
const as = (self: any) => (self as unknown) as TodoModelType

/**
 * TodoModel
 */
export const TodoModel = TodoModelBase.actions(self => ({
  toggle(): Query<{
    toggleTodo: TodoModelType
  }> {
    return self.store.mutateToggleTodo({ id: self.id }, undefined, () => {
      self.complete = !self.complete
    })
  }
}))
