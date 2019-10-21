/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { IObservableArray } from "mobx"
import { types, Instance } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { TodoModel, TodoModelType } from "./TodoModel"
import { TodoModelSelector } from "./TodoModel.base"
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
    email: types.union(types.undefined, types.null, types.string),
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
    todos: types.union(types.undefined, types.null, types.array(types.union(types.null, MSTGQLRef(types.late(() => TodoModel))))),
  })

export type UserModelBaseRefsType = {
  todos: IObservableArray<TodoModelType>,
}


export class UserModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get email() { return this.__attr(`email`) }
  todos(builder?: string | TodoModelSelector | ((selector: TodoModelSelector) => TodoModelSelector)) { return this.__child(`todos`, TodoModelSelector, builder) }
}
export function selectFromUser() {
  return new UserModelSelector()
}

export const userModelPrimitives = selectFromUser().email
