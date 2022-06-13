/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * ChoicesStddevFieldsBase
 * auto generated base class for the model ChoicesStddevFieldsModel.
 */
export const ChoicesStddevFieldsModelBase = ModelBase
  .named('ChoicesStddevFields')
  .props({
    __typename: types.optional(types.literal("choices_stddev_fields"), "choices_stddev_fields"),
    id: types.union(types.undefined, types.null, types.number),
    poll_id: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class ChoicesStddevFieldsModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get poll_id() { return this.__attr(`poll_id`) }
}
export function selectFromChoicesStddevFields() {
  return new ChoicesStddevFieldsModelSelector()
}

export const choicesStddevFieldsModelPrimitives = selectFromChoicesStddevFields().poll_id
