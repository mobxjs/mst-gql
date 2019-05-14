/* This is a mst-sql generated file */

/* #region type-imports */
import { types } from "mobx-state-tree"
import { MSTGQLObject, MSTGQLRef } from "mst-gql"
import { RootStore } from "./index"
import { Launch } from "./Launch"
/* #endregion */

/* #region fragments */
export const userPrimitives = `
__typename
id
email
`

/* #endregion */

/* #region type-def */

/**
* User
*/
export const User = MSTGQLObject
  .named('User')
  .props({
    __typename: types.optional(types.literal("User"), "User"),
    id: types.identifier,
    email: types.string,
    trips: types.array(MSTGQLRef(types.late(() => Launch))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  })) /* #endregion */
