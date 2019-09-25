/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLObject, MSTGQLRef, QueryBuilder } from "mst-gql"
import { TodoModel } from "./TodoModel"
import { TodoModelSelector } from "./TodoModel.base"
import { RootStoreType } from "./index"


/**
 * UserBase
 * auto generated base class for the model UserModel.
 */
export const UserModelBase = MSTGQLObject
  .named('User')
  .props({
    __typename: types.optional(types.literal("User"), "User"),
    id: types.identifier,
    email: types.maybeNull(types.string),
    todos: types.optional(types.array(MSTGQLRef(types.late(() => TodoModel))), []),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class UserModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get email() { return this.__attr(`email`) }
  todos(builder?: string | TodoModelSelector | ((selector: TodoModelSelector) => TodoModelSelector)) { return this.__child(`todos`, TodoModelSelector, builder) }
}
export function selectFromUser() {
  return new UserModelSelector()
}

export const userModelPrimitives = selectFromUser().email
