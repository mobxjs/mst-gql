/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { PollsAvgFieldsModel, PollsAvgFieldsModelType } from "./PollsAvgFieldsModel"
import { PollsAvgFieldsModelSelector } from "./PollsAvgFieldsModel.base"
import { PollsMaxFieldsModel, PollsMaxFieldsModelType } from "./PollsMaxFieldsModel"
import { PollsMaxFieldsModelSelector } from "./PollsMaxFieldsModel.base"
import { PollsMinFieldsModel, PollsMinFieldsModelType } from "./PollsMinFieldsModel"
import { PollsMinFieldsModelSelector } from "./PollsMinFieldsModel.base"
import { PollsSelectColumn } from "./PollsSelectColumnEnum"
import { PollsStddevFieldsModel, PollsStddevFieldsModelType } from "./PollsStddevFieldsModel"
import { PollsStddevFieldsModelSelector } from "./PollsStddevFieldsModel.base"
import { PollsStddevPopFieldsModel, PollsStddevPopFieldsModelType } from "./PollsStddevPopFieldsModel"
import { PollsStddevPopFieldsModelSelector } from "./PollsStddevPopFieldsModel.base"
import { PollsStddevSampFieldsModel, PollsStddevSampFieldsModelType } from "./PollsStddevSampFieldsModel"
import { PollsStddevSampFieldsModelSelector } from "./PollsStddevSampFieldsModel.base"
import { PollsSumFieldsModel, PollsSumFieldsModelType } from "./PollsSumFieldsModel"
import { PollsSumFieldsModelSelector } from "./PollsSumFieldsModel.base"
import { PollsVarPopFieldsModel, PollsVarPopFieldsModelType } from "./PollsVarPopFieldsModel"
import { PollsVarPopFieldsModelSelector } from "./PollsVarPopFieldsModel.base"
import { PollsVarSampFieldsModel, PollsVarSampFieldsModelType } from "./PollsVarSampFieldsModel"
import { PollsVarSampFieldsModelSelector } from "./PollsVarSampFieldsModel.base"
import { PollsVarianceFieldsModel, PollsVarianceFieldsModelType } from "./PollsVarianceFieldsModel"
import { PollsVarianceFieldsModelSelector } from "./PollsVarianceFieldsModel.base"
import { RootStoreType } from "./index"


/**
 * PollsAggregateFieldsBase
 * auto generated base class for the model PollsAggregateFieldsModel.
 */
export const PollsAggregateFieldsModelBase = ModelBase
  .named('PollsAggregateFields')
  .props({
    __typename: types.optional(types.literal("polls_aggregate_fields"), "polls_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late((): any => PollsAvgFieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late((): any => PollsMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late((): any => PollsMinFieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late((): any => PollsStddevFieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late((): any => PollsStddevPopFieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late((): any => PollsStddevSampFieldsModel)),
    sum: types.union(types.undefined, types.null, types.late((): any => PollsSumFieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late((): any => PollsVarPopFieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late((): any => PollsVarSampFieldsModel)),
    variance: types.union(types.undefined, types.null, types.late((): any => PollsVarianceFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class PollsAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder: string | PollsAvgFieldsModelSelector | ((selector: PollsAvgFieldsModelSelector) => PollsAvgFieldsModelSelector) | undefined = undefined) { return this.__child(`avg`, PollsAvgFieldsModelSelector, builder) }
  max(builder: string | PollsMaxFieldsModelSelector | ((selector: PollsMaxFieldsModelSelector) => PollsMaxFieldsModelSelector) | undefined = undefined) { return this.__child(`max`, PollsMaxFieldsModelSelector, builder) }
  min(builder: string | PollsMinFieldsModelSelector | ((selector: PollsMinFieldsModelSelector) => PollsMinFieldsModelSelector) | undefined = undefined) { return this.__child(`min`, PollsMinFieldsModelSelector, builder) }
  stddev(builder: string | PollsStddevFieldsModelSelector | ((selector: PollsStddevFieldsModelSelector) => PollsStddevFieldsModelSelector) | undefined = undefined) { return this.__child(`stddev`, PollsStddevFieldsModelSelector, builder) }
  stddev_pop(builder: string | PollsStddevPopFieldsModelSelector | ((selector: PollsStddevPopFieldsModelSelector) => PollsStddevPopFieldsModelSelector) | undefined = undefined) { return this.__child(`stddev_pop`, PollsStddevPopFieldsModelSelector, builder) }
  stddev_samp(builder: string | PollsStddevSampFieldsModelSelector | ((selector: PollsStddevSampFieldsModelSelector) => PollsStddevSampFieldsModelSelector) | undefined = undefined) { return this.__child(`stddev_samp`, PollsStddevSampFieldsModelSelector, builder) }
  sum(builder: string | PollsSumFieldsModelSelector | ((selector: PollsSumFieldsModelSelector) => PollsSumFieldsModelSelector) | undefined = undefined) { return this.__child(`sum`, PollsSumFieldsModelSelector, builder) }
  var_pop(builder: string | PollsVarPopFieldsModelSelector | ((selector: PollsVarPopFieldsModelSelector) => PollsVarPopFieldsModelSelector) | undefined = undefined) { return this.__child(`var_pop`, PollsVarPopFieldsModelSelector, builder) }
  var_samp(builder: string | PollsVarSampFieldsModelSelector | ((selector: PollsVarSampFieldsModelSelector) => PollsVarSampFieldsModelSelector) | undefined = undefined) { return this.__child(`var_samp`, PollsVarSampFieldsModelSelector, builder) }
  variance(builder: string | PollsVarianceFieldsModelSelector | ((selector: PollsVarianceFieldsModelSelector) => PollsVarianceFieldsModelSelector) | undefined = undefined) { return this.__child(`variance`, PollsVarianceFieldsModelSelector, builder) }
}
export function selectFromPollsAggregateFields() {
  return new PollsAggregateFieldsModelSelector()
}

export const pollsAggregateFieldsModelPrimitives = selectFromPollsAggregateFields().count
