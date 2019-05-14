/* This is a mst-sql generated file */

/* #region type-imports */
import { types } from "mobx-state-tree"
import { MSTGQLObject, MSTGQLRef } from "mst-gql"
import { RootStore } from "./RootStore"
/* #endregion */

/* #region fragments */
export const todoPrimitives = `
__typename
id
text
complete
`

/* #endregion */

/* #region type-def */
export type TodoType = typeof Todo.Type

/**
* Todo
*/
export const Todo = MSTGQLObject
  .named('Todo')
  .props({
    id: types.identifier,
    text: types.optional(types.string, ''),
    complete: types.optional(types.boolean, false),
  })
  .views(self => ({
    get store() {
      return self.__getStore<typeof RootStore.Type>()
    }
  })) /* #endregion */
  .actions(self => ({
    toggle() {
      return self.store.mutateToggleTodo({ id: self.id })
    }
  }))
