/* This is a mst-sql generated file */
import { types } from "mobx-state-tree"
import { MSTGQLObject } from "mst-gql"

/* #region type-imports */
import { Message, messageFieldsDeep } from "./Message"
/* #endregion */

/* #region fragments */
export const subscriptionFieldsShallow = `
id
__typename
newMessages {
  id
  __typename
}
`

export const subscriptionFieldsDeep = `
id
__typename
newMessages {
  ${messageFieldsDeep}
}
`

/* #endregion */

/* #region type-def */

/**
* Subscription
*/
const Subscription = MSTGQLObject
.named('Subscription')
.props({
    newMessages: types.maybe(types.reference(types.late(() => Message))),
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

export { Subscription }