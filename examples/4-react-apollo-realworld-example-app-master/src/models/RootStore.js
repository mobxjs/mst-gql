/* This is a mst-sql generated file */
import { types } from "mobx-state-tree"
import { MSTGQLStore } from "mst-gql"

/* #region type-imports */
import { Article, User, ArticleConnection, ArticleEdge, PageInfo, FollowersConnection, UserEdge, Comment, Viewer } from "./index"
/* #endregion */

/* #region type-def */
/**
* Store, managing, among others, all the objects received through graphQL
*/
const RootStore = MSTGQLStore
.named("RootStore")
.props({
    articles: types.optional(types.map(Article), {}),
    users: types.optional(types.map(User), {}),
    articleconnections: types.optional(types.map(ArticleConnection), {}),
    articleedges: types.optional(types.map(ArticleEdge), {}),
    pageinfos: types.optional(types.map(PageInfo), {}),
    followersconnections: types.optional(types.map(FollowersConnection), {}),
    useredges: types.optional(types.map(UserEdge), {}),
    comments: types.optional(types.map(Comment), {}),
    viewers: types.optional(types.map(Viewer), {})
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

export { RootStore }