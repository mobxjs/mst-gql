/* This is a mst-sql generated file */
import { types } from "mobx-state-tree"
import { MSTGQLObject } from "mst-gql"

/* #region type-imports */
import { Article } from "./Article"
/* #endregion */

/* #region fragments */
export const articleEdgePrimitives = `
id
__typename
cursor
`

/* #endregion */

/* #region type-def */

/**
* ArticleEdge
 *
 * An edge in a connection.
*/
const ArticleEdge = MSTGQLObject
  .named('ArticleEdge')
  .props({
    /** A cursor for use in pagination. */
    cursor: types.string,
    /** The item at the end of the edge. */
    node: types.maybe(types.reference(types.late(() => Article))),
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

export { ArticleEdge }