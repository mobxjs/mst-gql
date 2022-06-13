/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * ChoicesSumFieldsBase
 * auto generated base class for the model ChoicesSumFieldsModel.
 */
export const ChoicesSumFieldsModelBase = ModelBase
  .named('ChoicesSumFields')
  .props({
    __typename: types.optional(types.literal("choices_sum_fields"), "choices_sum_fields"),
    id: types.union(types.undefined, types.null, types.frozen()),
    poll_id: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class ChoicesSumFieldsModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get poll_id() { return this.__attr(`poll_id`) }
}
export function selectFromChoicesSumFields() {
  return new ChoicesSumFieldsModelSelector()
}

export const choicesSumFieldsModelPrimitives = selectFromChoicesSumFields().poll_id
