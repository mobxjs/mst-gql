/* This is a mst-sql generated file */

/* #region type-imports */
import { types } from "mobx-state-tree"
import { MSTGQLObject, MSTGQLRef } from "mst-gql"
import { RootStore } from "./index"
import { Mission } from "./Mission"

import { Rocket } from "./Rocket"
/* #endregion */

/* #region fragments */
export const launchPrimitives = `
__typename
id
site
isBooked
`

/* #endregion */

/* #region type-def */

/**
* Launch
*/
export const Launch = MSTGQLObject
  .named('Launch')
  .props({
    id: types.identifier,
    site: types.optional(types.string, ''),
    mission: types.maybe(types.late(() => Mission)),
    rocket: types.maybe(MSTGQLRef(types.late(() => Rocket))),
    isBooked: types.boolean,
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  })) /* #endregion */
  .views(self => ({
    get isInCart() {
      return self.store.cartItems.includes(self.id)
    }
  }))
