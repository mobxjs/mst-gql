/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types, Instance } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { UserModel, UserModelType } from "./UserModel"
import { UserModelSelector } from "./UserModel.base"
import { RootStoreType } from "./index"


/**
 * TodoBaseNoRefs
 * auto generated base class for the model TodoModel without refs.
 */
const TodoModelBaseNoRefs = ModelBase
  .named('Todo')
  .props({
    __typename: types.optional(types.literal("Todo"), "Todo"),
    id: types.identifier,
    text: types.union(types.undefined, types.null, types.string),
    complete: types.union(types.undefined, types.null, types.boolean),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

/**
 * TodoBase
 * auto generated base class for the model TodoModel.
 */
export const TodoModelBase: typeof TodoModelBaseNoRefs = TodoModelBaseNoRefs
  .props({
    owner: types.union(types.undefined, types.null, types.late(() => UserModel)),
  })

export type TodoModelBaseRefsType = {
  owner: UserModelType,
}

export function createSelfWrapper<T>() {
  return function <S, O>(fn: (self: T) => O) {
    return (self: S) => {
      const castedSelf = self as unknown as T
      return fn(castedSelf)
    }
  }
}

export class TodoModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get text() { return this.__attr(`text`) }
  get complete() { return this.__attr(`complete`) }
  owner(builder?: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector)) { return this.__child(`owner`, UserModelSelector, builder) }
}
export function selectFromTodo() {
  return new TodoModelSelector()
}

export const todoModelPrimitives = selectFromTodo().text.complete
