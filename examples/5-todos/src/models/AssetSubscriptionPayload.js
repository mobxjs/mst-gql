/* This is a mst-sql generated file */
import { types } from "mobx-state-tree"
import { MSTGQLObject, MSTGQLRef } from "mst-gql"

/* #region type-imports */
import { _ModelMutationType } from "./_ModelMutationType"
import { Asset } from "./Asset"
import { AssetPreviousValues } from "./AssetPreviousValues"
/* #endregion */

/* #region fragments */
export const assetSubscriptionPayloadPrimitives = `
__typename
updatedFields
`

/* #endregion */

/* #region type-def */

/**
* AssetSubscriptionPayload
*/
const AssetSubscriptionPayload = MSTGQLObject
  .named('AssetSubscriptionPayload')
  .props({
    mutation: _ModelMutationType,
    node: types.maybe(MSTGQLRef(types.late(() => Asset))),
    updatedFields: types.array(types.string),
    previousValues: types.maybe(MSTGQLRef(types.late(() => AssetPreviousValues))),
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

export { AssetSubscriptionPayload }