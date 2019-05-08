/* This is a mst-sql generated file */
import { types } from "mobx-state-tree"
import { MSTGQLObject } from "mst-gql"

/* #region type-imports */

/* #endregion */

/* #region fragments */
export const rocketPrimitives = `
__typename
id
name
type
`

/* #endregion */

/* #region type-def */

/**
* Rocket
*/
const Rocket = MSTGQLObject
  .named('Rocket')
  .props({
    id: types.identifier,
    name: types.optional(types.string, ''),
    type: types.optional(types.string, ''),
  }) /* #endregion */

export { Rocket }
