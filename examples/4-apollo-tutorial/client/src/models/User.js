/* This is a mst-sql generated file */
import { types } from "mobx-state-tree"
import { MSTGQLObject } from "mst-gql"

/* #region type-imports */
import { Launch } from "./Launch"
/* #endregion */

/* #region fragments */
export const userPrimitives = `
__typename
id
email
`

/* #endregion */

/* #region type-def */

/**
* User
*/
const User = MSTGQLObject
  .named('User')
  .props({
    id: types.identifier,
    email: types.string,
    trips: types.array(types.reference(types.late(() => Launch))),
  }) /* #endregion */

  .actions(self => ({
    // this is just an auto-generated example action.
    // Feel free to add your own actions, props, views etc to the model.
    // Any code outside the '#region mst-gql-*'  regions will be preserved
    log() {
      console.log(JSON.stringify(self))
    }
  }))

export { User }
