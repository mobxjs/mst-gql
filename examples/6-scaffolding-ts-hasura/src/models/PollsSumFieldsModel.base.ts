/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * PollsSumFieldsBase
 * auto generated base class for the model PollsSumFieldsModel.
 */
export const PollsSumFieldsModelBase = ModelBase
  .named('PollsSumFields')
  .props({
    __typename: types.optional(types.literal("polls_sum_fields"), "polls_sum_fields"),
    created_by: types.union(types.undefined, types.null, types.frozen()),
    id: types.union(types.undefined, types.null, types.frozen()),
    updated_by: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class PollsSumFieldsModelSelector extends QueryBuilder {
  get created_by() { return this.__attr(`created_by`) }
  get id() { return this.__attr(`id`) }
  get updated_by() { return this.__attr(`updated_by`) }
}
export function selectFromPollsSumFields() {
  return new PollsSumFieldsModelSelector()
}

export const pollsSumFieldsModelPrimitives = selectFromPollsSumFields().created_by.updated_by
