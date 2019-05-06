/* #region mst-gql-header */
/* This file is generated using mst-gql-scaffold.js Mon, 06 May 2019 19:29:32 GMT */
import { types } from "mobx-state-tree"
import { MSTGQLObject } from "mst-gql"
/* #endregion */

/* #region mst-gql-body */
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

/* #region mst-gql-footer */
export { Query }
/* #endregion */