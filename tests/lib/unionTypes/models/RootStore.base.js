/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin } from "mst-gql"

import { TodoListModel } from "./TodoListModel"
import { todoListModelPrimitives, TodoListModelSelector } from "./TodoListModel.base"
import { BasicTodoModel } from "./BasicTodoModel"
import { basicTodoModelPrimitives, BasicTodoModelSelector } from "./BasicTodoModel.base"
import { FancyTodoModel } from "./FancyTodoModel"
import { fancyTodoModelPrimitives, FancyTodoModelSelector } from "./FancyTodoModel.base"

import { todoModelPrimitives, TodoModelSelector  } from "./"






/**
* Store, managing, among others, all the objects received through graphQL
*/
export const RootStoreBase = MSTGQLStore
  .named("RootStore")
  .extend(configureStoreMixin([['TodoList', () => TodoListModel], ['BasicTodo', () => BasicTodoModel], ['FancyTodo', () => FancyTodoModel]], ['TodoList', 'BasicTodo', 'FancyTodo'], "js"))
  .props({
    todoLists: types.optional(types.map(types.late(() => TodoListModel)), {}),
    basicTodos: types.optional(types.map(types.late(() => BasicTodoModel)), {}),
    fancyTodos: types.optional(types.map(types.late(() => FancyTodoModel)), {})
  })
  .actions(self => ({
    queryTodoLists(variables, resultSelector = todoListModelPrimitives.toString(), options = {}) {
      return self.query(`query todoLists { todoLists {
        ${typeof resultSelector === "function" ? resultSelector(new TodoListModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
  }))
