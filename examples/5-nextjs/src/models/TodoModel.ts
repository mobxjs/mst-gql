import { TodoModelBase } from "./TodoModel.base"

/* The TypeScript type of an instance of TodoModel */
export type TodoModelType = typeof TodoModel.Type

/* A graphql query fragment builders for TodoModel */
export {
  selectFromTodo,
  todoModelPrimitives,
  TodoModelSelector
} from "./TodoModel.base"

/**
 * TodoModel
 */
export const TodoModel = TodoModelBase.actions(self => ({
  toggle() {
    return self.store.mutateToggleTodo({ id: self.id }, undefined, () => {
      self.complete = !self.complete
    })
  }
}))
