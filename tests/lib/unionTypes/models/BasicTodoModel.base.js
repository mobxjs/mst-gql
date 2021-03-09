/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * BasicTodoBase
 * auto generated base class for the model BasicTodoModel.
 */
export const BasicTodoModelBase = ModelBase
  .named('BasicTodo')
  .props({
    __typename: types.optional(types.literal("BasicTodo"), "BasicTodo"),
    id: types.identifier,
    text: types.union(types.undefined, types.null, types.string),
    complete: types.union(types.undefined, types.null, types.boolean),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class BasicTodoModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get text() { return this.__attr(`text`) }
  get complete() { return this.__attr(`complete`) }
}
export function selectFromBasicTodo() {
  return new BasicTodoModelSelector()
}

export const basicTodoModelPrimitives = selectFromBasicTodo().text.complete
