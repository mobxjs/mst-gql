/* This is a mst-sql generated file */
import { types } from "mobx-state-tree"
import { MSTGQLObject, MSTGQLRef } from "mst-gql"

/* #region type-imports */
import { User } from "./User"
/* #endregion */

/* #region fragments */
export const messagePrimitives = `
__typename
id
text
`

/* #endregion */

/* #region type-def */

/**
* Message
*/
const Message = MSTGQLObject
  .named('Message')
  .props({
    id: types.identifier,
    user: MSTGQLRef(types.late(() => User)),
    text: types.string,
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

export { Message }