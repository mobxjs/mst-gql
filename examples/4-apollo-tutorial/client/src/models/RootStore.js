/* This is a mst-sql generated file */
import { types } from "mobx-state-tree"
import { MSTGQLStore } from "mst-gql"

/* #region type-imports */
import { LaunchConnection, Launch, Mission, Rocket, User } from "./index"
/* #endregion */

export const GET_LAUNCHES = `
  query GetLaunchList($after: String) {
    launches(after: $after) {
      cursor
      hasMore
      launches {
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`;

const loginStatus = types.enumeration("loginStatus", [
  "loggedOut",
  "pending",
  "error",
  "loggedIn"
])

/* #region type-def */
/**
 * Store, managing, among others, all the objects received through graphQL
 */
const RootStore = MSTGQLStore.named("RootStore")
  .props({
    launchconnections: types.optional(types.map(LaunchConnection), {}),
    launchs: types.optional(types.map(Launch), {}),
    missions: types.optional(types.map(Mission), {}),
    rockets: types.optional(types.map(Rocket), {}),
    users: types.optional(types.map(User), {})
  })

  /* #endregion */
  .props({
    loginStatus: loginStatus,
    cartItems: types.array(types.string)
  })
  .views(self => ({
    get me() {
      return Array.from(self.users.values())[0]
    },
    get hasTrips() {
      return self.me && self.me.trips.length
    }
  }))
  .actions(self => ({
    addOrRemoveFromCart({ id }) {
      self.cartItems = cartItems.includes(id)
        ? cartItems.filter(i => i !== id)
        : [...cartItems, id]
    },
    login: flow(function* login(email) {
      try {
        const { login } = yield self.mutate(`mutation login($email: String)`, {
          email
        })
        localStorage.setItem("token", login)
        self.loginStatus = "loggedIn"
      } catch {
        self.loginStatus = "error"
      }
    }),
    logout() {
      self.loginStatus = "loggedOut"
      localStorage.clear();
    },
    fetchLaunches(after?) {
      return self.query(GET_LAUNCHES, after ? { after } : undefined)
    }
  }))

export { RootStore }
