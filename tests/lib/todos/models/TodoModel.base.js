/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * TodoBaseNoRefs
 * auto generated base class for the model TodoModel without refs.
 */
const TodoModelBaseNoRefs = ModelBase
  .named('Todo')
  .props({
    __typename: types.optional(types.literal("Todo"), "Todo"),
    id: types.identifier,
    text: types.union(types.undefined, types.string),
    complete: types.union(types.undefined, types.boolean),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

/**
 * TodoBase
 * auto generated base class for the model TodoModel.
 */
export const TodoModelBase = TodoModelBaseNoRefs
  .props({

  })



export class TodoModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get text() { return this.__attr(`text`) }
  get complete() { return this.__attr(`complete`) }
}
export function selectFromTodo() {
  return new TodoModelSelector()
}

export const todoModelPrimitives = selectFromTodo().text.complete
