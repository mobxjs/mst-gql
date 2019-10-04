/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * RocketBase
 * auto generated base class for the model RocketModel.
 */
export const RocketModelBase = ModelBase
  .named('Rocket')
  .props({
    __typename: types.optional(types.literal("Rocket"), "Rocket"),
    id: types.identifier,
    name: types.maybeNull(types.string),
    type: types.maybeNull(types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class RocketModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
  get type() { return this.__attr(`type`) }
}
export function selectFromRocket() {
  return new RocketModelSelector()
}

export const rocketModelPrimitives = selectFromRocket().name.type
