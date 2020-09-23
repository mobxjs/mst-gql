import { TodoModelBase } from "./TodoModel.base"

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
  toggle() {
    return self.store.mutateToggleTodo({ id: self.id }, (todo) => todo.complete)
  }
}))
