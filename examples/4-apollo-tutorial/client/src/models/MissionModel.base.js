/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { PatchSize } from "./PatchSizeEnum"


/**
 * MissionBase
 * auto generated base class for the model MissionModel.
 */
export const MissionModelBase = ModelBase
  .named('Mission')
  .props({
    __typename: types.optional(types.literal("Mission"), "Mission"),
    name: types.union(types.undefined, types.null, types.string),
    missionPatch: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class MissionModelSelector extends QueryBuilder {
  get name() { return this.__attr(`name`) }
  get missionPatch() { return this.__attr(`missionPatch`) }
}
export function selectFromMission() {
  return new MissionModelSelector()
}

export const missionModelPrimitives = selectFromMission().name.missionPatch
