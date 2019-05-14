/* This is a mst-sql generated file */
import { addDisposer, onSnapshot, getSnapshot } from "mobx-state-tree"

/* #region type-imports */
import { types } from "mobx-state-tree"
import { MSTGQLObject, MSTGQLRef } from "mst-gql"
import { RootStore } from "./index"
/* #endregion */

/* #region fragments */
export const todoPrimitives = `
__typename
createdAt
done
id
isPublished
title
updatedAt
`

/* #endregion */

/* #region type-def */

/**
* Todo
*/
export const Todo = MSTGQLObject
  .named('Todo')
  .props({
    __typename: types.optional(types.literal("Todo"), "Todo"),
    createdAt: types.frozen(),
    done: types.boolean,
    id: types.identifier,
    /** Indicates if the record is published */
    isPublished: types.boolean,
    title: types.string,
    updatedAt: types.frozen(),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  })) /* #endregion */
  .actions(self => ({
    // TODO: should these operations (afterAttach, save remove) be standardized into a mixin?
    afterAttach() {
      addDisposer(self, onSnapshot(self, self.save))
    },
    save() {
      const snapshot = getSnapshot(self)
      return self.store.mutateUpdateTodo(snapshot)
    },
    remove() {
      return self.store.mutateDeleteTodo({ id: self.id })
    },
    toggle() {
      self.done = !self.done
    },
    changeTitle(title) {
      self.title = title
    }
  }))
