/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { ObservableMap } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin, QueryOptions, withTypedRefs } from "mst-gql"

import { ChoicesModel, ChoicesModelType } from "./ChoicesModel"
import { choicesModelPrimitives, ChoicesModelSelector } from "./ChoicesModel.base"
import { ChoicesAggregateModel, ChoicesAggregateModelType } from "./ChoicesAggregateModel"
import { choicesAggregateModelPrimitives, ChoicesAggregateModelSelector } from "./ChoicesAggregateModel.base"
import { ChoicesAggregateFieldsModel, ChoicesAggregateFieldsModelType } from "./ChoicesAggregateFieldsModel"
import { choicesAggregateFieldsModelPrimitives, ChoicesAggregateFieldsModelSelector } from "./ChoicesAggregateFieldsModel.base"
import { ChoicesAvgFieldsModel, ChoicesAvgFieldsModelType } from "./ChoicesAvgFieldsModel"
import { choicesAvgFieldsModelPrimitives, ChoicesAvgFieldsModelSelector } from "./ChoicesAvgFieldsModel.base"
import { ChoicesMaxFieldsModel, ChoicesMaxFieldsModelType } from "./ChoicesMaxFieldsModel"
import { choicesMaxFieldsModelPrimitives, ChoicesMaxFieldsModelSelector } from "./ChoicesMaxFieldsModel.base"
import { ChoicesMinFieldsModel, ChoicesMinFieldsModelType } from "./ChoicesMinFieldsModel"
import { choicesMinFieldsModelPrimitives, ChoicesMinFieldsModelSelector } from "./ChoicesMinFieldsModel.base"
import { ChoicesMutationResponseModel, ChoicesMutationResponseModelType } from "./ChoicesMutationResponseModel"
import { choicesMutationResponseModelPrimitives, ChoicesMutationResponseModelSelector } from "./ChoicesMutationResponseModel.base"
import { ChoicesStddevFieldsModel, ChoicesStddevFieldsModelType } from "./ChoicesStddevFieldsModel"
import { choicesStddevFieldsModelPrimitives, ChoicesStddevFieldsModelSelector } from "./ChoicesStddevFieldsModel.base"
import { ChoicesStddevPopFieldsModel, ChoicesStddevPopFieldsModelType } from "./ChoicesStddevPopFieldsModel"
import { choicesStddevPopFieldsModelPrimitives, ChoicesStddevPopFieldsModelSelector } from "./ChoicesStddevPopFieldsModel.base"
import { ChoicesStddevSampFieldsModel, ChoicesStddevSampFieldsModelType } from "./ChoicesStddevSampFieldsModel"
import { choicesStddevSampFieldsModelPrimitives, ChoicesStddevSampFieldsModelSelector } from "./ChoicesStddevSampFieldsModel.base"
import { ChoicesSumFieldsModel, ChoicesSumFieldsModelType } from "./ChoicesSumFieldsModel"
import { choicesSumFieldsModelPrimitives, ChoicesSumFieldsModelSelector } from "./ChoicesSumFieldsModel.base"
import { ChoicesVarPopFieldsModel, ChoicesVarPopFieldsModelType } from "./ChoicesVarPopFieldsModel"
import { choicesVarPopFieldsModelPrimitives, ChoicesVarPopFieldsModelSelector } from "./ChoicesVarPopFieldsModel.base"
import { ChoicesVarSampFieldsModel, ChoicesVarSampFieldsModelType } from "./ChoicesVarSampFieldsModel"
import { choicesVarSampFieldsModelPrimitives, ChoicesVarSampFieldsModelSelector } from "./ChoicesVarSampFieldsModel.base"
import { ChoicesVarianceFieldsModel, ChoicesVarianceFieldsModelType } from "./ChoicesVarianceFieldsModel"
import { choicesVarianceFieldsModelPrimitives, ChoicesVarianceFieldsModelSelector } from "./ChoicesVarianceFieldsModel.base"
import { MutationRootModel, MutationRootModelType } from "./MutationRootModel"
import { mutationRootModelPrimitives, MutationRootModelSelector } from "./MutationRootModel.base"
import { PollsModel, PollsModelType } from "./PollsModel"
import { pollsModelPrimitives, PollsModelSelector } from "./PollsModel.base"
import { PollsAggregateModel, PollsAggregateModelType } from "./PollsAggregateModel"
import { pollsAggregateModelPrimitives, PollsAggregateModelSelector } from "./PollsAggregateModel.base"
import { PollsAggregateFieldsModel, PollsAggregateFieldsModelType } from "./PollsAggregateFieldsModel"
import { pollsAggregateFieldsModelPrimitives, PollsAggregateFieldsModelSelector } from "./PollsAggregateFieldsModel.base"
import { PollsAvgFieldsModel, PollsAvgFieldsModelType } from "./PollsAvgFieldsModel"
import { pollsAvgFieldsModelPrimitives, PollsAvgFieldsModelSelector } from "./PollsAvgFieldsModel.base"
import { PollsMaxFieldsModel, PollsMaxFieldsModelType } from "./PollsMaxFieldsModel"
import { pollsMaxFieldsModelPrimitives, PollsMaxFieldsModelSelector } from "./PollsMaxFieldsModel.base"
import { PollsMinFieldsModel, PollsMinFieldsModelType } from "./PollsMinFieldsModel"
import { pollsMinFieldsModelPrimitives, PollsMinFieldsModelSelector } from "./PollsMinFieldsModel.base"
import { PollsMutationResponseModel, PollsMutationResponseModelType } from "./PollsMutationResponseModel"
import { pollsMutationResponseModelPrimitives, PollsMutationResponseModelSelector } from "./PollsMutationResponseModel.base"
import { PollsStddevFieldsModel, PollsStddevFieldsModelType } from "./PollsStddevFieldsModel"
import { pollsStddevFieldsModelPrimitives, PollsStddevFieldsModelSelector } from "./PollsStddevFieldsModel.base"
import { PollsStddevPopFieldsModel, PollsStddevPopFieldsModelType } from "./PollsStddevPopFieldsModel"
import { pollsStddevPopFieldsModelPrimitives, PollsStddevPopFieldsModelSelector } from "./PollsStddevPopFieldsModel.base"
import { PollsStddevSampFieldsModel, PollsStddevSampFieldsModelType } from "./PollsStddevSampFieldsModel"
import { pollsStddevSampFieldsModelPrimitives, PollsStddevSampFieldsModelSelector } from "./PollsStddevSampFieldsModel.base"
import { PollsSumFieldsModel, PollsSumFieldsModelType } from "./PollsSumFieldsModel"
import { pollsSumFieldsModelPrimitives, PollsSumFieldsModelSelector } from "./PollsSumFieldsModel.base"
import { PollsVarPopFieldsModel, PollsVarPopFieldsModelType } from "./PollsVarPopFieldsModel"
import { pollsVarPopFieldsModelPrimitives, PollsVarPopFieldsModelSelector } from "./PollsVarPopFieldsModel.base"
import { PollsVarSampFieldsModel, PollsVarSampFieldsModelType } from "./PollsVarSampFieldsModel"
import { pollsVarSampFieldsModelPrimitives, PollsVarSampFieldsModelSelector } from "./PollsVarSampFieldsModel.base"
import { PollsVarianceFieldsModel, PollsVarianceFieldsModelType } from "./PollsVarianceFieldsModel"
import { pollsVarianceFieldsModelPrimitives, PollsVarianceFieldsModelSelector } from "./PollsVarianceFieldsModel.base"
import { QueryRootModel, QueryRootModelType } from "./QueryRootModel"
import { queryRootModelPrimitives, QueryRootModelSelector } from "./QueryRootModel.base"
import { SubscriptionRootModel, SubscriptionRootModelType } from "./SubscriptionRootModel"
import { subscriptionRootModelPrimitives, SubscriptionRootModelSelector } from "./SubscriptionRootModel.base"


import { ChoicesConstraint } from "./ChoicesConstraintEnum"
import { ChoicesSelectColumn } from "./ChoicesSelectColumnEnum"
import { ChoicesUpdateColumn } from "./ChoicesUpdateColumnEnum"
import { ConflictAction } from "./ConflictActionEnum"
import { OrderBy } from "./OrderByEnum"
import { PollsConstraint } from "./PollsConstraintEnum"
import { PollsSelectColumn } from "./PollsSelectColumnEnum"
import { PollsUpdateColumn } from "./PollsUpdateColumnEnum"

export type BigintComparisonExp = {
  _eq?: any
  _gt?: any
  _gte?: any
  _in?: any[]
  _is_null?: boolean
  _lt?: any
  _lte?: any
  _neq?: any
  _nin?: any[]
}
export type ChoicesAggregateOrderBy = {
  avg?: ChoicesAvgOrderBy
  count?: OrderBy
  max?: ChoicesMaxOrderBy
  min?: ChoicesMinOrderBy
  stddev?: ChoicesStddevOrderBy
  stddev_pop?: ChoicesStddevPopOrderBy
  stddev_samp?: ChoicesStddevSampOrderBy
  sum?: ChoicesSumOrderBy
  var_pop?: ChoicesVarPopOrderBy
  var_samp?: ChoicesVarSampOrderBy
  variance?: ChoicesVarianceOrderBy
}
export type ChoicesArrRelInsertInput = {
  data: ChoicesInsertInput[]
  on_conflict?: ChoicesOnConflict
}
export type ChoicesAvgOrderBy = {
  id?: OrderBy
  poll_id?: OrderBy
}
export type ChoicesBoolExp = {
  _and?: ChoicesBoolExp[]
  _not?: ChoicesBoolExp
  _or?: ChoicesBoolExp[]
  id?: BigintComparisonExp
  poll?: PollsBoolExp
  poll_id?: BigintComparisonExp
  text?: StringComparisonExp
}
export type ChoicesIncInput = {
  id?: any
  poll_id?: any
}
export type ChoicesInsertInput = {
  id?: any
  poll?: PollsObjRelInsertInput
  poll_id?: any
  text?: string
}
export type ChoicesMaxOrderBy = {
  id?: OrderBy
  poll_id?: OrderBy
  text?: OrderBy
}
export type ChoicesMinOrderBy = {
  id?: OrderBy
  poll_id?: OrderBy
  text?: OrderBy
}
export type ChoicesObjRelInsertInput = {
  data: ChoicesInsertInput
  on_conflict?: ChoicesOnConflict
}
export type ChoicesOnConflict = {
  constraint: ChoicesConstraint
  update_columns: ChoicesUpdateColumn[]
}
export type ChoicesOrderBy = {
  id?: OrderBy
  poll?: PollsOrderBy
  poll_id?: OrderBy
  text?: OrderBy
}
export type ChoicesSetInput = {
  id?: any
  poll_id?: any
  text?: string
}
export type ChoicesStddevOrderBy = {
  id?: OrderBy
  poll_id?: OrderBy
}
export type ChoicesStddevPopOrderBy = {
  id?: OrderBy
  poll_id?: OrderBy
}
export type ChoicesStddevSampOrderBy = {
  id?: OrderBy
  poll_id?: OrderBy
}
export type ChoicesSumOrderBy = {
  id?: OrderBy
  poll_id?: OrderBy
}
export type ChoicesVarPopOrderBy = {
  id?: OrderBy
  poll_id?: OrderBy
}
export type ChoicesVarSampOrderBy = {
  id?: OrderBy
  poll_id?: OrderBy
}
export type ChoicesVarianceOrderBy = {
  id?: OrderBy
  poll_id?: OrderBy
}
export type PollsAggregateOrderBy = {
  avg?: PollsAvgOrderBy
  count?: OrderBy
  max?: PollsMaxOrderBy
  min?: PollsMinOrderBy
  stddev?: PollsStddevOrderBy
  stddev_pop?: PollsStddevPopOrderBy
  stddev_samp?: PollsStddevSampOrderBy
  sum?: PollsSumOrderBy
  var_pop?: PollsVarPopOrderBy
  var_samp?: PollsVarSampOrderBy
  variance?: PollsVarianceOrderBy
}
export type PollsArrRelInsertInput = {
  data: PollsInsertInput[]
  on_conflict?: PollsOnConflict
}
export type PollsAvgOrderBy = {
  created_by?: OrderBy
  id?: OrderBy
  updated_by?: OrderBy
}
export type PollsBoolExp = {
  _and?: PollsBoolExp[]
  _not?: PollsBoolExp
  _or?: PollsBoolExp[]
  choices?: ChoicesBoolExp
  created_at?: TimestampComparisonExp
  created_by?: BigintComparisonExp
  expiration_date_time?: TimestampComparisonExp
  foo?: StringComparisonExp
  id?: BigintComparisonExp
  ize?: StringComparisonExp
  question?: StringComparisonExp
  updated_at?: TimestampComparisonExp
  updated_by?: BigintComparisonExp
}
export type PollsIncInput = {
  created_by?: any
  id?: any
  updated_by?: any
}
export type PollsInsertInput = {
  choices?: ChoicesArrRelInsertInput
  created_at?: any
  created_by?: any
  expiration_date_time?: any
  foo?: string
  id?: any
  ize?: string
  question?: string
  updated_at?: any
  updated_by?: any
}
export type PollsMaxOrderBy = {
  created_by?: OrderBy
  foo?: OrderBy
  id?: OrderBy
  ize?: OrderBy
  question?: OrderBy
  updated_by?: OrderBy
}
export type PollsMinOrderBy = {
  created_by?: OrderBy
  foo?: OrderBy
  id?: OrderBy
  ize?: OrderBy
  question?: OrderBy
  updated_by?: OrderBy
}
export type PollsObjRelInsertInput = {
  data: PollsInsertInput
  on_conflict?: PollsOnConflict
}
export type PollsOnConflict = {
  constraint: PollsConstraint
  update_columns: PollsUpdateColumn[]
}
export type PollsOrderBy = {
  choices_aggregate?: ChoicesAggregateOrderBy
  created_at?: OrderBy
  created_by?: OrderBy
  expiration_date_time?: OrderBy
  foo?: OrderBy
  id?: OrderBy
  ize?: OrderBy
  question?: OrderBy
  updated_at?: OrderBy
  updated_by?: OrderBy
}
export type PollsSetInput = {
  created_at?: any
  created_by?: any
  expiration_date_time?: any
  foo?: string
  id?: any
  ize?: string
  question?: string
  updated_at?: any
  updated_by?: any
}
export type PollsStddevOrderBy = {
  created_by?: OrderBy
  id?: OrderBy
  updated_by?: OrderBy
}
export type PollsStddevPopOrderBy = {
  created_by?: OrderBy
  id?: OrderBy
  updated_by?: OrderBy
}
export type PollsStddevSampOrderBy = {
  created_by?: OrderBy
  id?: OrderBy
  updated_by?: OrderBy
}
export type PollsSumOrderBy = {
  created_by?: OrderBy
  id?: OrderBy
  updated_by?: OrderBy
}
export type PollsVarPopOrderBy = {
  created_by?: OrderBy
  id?: OrderBy
  updated_by?: OrderBy
}
export type PollsVarSampOrderBy = {
  created_by?: OrderBy
  id?: OrderBy
  updated_by?: OrderBy
}
export type PollsVarianceOrderBy = {
  created_by?: OrderBy
  id?: OrderBy
  updated_by?: OrderBy
}
export type StringComparisonExp = {
  _eq?: string
  _gt?: string
  _gte?: string
  _ilike?: string
  _in?: string[]
  _is_null?: boolean
  _like?: string
  _lt?: string
  _lte?: string
  _neq?: string
  _nilike?: string
  _nin?: string[]
  _nlike?: string
  _nsimilar?: string
  _similar?: string
}
export type TimestampComparisonExp = {
  _eq?: any
  _gt?: any
  _gte?: any
  _in?: any[]
  _is_null?: boolean
  _lt?: any
  _lte?: any
  _neq?: any
  _nin?: any[]
}
/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  choices: ObservableMap<string, ChoicesModelType>,
  polls: ObservableMap<string, PollsModelType>
}


/**
* Enums for the names of base graphql actions
*/



/**
* Store, managing, among others, all the objects received through graphQL
*/
export const RootStoreBase = withTypedRefs<Refs>()(MSTGQLStore
  .named("RootStore")
  .extend(configureStoreMixin([['choices', () => ChoicesModel], ['choices_aggregate', () => ChoicesAggregateModel], ['choices_aggregate_fields', () => ChoicesAggregateFieldsModel], ['choices_avg_fields', () => ChoicesAvgFieldsModel], ['choices_max_fields', () => ChoicesMaxFieldsModel], ['choices_min_fields', () => ChoicesMinFieldsModel], ['choices_mutation_response', () => ChoicesMutationResponseModel], ['choices_stddev_fields', () => ChoicesStddevFieldsModel], ['choices_stddev_pop_fields', () => ChoicesStddevPopFieldsModel], ['choices_stddev_samp_fields', () => ChoicesStddevSampFieldsModel], ['choices_sum_fields', () => ChoicesSumFieldsModel], ['choices_var_pop_fields', () => ChoicesVarPopFieldsModel], ['choices_var_samp_fields', () => ChoicesVarSampFieldsModel], ['choices_variance_fields', () => ChoicesVarianceFieldsModel], ['mutation_root', () => MutationRootModel], ['polls', () => PollsModel], ['polls_aggregate', () => PollsAggregateModel], ['polls_aggregate_fields', () => PollsAggregateFieldsModel], ['polls_avg_fields', () => PollsAvgFieldsModel], ['polls_max_fields', () => PollsMaxFieldsModel], ['polls_min_fields', () => PollsMinFieldsModel], ['polls_mutation_response', () => PollsMutationResponseModel], ['polls_stddev_fields', () => PollsStddevFieldsModel], ['polls_stddev_pop_fields', () => PollsStddevPopFieldsModel], ['polls_stddev_samp_fields', () => PollsStddevSampFieldsModel], ['polls_sum_fields', () => PollsSumFieldsModel], ['polls_var_pop_fields', () => PollsVarPopFieldsModel], ['polls_var_samp_fields', () => PollsVarSampFieldsModel], ['polls_variance_fields', () => PollsVarianceFieldsModel], ['query_root', () => QueryRootModel], ['subscription_root', () => SubscriptionRootModel]], ['choices', 'polls'], "js"))
  .props({
    choices: types.optional(types.map(types.late((): any => ChoicesModel)), {}),
    polls: types.optional(types.map(types.late((): any => PollsModel)), {})
  })
  .actions(self => ({
    queryChoices(variables: { distinctOn?: ChoicesSelectColumn[], limit?: number, offset?: number, orderBy?: ChoicesOrderBy[], where?: ChoicesBoolExp }, resultSelector: string | ((qb: ChoicesModelSelector) => ChoicesModelSelector) = choicesModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ choices: ChoicesModelType[]}>(`query choices($distinctOn: [choices_select_column!], $limit: Int, $offset: Int, $orderBy: [choices_order_by!], $where: choices_bool_exp) { choices(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ChoicesModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryChoices_aggregate(variables: { distinctOn?: ChoicesSelectColumn[], limit?: number, offset?: number, orderBy?: ChoicesOrderBy[], where?: ChoicesBoolExp }, resultSelector: string | ((qb: ChoicesAggregateModelSelector) => ChoicesAggregateModelSelector) = choicesAggregateModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ choices_aggregate: ChoicesAggregateModelType}>(`query choices_aggregate($distinctOn: [choices_select_column!], $limit: Int, $offset: Int, $orderBy: [choices_order_by!], $where: choices_bool_exp) { choices_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ChoicesAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryChoices_by_pk(variables: { id: any }, resultSelector: string | ((qb: ChoicesModelSelector) => ChoicesModelSelector) = choicesModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ choices_by_pk: ChoicesModelType}>(`query choices_by_pk($id: bigint!) { choices_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new ChoicesModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryPolls(variables: { distinctOn?: PollsSelectColumn[], limit?: number, offset?: number, orderBy?: PollsOrderBy[], where?: PollsBoolExp }, resultSelector: string | ((qb: PollsModelSelector) => PollsModelSelector) = pollsModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ polls: PollsModelType[]}>(`query polls($distinctOn: [polls_select_column!], $limit: Int, $offset: Int, $orderBy: [polls_order_by!], $where: polls_bool_exp) { polls(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new PollsModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryPolls_aggregate(variables: { distinctOn?: PollsSelectColumn[], limit?: number, offset?: number, orderBy?: PollsOrderBy[], where?: PollsBoolExp }, resultSelector: string | ((qb: PollsAggregateModelSelector) => PollsAggregateModelSelector) = pollsAggregateModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ polls_aggregate: PollsAggregateModelType}>(`query polls_aggregate($distinctOn: [polls_select_column!], $limit: Int, $offset: Int, $orderBy: [polls_order_by!], $where: polls_bool_exp) { polls_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new PollsAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryPolls_by_pk(variables: { id: any }, resultSelector: string | ((qb: PollsModelSelector) => PollsModelSelector) = pollsModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ polls_by_pk: PollsModelType}>(`query polls_by_pk($id: bigint!) { polls_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new PollsModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    mutateDelete_choices(variables: { where: ChoicesBoolExp }, resultSelector: string | ((qb: ChoicesMutationResponseModelSelector) => ChoicesMutationResponseModelSelector) = choicesMutationResponseModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ delete_choices: ChoicesMutationResponseModelType}>(`mutation delete_choices($where: choices_bool_exp!) { delete_choices(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ChoicesMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateDelete_polls(variables: { where: PollsBoolExp }, resultSelector: string | ((qb: PollsMutationResponseModelSelector) => PollsMutationResponseModelSelector) = pollsMutationResponseModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ delete_polls: PollsMutationResponseModelType}>(`mutation delete_polls($where: polls_bool_exp!) { delete_polls(where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new PollsMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateInsert_choices(variables: { objects: ChoicesInsertInput[], onConflict?: ChoicesOnConflict }, resultSelector: string | ((qb: ChoicesMutationResponseModelSelector) => ChoicesMutationResponseModelSelector) = choicesMutationResponseModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ insert_choices: ChoicesMutationResponseModelType}>(`mutation insert_choices($objects: [choices_insert_input!]!, $onConflict: choices_on_conflict) { insert_choices(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new ChoicesMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateInsert_polls(variables: { objects: PollsInsertInput[], onConflict?: PollsOnConflict }, resultSelector: string | ((qb: PollsMutationResponseModelSelector) => PollsMutationResponseModelSelector) = pollsMutationResponseModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ insert_polls: PollsMutationResponseModelType}>(`mutation insert_polls($objects: [polls_insert_input!]!, $onConflict: polls_on_conflict) { insert_polls(objects: $objects, on_conflict: $onConflict) {
        ${typeof resultSelector === "function" ? resultSelector(new PollsMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateUpdate_choices(variables: { inc?: ChoicesIncInput, set?: ChoicesSetInput, where: ChoicesBoolExp }, resultSelector: string | ((qb: ChoicesMutationResponseModelSelector) => ChoicesMutationResponseModelSelector) = choicesMutationResponseModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ update_choices: ChoicesMutationResponseModelType}>(`mutation update_choices($inc: choices_inc_input, $set: choices_set_input, $where: choices_bool_exp!) { update_choices(_inc: $inc, _set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ChoicesMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateUpdate_polls(variables: { inc?: PollsIncInput, set?: PollsSetInput, where: PollsBoolExp }, resultSelector: string | ((qb: PollsMutationResponseModelSelector) => PollsMutationResponseModelSelector) = pollsMutationResponseModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ update_polls: PollsMutationResponseModelType}>(`mutation update_polls($inc: polls_inc_input, $set: polls_set_input, $where: polls_bool_exp!) { update_polls(_inc: $inc, _set: $set, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new PollsMutationResponseModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    subscribeChoices(variables: { distinctOn?: ChoicesSelectColumn[], limit?: number, offset?: number, orderBy?: ChoicesOrderBy[], where?: ChoicesBoolExp }, resultSelector: string | ((qb: ChoicesModelSelector) => ChoicesModelSelector) = choicesModelPrimitives.toString(), onData?: (item: any) => void, onError?: (error: Error) => void) {
      return self.subscribe<{ choices: ChoicesModelType[]}>(`subscription choices($distinctOn: [choices_select_column!], $limit: Int, $offset: Int, $orderBy: [choices_order_by!], $where: choices_bool_exp) { choices(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ChoicesModelSelector()).toString() : resultSelector}
      } }`, variables, onData, onError)
    },
    subscribeChoices_aggregate(variables: { distinctOn?: ChoicesSelectColumn[], limit?: number, offset?: number, orderBy?: ChoicesOrderBy[], where?: ChoicesBoolExp }, resultSelector: string | ((qb: ChoicesAggregateModelSelector) => ChoicesAggregateModelSelector) = choicesAggregateModelPrimitives.toString(), onData?: (item: any) => void, onError?: (error: Error) => void) {
      return self.subscribe<{ choices_aggregate: ChoicesAggregateModelType}>(`subscription choices_aggregate($distinctOn: [choices_select_column!], $limit: Int, $offset: Int, $orderBy: [choices_order_by!], $where: choices_bool_exp) { choices_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new ChoicesAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData, onError)
    },
    subscribeChoices_by_pk(variables: { id: any }, resultSelector: string | ((qb: ChoicesModelSelector) => ChoicesModelSelector) = choicesModelPrimitives.toString(), onData?: (item: any) => void, onError?: (error: Error) => void) {
      return self.subscribe<{ choices_by_pk: ChoicesModelType}>(`subscription choices_by_pk($id: bigint!) { choices_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new ChoicesModelSelector()).toString() : resultSelector}
      } }`, variables, onData, onError)
    },
    subscribePolls(variables: { distinctOn?: PollsSelectColumn[], limit?: number, offset?: number, orderBy?: PollsOrderBy[], where?: PollsBoolExp }, resultSelector: string | ((qb: PollsModelSelector) => PollsModelSelector) = pollsModelPrimitives.toString(), onData?: (item: any) => void, onError?: (error: Error) => void) {
      return self.subscribe<{ polls: PollsModelType[]}>(`subscription polls($distinctOn: [polls_select_column!], $limit: Int, $offset: Int, $orderBy: [polls_order_by!], $where: polls_bool_exp) { polls(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new PollsModelSelector()).toString() : resultSelector}
      } }`, variables, onData, onError)
    },
    subscribePolls_aggregate(variables: { distinctOn?: PollsSelectColumn[], limit?: number, offset?: number, orderBy?: PollsOrderBy[], where?: PollsBoolExp }, resultSelector: string | ((qb: PollsAggregateModelSelector) => PollsAggregateModelSelector) = pollsAggregateModelPrimitives.toString(), onData?: (item: any) => void, onError?: (error: Error) => void) {
      return self.subscribe<{ polls_aggregate: PollsAggregateModelType}>(`subscription polls_aggregate($distinctOn: [polls_select_column!], $limit: Int, $offset: Int, $orderBy: [polls_order_by!], $where: polls_bool_exp) { polls_aggregate(distinct_on: $distinctOn, limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
        ${typeof resultSelector === "function" ? resultSelector(new PollsAggregateModelSelector()).toString() : resultSelector}
      } }`, variables, onData, onError)
    },
    subscribePolls_by_pk(variables: { id: any }, resultSelector: string | ((qb: PollsModelSelector) => PollsModelSelector) = pollsModelPrimitives.toString(), onData?: (item: any) => void, onError?: (error: Error) => void) {
      return self.subscribe<{ polls_by_pk: PollsModelType}>(`subscription polls_by_pk($id: bigint!) { polls_by_pk(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new PollsModelSelector()).toString() : resultSelector}
      } }`, variables, onData, onError)
    },
  })))
