/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin } from "mst-gql"

import { LaunchConnectionModel } from "./LaunchConnectionModel"
import { launchConnectionModelPrimitives, LaunchConnectionModelSelector } from "./LaunchConnectionModel.base"
import { LaunchModel } from "./LaunchModel"
import { launchModelPrimitives, LaunchModelSelector } from "./LaunchModel.base"
import { MissionModel } from "./MissionModel"
import { missionModelPrimitives, MissionModelSelector } from "./MissionModel.base"
import { RocketModel } from "./RocketModel"
import { rocketModelPrimitives, RocketModelSelector } from "./RocketModel.base"
import { UserModel } from "./UserModel"
import { userModelPrimitives, UserModelSelector } from "./UserModel.base"






/**
* Store, managing, among others, all the objects received through graphQL
*/
export const RootStoreBase = MSTGQLStore
  .named("RootStore")
  .extend(configureStoreMixin([['LaunchConnection', () => LaunchConnectionModel], ['Launch', () => LaunchModel], ['Mission', () => MissionModel], ['Rocket', () => RocketModel], ['User', () => UserModel]], ['Launch', 'Rocket', 'User'], "js"))
  .props({
    launches: types.optional(types.map(types.late(() => LaunchModel)), {}),
    rockets: types.optional(types.map(types.late(() => RocketModel)), {}),
    users: types.optional(types.map(types.late(() => UserModel)), {})
  })
  .actions(self => ({
    queryLaunches(variables, resultSelector = launchConnectionModelPrimitives.toString(), options = {}) {
      return self.query(`query launches($pageSize: Int, $after: String) { launches(pageSize: $pageSize, after: $after) {
        ${typeof resultSelector === "function" ? resultSelector(new LaunchConnectionModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryLaunch(variables, resultSelector = launchModelPrimitives.toString(), options = {}) {
      return self.query(`query launch($id: ID!) { launch(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new LaunchModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryMe(variables, resultSelector = userModelPrimitives.toString(), options = {}) {
      return self.query(`query me { me {
        ${typeof resultSelector === "function" ? resultSelector(new UserModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
  }))
