/* This is a mst-sql generated file */
import { types } from "mobx-state-tree"
import { MSTGQLObject } from "mst-gql"

/* #region type-imports */

/* #endregion */

/* #region fragments */
export const missionPrimitives = `
id
__typename
name
`

/* #endregion */

/* #region type-def */

/**
 * Mission
 */
const Mission = MSTGQLObject.named("Mission")
  .props({
    name: types.optional(types.string, "")
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

export { Mission }
