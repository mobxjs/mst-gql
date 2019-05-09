/* This is a mst-sql generated file */
import { types } from "mobx-state-tree"
import { MSTGQLObject, MSTGQLRef } from "mst-gql"

/* #region type-imports */
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
export const LAUNCH_TILE_DATA = `
  fragment LaunchTile on Launch {
    __typename
    id
    isBooked
    rocket {
      id
      __typename
      name
    }
    mission {
      __typename
      name
      missionPatch
    }
  }
`

/* #region type-def */

/**
* Launch
*/
const Launch = MSTGQLObject
  .named('Launch')
  .props({
    id: types.identifier,
    site: types.optional(types.string, ''),
    mission: types.maybe(types.late(() => Mission)),
    rocket: types.maybe(MSTGQLRef(types.late(() => Rocket))),
    isBooked: types.boolean,
  }) /* #endregion */
  .views(self => ({
    get isInCart() {
      return self.store.cartItems.includes(self.id)
    }
  }))

export { Launch }
