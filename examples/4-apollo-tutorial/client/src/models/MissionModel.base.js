/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLObject, QueryBuilder } from "mst-gql"


/**
 * MissionBase
 * auto generated base class for the model MissionModel.
 */
export const MissionModelBase = MSTGQLObject
  .named('Mission')
  .props({
    __typename: types.optional(types.literal("Mission"), "Mission"),
    name: types.maybeNull(types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class MissionModelSelector extends QueryBuilder {
  get name() { return this.__attr(`name`) }
}
export function selectFromMission() {
  return new MissionModelSelector()
}

export const missionModelPrimitives = selectFromMission().name
