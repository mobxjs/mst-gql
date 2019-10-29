/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types, Instance } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * UserBaseNoRefs
 * auto generated base class for the model UserModel without refs.
 */
const UserModelBaseNoRefs = ModelBase
  .named('User')
  .props({
    __typename: types.optional(types.literal("User"), "User"),
    id: types.identifier,
    name: types.union(types.undefined, types.string),
    avatar: types.union(types.undefined, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

/**
 * UserBase
 * auto generated base class for the model UserModel.
 */
export const UserModelBase: typeof UserModelBaseNoRefs = UserModelBaseNoRefs
  .props({

  })

export type UserModelBaseRefsType = {

}


export class UserModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
  get avatar() { return this.__attr(`avatar`) }
}
export function selectFromUser() {
  return new UserModelSelector()
}

export const userModelPrimitives = selectFromUser().name.avatar
