/* This is a mst-sql generated file */

/* #region type-imports */
import { types } from "mobx-state-tree"
import { MSTGQLObject, MSTGQLRef } from "mst-gql"
import { RootStore } from "./index"
/* #endregion */

/* #region fragments */
export const rocketPrimitives = `
__typename
id
name
type
`

/* #endregion */

/* #region type-def */

/**
* Rocket
*/
export const Rocket = MSTGQLObject
  .named('Rocket')
  .props({
    __typename: types.optional(types.literal("Rocket"), "Rocket"),
    id: types.identifier,
    name: types.optional(types.string, ''),
    type: types.optional(types.string, ''),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  })) /* #endregion */
