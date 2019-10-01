import { TodoModelBase } from "./TodoModel.base"

/**
 * TodoModel
 */
export const TodoModel = TodoModelBase.actions(self => ({
  toggle() {
    return self.store.mutateToggleTodo({ id: self.id }, todo => todo.complete)
  }
}))
