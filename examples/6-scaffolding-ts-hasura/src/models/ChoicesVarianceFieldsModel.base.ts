/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * ChoicesVarianceFieldsBase
 * auto generated base class for the model ChoicesVarianceFieldsModel.
 */
export const ChoicesVarianceFieldsModelBase = ModelBase
  .named('ChoicesVarianceFields')
  .props({
    __typename: types.optional(types.literal("choices_variance_fields"), "choices_variance_fields"),
    id: types.union(types.undefined, types.null, types.number),
    poll_id: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class ChoicesVarianceFieldsModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get poll_id() { return this.__attr(`poll_id`) }
}
export function selectFromChoicesVarianceFields() {
  return new ChoicesVarianceFieldsModelSelector()
}

export const choicesVarianceFieldsModelPrimitives = selectFromChoicesVarianceFields().poll_id
