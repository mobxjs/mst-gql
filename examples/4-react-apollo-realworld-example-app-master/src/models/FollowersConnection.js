/* This is a mst-sql generated file */
import { types } from "mobx-state-tree"
import { MSTGQLObject } from "mst-gql"

/* #region type-imports */
import { UserEdge } from "./UserEdge"
import { User } from "./User"
import { PageInfo } from "./PageInfo"
/* #endregion */

/* #region fragments */
export const followersConnectionPrimitives = `
id
__typename
totalCount
`

/* #endregion */

/* #region type-def */

/**
* FollowersConnection
 *
 * The connection type for User.
*/
const FollowersConnection = MSTGQLObject
  .named('FollowersConnection')
  .props({
    /** A list of edges. */
    edges: types.array(types.reference(types.late(() => UserEdge))),
    /** A list of nodes. */
    nodes: types.array(types.reference(types.late(() => User))),
    /** Information to aid in pagination. */
    pageInfo: types.reference(types.late(() => PageInfo)),
    totalCount: types.integer,
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

export { FollowersConnection }