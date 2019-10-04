/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { LaunchModel } from "./LaunchModel"
import { LaunchModelSelector } from "./LaunchModel.base"


/**
 * UserBase
 * auto generated base class for the model UserModel.
 */
export const UserModelBase = ModelBase
  .named('User')
  .props({
    __typename: types.optional(types.literal("User"), "User"),
    id: types.identifier,
    email: types.maybeNull(types.string),
    trips: types.optional(types.array(MSTGQLRef(types.late(() => LaunchModel))), []),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class UserModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get email() { return this.__attr(`email`) }
  trips(builder) { return this.__child(`trips`, LaunchModelSelector, builder) }
}
export function selectFromUser() {
  return new UserModelSelector()
}

export const userModelPrimitives = selectFromUser().email
