/* This is a mst-sql generated file */
import { types } from "mobx-state-tree"
import { MSTGQLObject, MSTGQLRef } from "mst-gql"

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
    launches: types.array(MSTGQLRef(types.late(() => Launch))),
  }) /* #endregion */
  .volatile(self => ({
    isFetchingMore: false
  }))
  .actions(self => ({
    // TODO: refactor this, having view state in the store probably works better
    fetchMore() {
      self.isFetchingMore = true
      const query = self.store.fetchLaunches(self.cursor)
      query.then(lc => self.doneFetchingMore(lc))
      return query
    },
    doneFetchingMore(launchConnection) {
      self.isFetchingMore = false
      self.cursor = launchConnection.cursor
      self.hasMore = launchConnection.hasMore
      self.launches.push(...launchConnection.launches)
    }
  }))

export { LaunchConnection }
