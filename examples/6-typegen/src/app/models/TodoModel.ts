import { Instance } from "mobx-state-tree"
import { TodoModelBase } from "./TodoModel.base"
import { Query } from "mst-gql"

import { UserType } from "./UserModel"
import { RootStoreType } from "./RootStore"

/* The TypeScript type of an instance of TodoModel */
export interface TodoModelType extends Instance<typeof TodoModel.Type> {}

/* A graphql query fragment builders for TodoModel */
export {
  selectFromTodo,
  todoModelPrimitives,
  TodoModelSelector
} from "./TodoModel.base"

export interface TodoType {
  __typename: "Todo"
  id: string
  text: string | null
  complete: boolean | null
  owner: UserType | null
  toggle: () => Query<{ toggleTodo: TodoType }>
  store: RootStoreType
}

/**
 * TodoModel
 */
export const TodoModel = TodoModelBase.actions(self => ({
  toggle(): Query<{
    toggleTodo: TodoType
  }> {
    return self.store.mutateToggleTodo({ id: self.id }, undefined, () => {
      self.complete = !self.complete
    })
  }
}))
