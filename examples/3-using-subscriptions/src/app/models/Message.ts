/* This is a mst-sql generated file */
import { types } from "mobx-state-tree"
import { MSTGQLObject } from "mst-gql"


/* #region type-imports */

/* #endregion */

/* #region type-def */

/**
 * Message
 */
const Message = MSTGQLObject
  .named('Message')
  .props({
    id: types.identifier,
    from: types.optional(types.string, ''),
    message: types.optional(types.string, ''),
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