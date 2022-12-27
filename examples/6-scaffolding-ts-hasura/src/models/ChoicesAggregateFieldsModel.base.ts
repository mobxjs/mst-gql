/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ChoicesAvgFieldsModel, ChoicesAvgFieldsModelType } from "./ChoicesAvgFieldsModel"
import { ChoicesAvgFieldsModelSelector } from "./ChoicesAvgFieldsModel.base"
import { ChoicesMaxFieldsModel, ChoicesMaxFieldsModelType } from "./ChoicesMaxFieldsModel"
import { ChoicesMaxFieldsModelSelector } from "./ChoicesMaxFieldsModel.base"
import { ChoicesMinFieldsModel, ChoicesMinFieldsModelType } from "./ChoicesMinFieldsModel"
import { ChoicesMinFieldsModelSelector } from "./ChoicesMinFieldsModel.base"
import { ChoicesSelectColumn } from "./ChoicesSelectColumnEnum"
import { ChoicesStddevFieldsModel, ChoicesStddevFieldsModelType } from "./ChoicesStddevFieldsModel"
import { ChoicesStddevFieldsModelSelector } from "./ChoicesStddevFieldsModel.base"
import { ChoicesStddevPopFieldsModel, ChoicesStddevPopFieldsModelType } from "./ChoicesStddevPopFieldsModel"
import { ChoicesStddevPopFieldsModelSelector } from "./ChoicesStddevPopFieldsModel.base"
import { ChoicesStddevSampFieldsModel, ChoicesStddevSampFieldsModelType } from "./ChoicesStddevSampFieldsModel"
import { ChoicesStddevSampFieldsModelSelector } from "./ChoicesStddevSampFieldsModel.base"
import { ChoicesSumFieldsModel, ChoicesSumFieldsModelType } from "./ChoicesSumFieldsModel"
import { ChoicesSumFieldsModelSelector } from "./ChoicesSumFieldsModel.base"
import { ChoicesVarPopFieldsModel, ChoicesVarPopFieldsModelType } from "./ChoicesVarPopFieldsModel"
import { ChoicesVarPopFieldsModelSelector } from "./ChoicesVarPopFieldsModel.base"
import { ChoicesVarSampFieldsModel, ChoicesVarSampFieldsModelType } from "./ChoicesVarSampFieldsModel"
import { ChoicesVarSampFieldsModelSelector } from "./ChoicesVarSampFieldsModel.base"
import { ChoicesVarianceFieldsModel, ChoicesVarianceFieldsModelType } from "./ChoicesVarianceFieldsModel"
import { ChoicesVarianceFieldsModelSelector } from "./ChoicesVarianceFieldsModel.base"
import { RootStoreType } from "./index"


/**
 * ChoicesAggregateFieldsBase
 * auto generated base class for the model ChoicesAggregateFieldsModel.
 */
export const ChoicesAggregateFieldsModelBase = ModelBase
  .named('ChoicesAggregateFields')
  .props({
    __typename: types.optional(types.literal("choices_aggregate_fields"), "choices_aggregate_fields"),
    avg: types.union(types.undefined, types.null, types.late((): any => ChoicesAvgFieldsModel)),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late((): any => ChoicesMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late((): any => ChoicesMinFieldsModel)),
    stddev: types.union(types.undefined, types.null, types.late((): any => ChoicesStddevFieldsModel)),
    stddev_pop: types.union(types.undefined, types.null, types.late((): any => ChoicesStddevPopFieldsModel)),
    stddev_samp: types.union(types.undefined, types.null, types.late((): any => ChoicesStddevSampFieldsModel)),
    sum: types.union(types.undefined, types.null, types.late((): any => ChoicesSumFieldsModel)),
    var_pop: types.union(types.undefined, types.null, types.late((): any => ChoicesVarPopFieldsModel)),
    var_samp: types.union(types.undefined, types.null, types.late((): any => ChoicesVarSampFieldsModel)),
    variance: types.union(types.undefined, types.null, types.late((): any => ChoicesVarianceFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class ChoicesAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  avg(builder: string | ChoicesAvgFieldsModelSelector | ((selector: ChoicesAvgFieldsModelSelector) => ChoicesAvgFieldsModelSelector) | undefined = undefined) { return this.__child(`avg`, ChoicesAvgFieldsModelSelector, builder) }
  max(builder: string | ChoicesMaxFieldsModelSelector | ((selector: ChoicesMaxFieldsModelSelector) => ChoicesMaxFieldsModelSelector) | undefined = undefined) { return this.__child(`max`, ChoicesMaxFieldsModelSelector, builder) }
  min(builder: string | ChoicesMinFieldsModelSelector | ((selector: ChoicesMinFieldsModelSelector) => ChoicesMinFieldsModelSelector) | undefined = undefined) { return this.__child(`min`, ChoicesMinFieldsModelSelector, builder) }
  stddev(builder: string | ChoicesStddevFieldsModelSelector | ((selector: ChoicesStddevFieldsModelSelector) => ChoicesStddevFieldsModelSelector) | undefined = undefined) { return this.__child(`stddev`, ChoicesStddevFieldsModelSelector, builder) }
  stddev_pop(builder: string | ChoicesStddevPopFieldsModelSelector | ((selector: ChoicesStddevPopFieldsModelSelector) => ChoicesStddevPopFieldsModelSelector) | undefined = undefined) { return this.__child(`stddev_pop`, ChoicesStddevPopFieldsModelSelector, builder) }
  stddev_samp(builder: string | ChoicesStddevSampFieldsModelSelector | ((selector: ChoicesStddevSampFieldsModelSelector) => ChoicesStddevSampFieldsModelSelector) | undefined = undefined) { return this.__child(`stddev_samp`, ChoicesStddevSampFieldsModelSelector, builder) }
  sum(builder: string | ChoicesSumFieldsModelSelector | ((selector: ChoicesSumFieldsModelSelector) => ChoicesSumFieldsModelSelector) | undefined = undefined) { return this.__child(`sum`, ChoicesSumFieldsModelSelector, builder) }
  var_pop(builder: string | ChoicesVarPopFieldsModelSelector | ((selector: ChoicesVarPopFieldsModelSelector) => ChoicesVarPopFieldsModelSelector) | undefined = undefined) { return this.__child(`var_pop`, ChoicesVarPopFieldsModelSelector, builder) }
  var_samp(builder: string | ChoicesVarSampFieldsModelSelector | ((selector: ChoicesVarSampFieldsModelSelector) => ChoicesVarSampFieldsModelSelector) | undefined = undefined) { return this.__child(`var_samp`, ChoicesVarSampFieldsModelSelector, builder) }
  variance(builder: string | ChoicesVarianceFieldsModelSelector | ((selector: ChoicesVarianceFieldsModelSelector) => ChoicesVarianceFieldsModelSelector) | undefined = undefined) { return this.__child(`variance`, ChoicesVarianceFieldsModelSelector, builder) }
}
export function selectFromChoicesAggregateFields() {
  return new ChoicesAggregateFieldsModelSelector()
}

export const choicesAggregateFieldsModelPrimitives = selectFromChoicesAggregateFields().count
