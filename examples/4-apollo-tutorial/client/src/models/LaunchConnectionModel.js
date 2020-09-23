import { LaunchConnectionModelBase } from "./LaunchConnectionModel.base"

/* A graphql query fragment builders for LaunchConnectionModel */
export {
  selectFromLaunchConnection,
  launchConnectionModelPrimitives,
  LaunchConnectionModelSelector
} from "./LaunchConnectionModel.base"

/**
 * LaunchConnectionModel
 *
 * Simple wrapper around our list of launches that contains a cursor to the last item in the list. Pass this cursor to the launches query to fetch results after these.
 */
export const LaunchConnectionModel = LaunchConnectionModelBase.volatile(
  (self) => ({
    isFetchingMore: false
  })
).actions((self) => ({
  fetchMore() {
    self.isFetchingMore = true
    const query = self.store.fetchLaunches(self.cursor)
    query.then((lc) => self.doneFetchingMore(lc))
    return query
  },
  doneFetchingMore(launchConnection) {
    self.isFetchingMore = false
    self.cursor = launchConnection.cursor
    self.hasMore = launchConnection.hasMore
    self.launches.push(...launchConnection.launches)
  }
}))
