/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * PollsStddevSampFieldsBase
 * auto generated base class for the model PollsStddevSampFieldsModel.
 */
export const PollsStddevSampFieldsModelBase = ModelBase
  .named('PollsStddevSampFields')
  .props({
    __typename: types.optional(types.literal("polls_stddev_samp_fields"), "polls_stddev_samp_fields"),
    created_by: types.union(types.undefined, types.null, types.number),
    id: types.union(types.undefined, types.null, types.number),
    updated_by: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class PollsStddevSampFieldsModelSelector extends QueryBuilder {
  get created_by() { return this.__attr(`created_by`) }
  get id() { return this.__attr(`id`) }
  get updated_by() { return this.__attr(`updated_by`) }
}
export function selectFromPollsStddevSampFields() {
  return new PollsStddevSampFieldsModelSelector()
}

export const pollsStddevSampFieldsModelPrimitives = selectFromPollsStddevSampFields().created_by.updated_by
