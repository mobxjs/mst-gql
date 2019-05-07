/* This is a mst-sql generated file */
import { types } from "mobx-state-tree"
import { MSTGQLObject } from "mst-gql"

/* #region type-imports */
import { Message, messageFieldsDeep } from "./Message"
/* #endregion */

/* #region fragments */
export const queryPrimitives = `
id
__typename
`
export const queryFieldsShallow = queryPrimitives + `
messages { id __typename }
`

export const queryFieldsDeep = queryPrimitives + `
messages { id, __typename ${messageFieldsDeep} }
`
/* #endregion */

/* #region type-def */

/**
* Query
*/
const Query = MSTGQLObject
.named('Query')
.props({
    messages: types.array(types.reference(types.late(() => Message))),
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