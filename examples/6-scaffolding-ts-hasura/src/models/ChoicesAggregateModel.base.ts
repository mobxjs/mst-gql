/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { IObservableArray } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ChoicesAggregateFieldsModel, ChoicesAggregateFieldsModelType } from "./ChoicesAggregateFieldsModel"
import { ChoicesAggregateFieldsModelSelector } from "./ChoicesAggregateFieldsModel.base"
import { ChoicesModel, ChoicesModelType } from "./ChoicesModel"
import { ChoicesModelSelector } from "./ChoicesModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  nodes: IObservableArray<ChoicesModelType>;
}

/**
 * ChoicesAggregateBase
 * auto generated base class for the model ChoicesAggregateModel.
 */
export const ChoicesAggregateModelBase = withTypedRefs<Refs>()(ModelBase
  .named('ChoicesAggregate')
  .props({
    __typename: types.optional(types.literal("choices_aggregate"), "choices_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late((): any => ChoicesAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => ChoicesModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class ChoicesAggregateModelSelector extends QueryBuilder {
  aggregate(builder: string | ChoicesAggregateFieldsModelSelector | ((selector: ChoicesAggregateFieldsModelSelector) => ChoicesAggregateFieldsModelSelector) | undefined) { return this.__child(`aggregate`, ChoicesAggregateFieldsModelSelector, builder) }
  nodes(builder: string | ChoicesModelSelector | ((selector: ChoicesModelSelector) => ChoicesModelSelector) | undefined) { return this.__child(`nodes`, ChoicesModelSelector, builder) }
}
export function selectFromChoicesAggregate() {
  return new ChoicesAggregateModelSelector()
}

export const choicesAggregateModelPrimitives = selectFromChoicesAggregate()
