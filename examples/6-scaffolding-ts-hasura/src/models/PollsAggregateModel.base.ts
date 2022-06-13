/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { IObservableArray } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { PollsAggregateFieldsModel, PollsAggregateFieldsModelType } from "./PollsAggregateFieldsModel"
import { PollsAggregateFieldsModelSelector } from "./PollsAggregateFieldsModel.base"
import { PollsModel, PollsModelType } from "./PollsModel"
import { PollsModelSelector } from "./PollsModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  nodes: IObservableArray<PollsModelType>;
}

/**
 * PollsAggregateBase
 * auto generated base class for the model PollsAggregateModel.
 */
export const PollsAggregateModelBase = withTypedRefs<Refs>()(ModelBase
  .named('PollsAggregate')
  .props({
    __typename: types.optional(types.literal("polls_aggregate"), "polls_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late((): any => PollsAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => PollsModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class PollsAggregateModelSelector extends QueryBuilder {
  aggregate(builder: string | PollsAggregateFieldsModelSelector | ((selector: PollsAggregateFieldsModelSelector) => PollsAggregateFieldsModelSelector) | undefined) { return this.__child(`aggregate`, PollsAggregateFieldsModelSelector, builder) }
  nodes(builder: string | PollsModelSelector | ((selector: PollsModelSelector) => PollsModelSelector) | undefined) { return this.__child(`nodes`, PollsModelSelector, builder) }
}
export function selectFromPollsAggregate() {
  return new PollsAggregateModelSelector()
}

export const pollsAggregateModelPrimitives = selectFromPollsAggregate()
