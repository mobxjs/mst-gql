/* This is a mst-sql generated file */
import { types, flow, getSnapshot } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin } from "mst-gql"
import { LAUNCH_TILE_DATA } from "./Launch"

/* #region type-imports */
import { LaunchConnection, Launch, Mission, Rocket, User } from "./index"
/* #endregion */

export const GET_LAUNCHES = `
  query GetLaunchList($after: String) {
    launches(after: $after) {
      __typename
      cursor
      hasMore
      launches {
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`

export const BOOK_TRIPS = `
  mutation BookTrips($launchIds: [ID]!) {
    bookTrips(launchIds: $launchIds) {
      success
      message
      launches {
        __typename
        id
        isBooked
      }
    }
  }
`

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
  .extend(
    configureStoreMixin(
      [
        ["LaunchConnection", LaunchConnection],
        ["Launch", Launch],
        ["Mission", Mission],
        ["Rocket", Rocket],
        ["User", User]
      ],
      ["Launch", "Rocket", "User"]
    )
  )
  .props({
    launchs: types.optional(types.map(Launch), {}),
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
    addOrRemoveFromCart(id) {
      self.cartItems = self.cartItems.includes(id)
        ? self.cartItems.filter(i => i !== id)
        : [...self.cartItems, id]
    },
    cancelTrip(launchId) {
      return self.mutate(
        `
      mutation cancel($launchId: ID!) {
        cancelTrip(launchId: $launchId) {
          success
          message
          launches {
            __typename
            id
            isBooked
          }
        }
      }`,
        { launchId }
      )
    },
    login: flow(function* login(email) {
      try {
        const login = yield self
          .mutate(
            `mutation login($email: String){
            login(email: $email)
          }`,
            {
              email
            }
          )
          .toPromise()
        localStorage.setItem("token", login)
        self.loginStatus = "loggedIn"
      } catch {
        self.loginStatus = "error"
      }
    }),
    logout() {
      self.loginStatus = "loggedOut"
      localStorage.clear()
    },
    fetchLaunches(after) {
      return self.query(GET_LAUNCHES, after ? { after } : undefined)
    },
    clearCart() {
      self.cartItems.splice(0)
    },
    bookTrips() {
      return self.mutate(
        BOOK_TRIPS,
        { launchIds: getSnapshot(self.cartItems) },
        self.clearCart // optimistically clear the cart
      )
    }
  }))

export { RootStore }
