/* This is a mst-sql generated file */

/* #region type-imports */
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin } from "mst-gql"
import { Todo, todoPrimitives } from "./index"
/* #endregion */

/* #region type-def */
/**
* Store, managing, among others, all the objects received through graphQL
*/
export const RootStore = MSTGQLStore
  .named("RootStore")
  .extend(configureStoreMixin([['Todo', () => Todo]], ['Todo']))
  .props({
    todos: types.optional(types.map(types.late(() => Todo)), {})
  })
  .actions(self => ({
    queryAllTodoes(variables, resultSelector = todoPrimitives, options = {}) {
      return self.query(`query allTodoes($filter: TodoFilter, $orderBy: TodoOrderBy, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) { allTodoes(filter: $filter, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) {
        ${resultSelector}
      } }`, variables, options)
    },
    queryTodo(variables, resultSelector = todoPrimitives, options = {}) {
      return self.query(`query Todo($id: ID) { Todo(id: $id) {
        ${resultSelector}
      } }`, variables, options)
    },
    mutateCreateTodo(variables, resultSelector = todoPrimitives, optimisticUpdate) {
      return self.mutate(`mutation createTodo($done: Boolean!, $isPublished: Boolean, $title: String!) { createTodo(done: $done, isPublished: $isPublished, title: $title) {
        ${resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateUpdateTodo(variables, resultSelector = todoPrimitives, optimisticUpdate) {
      return self.mutate(`mutation updateTodo($done: Boolean, $id: ID!, $isPublished: Boolean, $title: String) { updateTodo(done: $done, id: $id, isPublished: $isPublished, title: $title) {
        ${resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateUpdateOrCreateTodo(variables, resultSelector = todoPrimitives, optimisticUpdate) {
      return self.mutate(`mutation updateOrCreateTodo($update: UpdateTodo!, $create: CreateTodo!) { updateOrCreateTodo(update: $update, create: $create) {
        ${resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateDeleteTodo(variables, resultSelector = todoPrimitives, optimisticUpdate) {
      return self.mutate(`mutation deleteTodo($id: ID!) { deleteTodo(id: $id) {
        ${resultSelector}
      } }`, variables, optimisticUpdate)
    },    
  }))
 /* #endregion */
  .views(self => ({
    get unfinishedTodoCount() {
      return Array.from(self.todos.values()).filter(todo => !todo.done).length
    }
  }))
  .actions(self => ({
    afterCreate() {
      self.queryAllTodoes()
      // prism doesn't support subscriptions yet
      // setInterval(() => {
      //   self.queryAllTodoes()
      // }, 5000)
    },
    addTodo(snapshot) {
      if (!Todo.is(snapshot))
        throw new Error("Invalid instance: " + JSON.stringify(snapshot))
      self.todos.put(snapshot)
      const todo = self.todos.get(snapshot.id)
      return todo.save()
    },
    markAllCompleted() {
      self.todos.forEach(todo => {
        todo.done = true
      })
    }
  }))
