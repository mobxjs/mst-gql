/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLObject, MSTGQLRef, QueryBuilder } from "mst-gql"
import { MissionModel } from "./MissionModel"
import { MissionModelSelector } from "./MissionModel.base"
import { RocketModel } from "./RocketModel"
import { RocketModelSelector } from "./RocketModel.base"


/**
 * LaunchBase
 * auto generated base class for the model LaunchModel.
 */
export const LaunchModelBase = MSTGQLObject
  .named('Launch')
  .props({
    __typename: types.optional(types.literal("Launch"), "Launch"),
    id: types.identifier,
    site: types.maybeNull(types.string),
    mission: types.maybeNull(types.late(() => MissionModel)),
    rocket: types.maybeNull(MSTGQLRef(types.late(() => RocketModel))),
    isBooked: types.maybeNull(types.boolean),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class LaunchModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get site() { return this.__attr(`site`) }
  get isBooked() { return this.__attr(`isBooked`) }
  mission(builder) { return this.__child(`mission`, MissionModelSelector, builder) }
  rocket(builder) { return this.__child(`rocket`, RocketModelSelector, builder) }
}
export function selectFromLaunch() {
  return new LaunchModelSelector()
}

export const launchModelPrimitives = selectFromLaunch().site.isBooked
