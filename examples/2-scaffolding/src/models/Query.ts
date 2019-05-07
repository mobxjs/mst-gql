/* This is a mst-sql generated file */
import { types } from "mobx-state-tree"
import { MSTGQLObject } from "mst-gql"

/* #region type-imports */

/* #endregion */

/* #region fragments */
export const queryPrimitives = `
id
__typename
`

/* #endregion */

/* #region type-def */

/**
* Query
 *
 * Query any Pokémon by number or name
*/
const Query = MSTGQLObject
.named('Query')
.props({
    query: types.maybe(types.reference(types.late((): any => Query))),
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

export { Query }