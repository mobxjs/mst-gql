/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * ChoicesAvgFieldsBase
 * auto generated base class for the model ChoicesAvgFieldsModel.
 */
export const ChoicesAvgFieldsModelBase = ModelBase
  .named('ChoicesAvgFields')
  .props({
    __typename: types.optional(types.literal("choices_avg_fields"), "choices_avg_fields"),
    id: types.union(types.undefined, types.null, types.number),
    poll_id: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class ChoicesAvgFieldsModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get poll_id() { return this.__attr(`poll_id`) }
}
export function selectFromChoicesAvgFields() {
  return new ChoicesAvgFieldsModelSelector()
}

export const choicesAvgFieldsModelPrimitives = selectFromChoicesAvgFields().poll_id
