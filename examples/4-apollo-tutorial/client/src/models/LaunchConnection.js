/* This is a mst-sql generated file */
import { types } from "mobx-state-tree"
import { MSTGQLObject } from "mst-gql"

/* #region type-imports */
import { Launch } from "./Launch"
/* #endregion */

/* #region fragments */
export const launchConnectionPrimitives = `
__typename
cursor
hasMore
`

/* #endregion */

/* #region type-def */

/**
* LaunchConnection
 *
 * Simple wrapper around our list of launches that contains a cursor to the last item in the list. Pass this cursor to the launches query to fetch results after these.
*/
const LaunchConnection = MSTGQLObject
  .named('LaunchConnection')
  .props({
    cursor: types.string,
    hasMore: types.boolean,
    launches: types.array(types.reference(types.late(() => Launch))),
  }) /* #endregion */

  .actions(self => ({
    fetchMore() {
      return self.store.fetchLaunches(self.cursor)
    }
  }))

export { LaunchConnection }
