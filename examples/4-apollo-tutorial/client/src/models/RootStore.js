/* This is a mst-sql generated file */
import { flow, getSnapshot } from "mobx-state-tree"
import { localStorageMixin } from "mst-gql"

/* #region type-imports */
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin } from "mst-gql"
import { LaunchConnection, launchConnectionPrimitives, Launch, launchPrimitives, Mission, missionPrimitives, Rocket, rocketPrimitives, User, userPrimitives } from "./index"
import gql from "graphql-tag";
/* #endregion */

export const LAUNCH_TILE_DATA = gql`
  fragment LaunchTile on Launch {
    __typename
    id
    isBooked
    rocket {
      id
      __typename
      name
    }
    mission {
      __typename
      name
      missionPatch
    }
  }
`

export const GET_LAUNCHES = gql`
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

export const BOOK_TRIPS = gql`
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
export const RootStore = MSTGQLStore
  .named("RootStore")
  .extend(configureStoreMixin([['LaunchConnection', () => LaunchConnection], ['Launch', () => Launch], ['Mission', () => Mission], ['Rocket', () => Rocket], ['User', () => User]], ['Launch', 'Rocket', 'User']))
  .props({
    launchs: types.optional(types.map(types.late(() => Launch)), {}),
    rockets: types.optional(types.map(types.late(() => Rocket)), {}),
    users: types.optional(types.map(types.late(() => User)), {})
  })
  .actions(self => ({
    queryLaunches(variables, resultSelector = launchConnectionPrimitives, options = {}) {
      return self.query(`query launches($pageSize: Int, $after: String) { launches(pageSize: $pageSize, after: $after) {
        ${resultSelector}
      } }`, variables, options)
    },
    queryLaunch(variables, resultSelector = launchPrimitives, options = {}) {
      return self.query(`query launch($id: ID!) { launch(id: $id) {
        ${resultSelector}
      } }`, variables, options)
    },
    queryMe(variables, resultSelector = userPrimitives, options = {}) {
      return self.query(`query me { me {
        ${resultSelector}
      } }`, variables, options)
    },    
  }))
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
        gql`
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
          }
        `,
        { launchId }
      )
    },
    login: flow(function* login(email) {
      try {
        const login = yield self.mutate(
          gql`
            mutation login($email: String) {
              login(email: $email)
            }
          `,
          {
            email
          }
        )
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
  .extend(localStorageMixin())
