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
  })
/* #endregion */

  .actions(self => ({
    // this is just an auto-generated example action. 
    // Feel free to add your own actions, props, views etc to the model. 
    // Any code outside the '#region mst-gql-*'  regions will be preserved
    log() {
      console.log(JSON.stringify(self))
    }
  }))

export { Launch }