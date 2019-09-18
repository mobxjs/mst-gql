/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin, QueryOptions } from "mst-gql"

import { TodoModel, TodoModelType } from "./TodoModel"
import { todoModelPrimitives, TodoModelSelector } from "./TodoModel.base"
import { UserModel, UserModelType } from "./UserModel"
import { userModelPrimitives, UserModelSelector } from "./UserModel.base"


/**
* Store, managing, among others, all the objects received through graphQL
*/
export const RootStoreBase = MSTGQLStore
  .named("RootStore")
  .extend(configureStoreMixin([['Todo', () => TodoModel], ['User', () => UserModel]], ['Todo', 'User']))
  .props({
    todos: types.optional(types.map(types.late(() => TodoModel)), {}),
    users: types.optional(types.map(types.late(() => UserModel)), {})
  })
  .actions(self => ({
    queryTodos(variables?: {  }, resultSelector: string | ((qb: TodoModelSelector) => TodoModelSelector) = todoModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ todos: TodoModelType[]}>(`query todos { todos {
        ${typeof resultSelector === "function" ? resultSelector(new TodoModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryDoneTodos(variables?: {  }, resultSelector: string | ((qb: TodoModelSelector) => TodoModelSelector) = todoModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ doneTodos: TodoModelType[]}>(`query doneTodos { doneTodos {
        ${typeof resultSelector === "function" ? resultSelector(new TodoModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryUser(variables: { id: string }, resultSelector: string | ((qb: UserModelSelector) => UserModelSelector) = userModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ user: UserModelType}>(`query user($id: ID!) { user(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new UserModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryUsers(variables?: {  }, resultSelector: string | ((qb: UserModelSelector) => UserModelSelector) = userModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ users: UserModelType[]}>(`query users { users {
        ${typeof resultSelector === "function" ? resultSelector(new UserModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    mutateToggleTodo(variables: { id: string }, resultSelector: string | ((qb: TodoModelSelector) => TodoModelSelector) = todoModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ toggleTodo: TodoModelType}>(`mutation toggleTodo($id: ID!) { toggleTodo(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new TodoModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
  }))
