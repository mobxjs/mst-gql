/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * ChoicesVarPopFieldsBase
 * auto generated base class for the model ChoicesVarPopFieldsModel.
 */
export const ChoicesVarPopFieldsModelBase = ModelBase
  .named('ChoicesVarPopFields')
  .props({
    __typename: types.optional(types.literal("choices_var_pop_fields"), "choices_var_pop_fields"),
    id: types.union(types.undefined, types.null, types.number),
    poll_id: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class ChoicesVarPopFieldsModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get poll_id() { return this.__attr(`poll_id`) }
}
export function selectFromChoicesVarPopFields() {
  return new ChoicesVarPopFieldsModelSelector()
}

export const choicesVarPopFieldsModelPrimitives = selectFromChoicesVarPopFields().poll_id
