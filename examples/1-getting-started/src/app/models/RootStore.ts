/* This is a mst-sql generated file */

/* #region type-imports */
import { types } from "mobx-state-tree"
import gql from "graphql-tag"
import { MSTGQLStore, configureStoreMixin, QueryOptions } from "mst-gql"
import { Todo, todoPrimitives } from "./index"
/* #endregion */

/* #region type-def */
/**
* Store, managing, among others, all the objects received through graphQL
*/
const RootStore = MSTGQLStore
  .named("RootStore")
  .extend(configureStoreMixin([['Todo', Todo]], ['Todo']))
  .props({
    todos: types.optional(types.map(Todo), {})
  })
  .actions(self => ({
    queryTodos(variables?: {  }, resultSelector = todoPrimitives, options: QueryOptions = {}) {
      return self.query<typeof Todo.Type[]>(gql`query todos { todos {
        ${resultSelector}
      } }`, variables, options)
    },
    mutateToggleTodo(variables: { id: string }, resultSelector = todoPrimitives, optimisticUpdate?: () => void) {
      return self.mutate<typeof Todo.Type>(gql`mutation toggleTodo($id: ID!) { toggleTodo(id: $id) {
        ${resultSelector}
      } }`, variables, optimisticUpdate)
    },    
  }))

/* #endregion */

export { RootStore }
