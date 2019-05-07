/* This is a mst-sql generated file */
import { types } from "mobx-state-tree"
import { MSTGQLStore } from "mst-gql"

/* #region type-imports */
import { LaunchConnection, Launch, Mission, Rocket, User } from "./index"
/* #endregion */

/* #region type-def */
/**
* Store, managing, among others, all the objects received through graphQL
*/
const RootStore = MSTGQLStore
.named("RootStore")
.props({
    launchconnections: types.optional(types.map(LaunchConnection), {}),
    launchs: types.optional(types.map(Launch), {}),
    missions: types.optional(types.map(Mission), {}),
    rockets: types.optional(types.map(Rocket), {}),
    users: types.optional(types.map(User), {})
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

export { RootStore }