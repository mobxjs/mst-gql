import { Instance } from "mobx-state-tree"
import {
  TodoModelBase,
  TodoModelBaseRefsType,
  createSelfWrapper
} from "./TodoModel.base"

/* A graphql query fragment builders for TodoModel */
export {
  selectFromTodo,
  todoModelPrimitives,
  TodoModelSelector
} from "./TodoModel.base"

const as = createSelfWrapper<TodoModelType>()

/**
 * TodoModel
 */
export const TodoModel = TodoModelBase.actions(
  as(self => ({
    toggle() {
      return self.store.mutateToggleTodo({ id: self.id }, undefined, () => {
        self.complete = !self.complete
      })
    }
  }))
)

/* The TypeScript type of an instance of TodoModelBase */
export interface TodoModelType extends Instance<typeof TodoModel.Type> {}
export interface TodoModelType extends TodoModelBaseRefsType {}
