/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * PollsVarSampFieldsBase
 * auto generated base class for the model PollsVarSampFieldsModel.
 */
export const PollsVarSampFieldsModelBase = ModelBase
  .named('PollsVarSampFields')
  .props({
    __typename: types.optional(types.literal("polls_var_samp_fields"), "polls_var_samp_fields"),
    created_by: types.union(types.undefined, types.null, types.number),
    id: types.union(types.undefined, types.null, types.number),
    updated_by: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class PollsVarSampFieldsModelSelector extends QueryBuilder {
  get created_by() { return this.__attr(`created_by`) }
  get id() { return this.__attr(`id`) }
  get updated_by() { return this.__attr(`updated_by`) }
}
export function selectFromPollsVarSampFields() {
  return new PollsVarSampFieldsModelSelector()
}

export const pollsVarSampFieldsModelPrimitives = selectFromPollsVarSampFields().created_by.updated_by
