/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * ChoicesMaxFieldsBase
 * auto generated base class for the model ChoicesMaxFieldsModel.
 */
export const ChoicesMaxFieldsModelBase = ModelBase
  .named('ChoicesMaxFields')
  .props({
    __typename: types.optional(types.literal("choices_max_fields"), "choices_max_fields"),
    id: types.union(types.undefined, types.null, types.frozen()),
    poll_id: types.union(types.undefined, types.null, types.frozen()),
    text: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class ChoicesMaxFieldsModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get poll_id() { return this.__attr(`poll_id`) }
  get text() { return this.__attr(`text`) }
}
export function selectFromChoicesMaxFields() {
  return new ChoicesMaxFieldsModelSelector()
}

export const choicesMaxFieldsModelPrimitives = selectFromChoicesMaxFields().poll_id.text
