/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLObject, MSTGQLRef, QueryBuilder } from "mst-gql"
import { LaunchModel } from "./LaunchModel"
import { LaunchModelSelector } from "./LaunchModel.base"


/**
 * LaunchConnectionBase
 * auto generated base class for the model LaunchConnectionModel.
 *
 * Simple wrapper around our list of launches that contains a cursor to the last item in the list. Pass this cursor to the launches query to fetch results after these.
 */
export const LaunchConnectionModelBase = MSTGQLObject
  .named('LaunchConnection')
  .props({
    __typename: types.optional(types.literal("LaunchConnection"), "LaunchConnection"),
    cursor: types.maybeNull(types.string),
    hasMore: types.maybeNull(types.boolean),
    launches: types.optional(types.array(MSTGQLRef(types.late(() => LaunchModel))), []),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class LaunchConnectionModelSelector extends QueryBuilder {
  get cursor() { return this.__attr(`cursor`) }
  get hasMore() { return this.__attr(`hasMore`) }
  launches(builder) { return this.__child(`launches`, LaunchModelSelector, builder) }
}
export function selectFromLaunchConnection() {
  return new LaunchConnectionModelSelector()
}

export const launchConnectionModelPrimitives = selectFromLaunchConnection().cursor.hasMore
