/* This is a mst-sql generated file */
import { types } from "mobx-state-tree"
import { MSTGQLObject, MSTGQLRef } from "mst-gql"

/* #region type-imports */

/* #endregion */

/* #region fragments */
export const todoPreviousValuesPrimitives = `
__typename
createdAt
done
id
isPublished
title
updatedAt
`

/* #endregion */

/* #region type-def */

/**
* TodoPreviousValues
*/
const TodoPreviousValues = MSTGQLObject
  .named('TodoPreviousValues')
  .props({
    createdAt: types.frozen(),
    done: types.boolean,
    id: types.identifier,
    /** Indicates if the record is published */
    isPublished: types.boolean,
    title: types.string,
    updatedAt: types.frozen(),
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

export { TodoPreviousValues }