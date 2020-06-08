/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { ObservableMap } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin, QueryOptions, withTypedRefs } from "mst-gql"

import { TodoModel, TodoModelType } from "./TodoModel"
import { todoModelPrimitives, TodoModelSelector } from "./TodoModel.base"


export type CreateTodoInput = {
  id: string
  text: string
  complete?: boolean
}
/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  todos: ObservableMap<string, TodoModelType>
}


/**
* Enums for the names of base graphql actions
*/
export enum RootStoreBaseQueries {
queryTodos="queryTodos",
queryStringFromServer="queryStringFromServer"
}
export enum RootStoreBaseMutations {
mutateToggleTodo="mutateToggleTodo",
mutateCreateTodo="mutateCreateTodo"
}

/**
* Store, managing, among others, all the objects received through graphQL
*/
export const RootStoreBase = withTypedRefs<Refs>()(MSTGQLStore
  .named("RootStore")
  .extend(configureStoreMixin([['Todo', () => TodoModel]], ['Todo'], "js"))
  .props({
    todos: types.optional(types.map(types.late((): any => TodoModel)), {})
  })
  .actions(self => ({
    queryTodos(variables?: {  }, resultSelector: string | ((qb: TodoModelSelector) => TodoModelSelector) = todoModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ todos: TodoModelType[]}>(`query todos { todos {
        ${typeof resultSelector === "function" ? resultSelector(new TodoModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryStringFromServer(variables: { string?: string }, options: QueryOptions = {}) {
      return self.query<{ stringFromServer: string }>(`query stringFromServer($string: String) { stringFromServer(string: $string) }`, variables, options)
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
  })))
