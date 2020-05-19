/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin } from "mst-gql"

import { TodoModel } from "./TodoModel"
import { todoModelPrimitives, TodoModelSelector } from "./TodoModel.base"






/**
* Store, managing, among others, all the objects received through graphQL
*/
export const RootStoreBase = MSTGQLStore
  .named("RootStore")
  .extend(configureStoreMixin([['Todo', () => TodoModel]], ['Todo'], "js"))
  .props({
    todos: types.optional(types.map(types.late(() => TodoModel)), {})
  })
  .actions(self => ({
    queryTodos(variables, resultSelector = todoModelPrimitives.toString(), options = {}) {
      return self.query(`query todos { todos {
        ${typeof resultSelector === "function" ? resultSelector(new TodoModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    mutateToggleTodo(variables, resultSelector = todoModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation toggleTodo($id: ID!) { toggleTodo(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new TodoModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
  }))
