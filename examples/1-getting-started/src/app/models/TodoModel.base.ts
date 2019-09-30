/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * TodoBase
 * auto generated base class for the model TodoModel.
 */
export const TodoModelBase = ModelBase
  .named('Todo')
  .props({
    __typename: types.optional(types.literal("Todo"), "Todo"),
    id: types.identifier,
    text: types.maybeNull(types.string),
    complete: types.maybeNull(types.boolean),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class TodoModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get text() { return this.__attr(`text`) }
  get complete() { return this.__attr(`complete`) }
}
export function selectFromTodo() {
  return new TodoModelSelector()
}

export const todoModelPrimitives = selectFromTodo().text.complete
