/* This is a mst-sql generated file */
import { types } from "mobx-state-tree"
import { MSTGQLObject } from "mst-gql"

/* #region type-imports */
import { User } from "./User"
/* #endregion */

/* #region fragments */
export const viewerPrimitives = `
id
__typename
`

/* #endregion */

/* #region type-def */

/**
* Viewer
*/
const Viewer = MSTGQLObject
  .named('Viewer')
  .props({
    user: types.reference(types.late(() => User)),
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

export { Viewer }