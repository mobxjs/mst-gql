/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * ChoicesStddevPopFieldsBase
 * auto generated base class for the model ChoicesStddevPopFieldsModel.
 */
export const ChoicesStddevPopFieldsModelBase = ModelBase
  .named('ChoicesStddevPopFields')
  .props({
    __typename: types.optional(types.literal("choices_stddev_pop_fields"), "choices_stddev_pop_fields"),
    id: types.union(types.undefined, types.null, types.number),
    poll_id: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class ChoicesStddevPopFieldsModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get poll_id() { return this.__attr(`poll_id`) }
}
export function selectFromChoicesStddevPopFields() {
  return new ChoicesStddevPopFieldsModelSelector()
}

export const choicesStddevPopFieldsModelPrimitives = selectFromChoicesStddevPopFields().poll_id
