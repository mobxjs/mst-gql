/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * ChoicesVarSampFieldsBase
 * auto generated base class for the model ChoicesVarSampFieldsModel.
 */
export const ChoicesVarSampFieldsModelBase = ModelBase
  .named('ChoicesVarSampFields')
  .props({
    __typename: types.optional(types.literal("choices_var_samp_fields"), "choices_var_samp_fields"),
    id: types.union(types.undefined, types.null, types.number),
    poll_id: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class ChoicesVarSampFieldsModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get poll_id() { return this.__attr(`poll_id`) }
}
export function selectFromChoicesVarSampFields() {
  return new ChoicesVarSampFieldsModelSelector()
}

export const choicesVarSampFieldsModelPrimitives = selectFromChoicesVarSampFields().poll_id
