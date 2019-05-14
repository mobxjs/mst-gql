/* This is a mst-sql generated file */

/* #region type-imports */
import { types } from "mobx-state-tree"
import { MSTGQLObject, MSTGQLRef } from "mst-gql"
import { RootStore } from "./RootStore"
/* #endregion */

/* #region fragments */
export const messagePrimitives = `
__typename
id
from
message
`

/* #endregion */

/* #region type-def */
export type MessageType = typeof Message.Type

/**
* Message
*/
export const Message = MSTGQLObject
  .named('Message')
  .props({
    id: types.identifier,
    from: types.optional(types.string, ''),
    message: types.optional(types.string, ''),
  })
  .views(self => ({
    get store() {
      return self.__getStore<typeof RootStore.Type>()
    }
  }))
/* #endregion */
