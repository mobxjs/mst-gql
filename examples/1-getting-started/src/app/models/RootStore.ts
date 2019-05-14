/* This is a mst-sql generated file */

/* #region type-imports */
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin, QueryOptions } from "mst-gql"
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
    queryTodos(variables?: {  }, resultSelector = todoPrimitives, options: QueryOptions = {}) {
      return self.query<typeof Todo.Type[]>(`query todos { todos {
        ${resultSelector}
      } }`, variables, options)
    },
    mutateToggleTodo(variables: { id: string }, resultSelector = todoPrimitives, optimisticUpdate?: () => void) {
      return self.mutate<typeof Todo.Type>(`mutation toggleTodo($id: ID!) { toggleTodo(id: $id) {
        ${resultSelector}
      } }`, variables, optimisticUpdate)
    },    
  }))

/* #endregion */
