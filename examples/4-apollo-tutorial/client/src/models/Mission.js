/* This is a mst-sql generated file */
import { types } from "mobx-state-tree"
import { MSTGQLObject } from "mst-gql"

/* #region type-imports */

/* #endregion */

/* #region fragments */
export const missionPrimitives = `
__typename
name
`

/* #endregion */

/* #region type-def */

/**
* Mission
*/
const Mission = MSTGQLObject
  .named('Mission')
  .props({
    name: types.optional(types.string, ''),
  }) /* #endregion */

export { Mission }
