/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin, QueryOptions } from "mst-gql"

import { TodoModel, TodoModelType } from "./TodoModel"
import { todoModelPrimitives, TodoModelSelector } from "./TodoModel.base"


export type CreateTodoInput = {
  id: string
  text: string
  complete: boolean | undefined
}
/**
* Store, managing, among others, all the objects received through graphQL
*/
export const RootStoreBase = MSTGQLStore
  .named("RootStore")
  .extend(configureStoreMixin([['Todo', () => TodoModel]], ['Todo']))
  .props({
    todos: types.optional(types.map(types.late(() => TodoModel)), {})
  })
  .actions(self => ({
    queryTodos(variables?: {  }, resultSelector: string | ((qb: TodoModelSelector) => TodoModelSelector) = todoModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ todos: TodoModelType[]}>(`query todos { todos {
        ${typeof resultSelector === "function" ? resultSelector(new TodoModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    mutateToggleTodo(variables: { id: string }, resultSelector: string | ((qb: TodoModelSelector) => TodoModelSelector) = todoModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ toggleTodo: TodoModelType}>(`mutation toggleTodo($id: ID!) { toggleTodo(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new TodoModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateCreateTodo(variables: { todo: CreateTodoInput }, resultSelector: string | ((qb: TodoModelSelector) => TodoModelSelector) = todoModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ createTodo: TodoModelType}>(`mutation createTodo($todo: CreateTodoInput!) { createTodo(todo: $todo) {
        ${typeof resultSelector === "function" ? resultSelector(new TodoModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
  }))
