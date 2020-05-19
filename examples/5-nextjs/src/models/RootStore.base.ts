/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { ObservableMap } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin, QueryOptions, withTypedRefs } from "mst-gql"

import { TodoModel, TodoModelType } from "./TodoModel"
import { todoModelPrimitives, TodoModelSelector } from "./TodoModel.base"
import { UserModel, UserModelType } from "./UserModel"
import { userModelPrimitives, UserModelSelector } from "./UserModel.base"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  todos: ObservableMap<string, TodoModelType>,
  users: ObservableMap<string, UserModelType>
}


/**
* Enums for the names of base graphql actions
*/
export enum RootStoreBaseQueries {
queryTodos="queryTodos",
queryDoneTodos="queryDoneTodos",
queryUser="queryUser",
queryUsers="queryUsers"
}
export enum RootStoreBaseMutations {
mutateToggleTodo="mutateToggleTodo"
}

/**
* Store, managing, among others, all the objects received through graphQL
*/
export const RootStoreBase = withTypedRefs<Refs>()(MSTGQLStore
  .named("RootStore")
  .extend(configureStoreMixin([['Todo', () => TodoModel], ['User', () => UserModel]], ['Todo', 'User'], "js"))
  .props({
    todos: types.optional(types.map(types.late((): any => TodoModel)), {}),
    users: types.optional(types.map(types.late((): any => UserModel)), {})
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
  })))
