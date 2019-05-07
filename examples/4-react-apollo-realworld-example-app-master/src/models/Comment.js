/* This is a mst-sql generated file */
import { types } from "mobx-state-tree"
import { MSTGQLObject } from "mst-gql"

/* #region type-imports */
import { Article } from "./Article"
import { User } from "./User"
/* #endregion */

/* #region fragments */
export const commentPrimitives = `
id
__typename
body
createdAt
updatedAt
`

/* #endregion */

/* #region type-def */

/**
* Comment
*/
const Comment = MSTGQLObject
  .named('Comment')
  .props({
    article: types.maybe(types.reference(types.late(() => Article))),
    author: types.maybe(types.reference(types.late(() => User))),
    body: types.string,
    createdAt: types.frozen,
    updatedAt: types.frozen,
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

export { Comment }