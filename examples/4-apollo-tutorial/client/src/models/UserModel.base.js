/* This is a mst-sql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLObject, MSTGQLRef, QueryBuilder } from "mst-gql"

import { LaunchModel } from "./LaunchModel"
import { LaunchModelSelector } from "./LaunchModel.base"


/**
 * UserBase
 * auto generated base class for the model UserModel.
 */
export const UserModelBase = MSTGQLObject
  .named('User')
  .props({
    __typename: types.optional(types.literal("User"), "User"),
    id: types.identifier,
    email: types.maybe(types.string),
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
