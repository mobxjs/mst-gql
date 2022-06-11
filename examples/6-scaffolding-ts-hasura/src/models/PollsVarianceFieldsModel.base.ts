/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * PollsVarianceFieldsBase
 * auto generated base class for the model PollsVarianceFieldsModel.
 */
export const PollsVarianceFieldsModelBase = ModelBase
  .named('PollsVarianceFields')
  .props({
    __typename: types.optional(types.literal("polls_variance_fields"), "polls_variance_fields"),
    created_by: types.union(types.undefined, types.null, types.number),
    id: types.union(types.undefined, types.null, types.number),
    updated_by: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class PollsVarianceFieldsModelSelector extends QueryBuilder {
  get created_by() { return this.__attr(`created_by`) }
  get id() { return this.__attr(`id`) }
  get updated_by() { return this.__attr(`updated_by`) }
}
export function selectFromPollsVarianceFields() {
  return new PollsVarianceFieldsModelSelector()
}

export const pollsVarianceFieldsModelPrimitives = selectFromPollsVarianceFields().created_by.updated_by
