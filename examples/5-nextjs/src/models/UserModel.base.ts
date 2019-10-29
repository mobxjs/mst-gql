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
    likes: types.union(types.undefined, types.array(types.union(types.null, types.string))),
    unobservedProp: types.union(types.undefined, types.null, types.string),
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
  get likes() { return this.__attr(`likes`) }
  get unobservedProp() { return this.__attr(`unobservedProp`) }
}
export function selectFromUser() {
  return new UserModelSelector()
}

export const userModelPrimitives = selectFromUser().name.likes.unobservedProp
