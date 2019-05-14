/* This is a mst-sql generated file */

/* #region type-imports */
import { types } from "mobx-state-tree"
import { MSTGQLObject, MSTGQLRef } from "mst-gql"
import { RootStore } from "./index"
/* #endregion */

/* #region fragments */
export const missionPrimitives = `
__typename
name
`

/* #endregion */

/* #region type-def */

/**
* Mission
*/
export const Mission = MSTGQLObject
  .named('Mission')
  .props({
    __typename: types.optional(types.literal("Mission"), "Mission"),
    name: types.optional(types.string, ''),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  })) /* #endregion */
