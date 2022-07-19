/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * PollsStddevPopFieldsBase
 * auto generated base class for the model PollsStddevPopFieldsModel.
 */
export const PollsStddevPopFieldsModelBase = ModelBase
  .named('PollsStddevPopFields')
  .props({
    __typename: types.optional(types.literal("polls_stddev_pop_fields"), "polls_stddev_pop_fields"),
    created_by: types.union(types.undefined, types.null, types.number),
    id: types.union(types.undefined, types.null, types.number),
    updated_by: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class PollsStddevPopFieldsModelSelector extends QueryBuilder {
  get created_by() { return this.__attr(`created_by`) }
  get id() { return this.__attr(`id`) }
  get updated_by() { return this.__attr(`updated_by`) }
}
export function selectFromPollsStddevPopFields() {
  return new PollsStddevPopFieldsModelSelector()
}

export const pollsStddevPopFieldsModelPrimitives = selectFromPollsStddevPopFields().created_by.updated_by
