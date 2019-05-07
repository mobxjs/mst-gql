/* This is a mst-sql generated file */
import { types } from "mobx-state-tree"
import { MSTGQLObject } from "mst-gql"

/* #region type-imports */
import { User } from "./User"
import { Comment } from "./Comment"
/* #endregion */

/* #region fragments */
export const articlePrimitives = `
id
__typename
body
createdAt
description
favoritesCount
slug
tagList
title
updatedAt
viewerHasFavorited
`

/* #endregion */

/* #region type-def */

/**
* Article
*/
const Article = MSTGQLObject
  .named('Article')
  .props({
    author: types.maybe(types.reference(types.late(() => User))),
    body: types.string,
    comments: types.array(types.reference(types.late(() => Comment))),
    createdAt: types.frozen,
    description: types.string,
    favoritesCount: types.integer,
    slug: types.string,
    tagList: types.array(types.string),
    title: types.string,
    updatedAt: types.frozen,
    viewerHasFavorited: types.boolean,
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

export { Article }