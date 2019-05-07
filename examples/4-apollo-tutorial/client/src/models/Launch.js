/* This is a mst-sql generated file */
import { types } from "mobx-state-tree"
import { MSTGQLObject } from "mst-gql"

/* #region type-imports */
import { Mission } from "./Mission"
import { Rocket } from "./Rocket"
/* #endregion */

/* #region fragments */
export const launchPrimitives = `
id
__typename
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
      name
      __typename
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
    site: types.optional(types.string, ''),
    mission: types.maybe(types.reference(types.late(() => Mission))),
    rocket: types.maybe(types.reference(types.late(() => Rocket))),
    isBooked: types.boolean,
  }) /* #endregion */
  .views(self => ({
    get isInCart() {
      return self.store.cartItems.contains(self.id)
    }
  }))

export { Launch }
