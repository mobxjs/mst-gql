/* This is a mst-sql generated file */
import { types } from "mobx-state-tree"
import { MSTGQLObject } from "mst-gql"

/* #region type-imports */

/* #endregion */

/* #region fragments */
export const pageInfoPrimitives = `
id
__typename
endCursor
hasNextPage
hasPreviousPage
startCursor
`

/* #endregion */

/* #region type-def */

/**
* PageInfo
 *
 * Information about pagination in a connection.
*/
const PageInfo = MSTGQLObject
  .named('PageInfo')
  .props({
    /** When paginating forwards, the cursor to continue. */
    endCursor: types.optional(types.string, ''),
    /** When paginating forwards, are there more items? */
    hasNextPage: types.boolean,
    /** When paginating backwards, are there more items? */
    hasPreviousPage: types.boolean,
    /** When paginating backwards, the cursor to continue. */
    startCursor: types.optional(types.string, ''),
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

export { PageInfo }