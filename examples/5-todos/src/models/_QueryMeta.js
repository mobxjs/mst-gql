/* This is a mst-sql generated file */
import { types } from "mobx-state-tree"
import { MSTGQLObject, MSTGQLRef } from "mst-gql"

/* #region type-imports */

/* #endregion */

/* #region fragments */
export const _QueryMetaPrimitives = `
__typename
count
`

/* #endregion */

/* #region type-def */

/**
* _QueryMeta
 *
 * Meta information about the query.
*/
const _QueryMeta = MSTGQLObject
  .named('_QueryMeta')
  .props({
    count: types.integer,
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

export { _QueryMeta }