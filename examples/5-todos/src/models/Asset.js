/* This is a mst-sql generated file */
import { types } from "mobx-state-tree"
import { MSTGQLObject, MSTGQLRef } from "mst-gql"

/* #region type-imports */

/* #endregion */

/* #region fragments */
export const assetPrimitives = `
__typename
createdAt
fileName
handle
height
id
mimeType
size
updatedAt
url
width
`

/* #endregion */

/* #region type-def */

/**
* Asset
 *
 * System model for Assets
*/
const Asset = MSTGQLObject
  .named('Asset')
  .props({
    createdAt: types.frozen(),
    /** The file name */
    fileName: types.string,
    /** The file handle */
    handle: types.string,
    /** The height of the file in case it is an image */
    height: types.optional(types.number, 0),
    id: types.identifier,
    /** The mimeType of the file */
    mimeType: types.optional(types.string, ''),
    /** The size of the file */
    size: types.optional(types.number, 0),
    updatedAt: types.frozen(),
    /** The url of the file */
    url: types.string,
    /** The width of the file in case it is an image */
    width: types.optional(types.number, 0),
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

export { Asset }