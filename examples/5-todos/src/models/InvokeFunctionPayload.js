/* This is a mst-sql generated file */
import { types } from "mobx-state-tree"
import { MSTGQLObject, MSTGQLRef } from "mst-gql"

/* #region type-imports */

/* #endregion */

/* #region fragments */
export const invokeFunctionPayloadPrimitives = `
__typename
result
clientMutationId
`

/* #endregion */

/* #region type-def */

/**
* InvokeFunctionPayload
*/
const InvokeFunctionPayload = MSTGQLObject
  .named('InvokeFunctionPayload')
  .props({
    result: types.string,
    clientMutationId: types.optional(types.string, ''),
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

export { InvokeFunctionPayload }