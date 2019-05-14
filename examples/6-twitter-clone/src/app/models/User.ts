/* This is a mst-sql generated file */

/* #region type-imports */
import { types } from "mobx-state-tree"
import { MSTGQLObject, MSTGQLRef } from "mst-gql"
import { RootStore } from "./index"
/* #endregion */

/* #region fragments */
export const userPrimitives = `
__typename
id
name
avatar
`

/* #endregion */

/* #region type-def */
export type UserType = typeof User.Type

/**
* User
*/
export const User = MSTGQLObject
  .named('User')
  .props({
    __typename: types.optional(types.literal("User"), "User"),
    id: types.identifier,
    name: types.string,
    avatar: types.string,
  })
  .views(self => ({
    get store() {
      return self.__getStore<typeof RootStore.Type>()
    }
  })) /* #endregion */

  .actions(self => ({
    // this is just an auto-generated example action.
    // Feel free to add your own actions, props, views etc to the model.
    // Any code outside the '#region mst-gql-*'  regions will be preserved
    log() {
      console.log(JSON.stringify(self))
    }
  }))
