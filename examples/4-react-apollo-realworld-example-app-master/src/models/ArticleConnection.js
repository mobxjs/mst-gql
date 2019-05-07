/* This is a mst-sql generated file */
import { types } from "mobx-state-tree"
import { MSTGQLObject } from "mst-gql"

/* #region type-imports */
import { ArticleEdge } from "./ArticleEdge"
import { PageInfo } from "./PageInfo"
/* #endregion */

/* #region fragments */
export const articleConnectionPrimitives = `
id
__typename
`

/* #endregion */

/* #region type-def */

/**
* ArticleConnection
 *
 * The connection type for Article.
*/
const ArticleConnection = MSTGQLObject
  .named('ArticleConnection')
  .props({
    /** A list of edges. */
    edges: types.array(types.reference(types.late(() => ArticleEdge))),
    /** Information to aid in pagination. */
    pageInfo: types.reference(types.late(() => PageInfo)),
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

export { ArticleConnection }