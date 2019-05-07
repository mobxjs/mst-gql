/* #region mst-gql-header */
/* This file is generated using mst-gql-scaffold.js Tue, 07 May 2019 07:29:59 GMT */
import { types } from "mobx-state-tree"
import { MSTGQLObject } from "mst-gql"

import { Message } from "./index"
/* #endregion */

/* #region mst-gql-body */
/**
 * Query
 *
 * 
 */
const Query = MSTGQLObject
  .named('Query')
  .props({
    messages: types.array(types.reference(Message)),
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