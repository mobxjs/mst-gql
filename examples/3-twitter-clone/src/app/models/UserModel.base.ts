/* This is a mst-sql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLObject, MSTGQLRef, QueryBuilder } from "mst-gql"


import { RootStore } from "./index"

/**
 * UserBase
 * auto generated base class for the model UserModel.
 */
export const UserModelBase = MSTGQLObject
  .named('User')
  .props({
    __typename: types.optional(types.literal("User"), "User"),
    id: types.identifier,
    name: types.maybe(types.string),
    avatar: types.maybe(types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<typeof RootStore.Type>()
    }
  }))

export class UserModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
  get avatar() { return this.__attr(`avatar`) }

}

export function selectFromUser() {
  return new UserModelSelector()
}

export const userModelPrimitives = selectFromUser().id.name.avatar.toString()

