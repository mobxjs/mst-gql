/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { IObservableArray } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ChoicesAggregateModel, ChoicesAggregateModelType } from "./ChoicesAggregateModel"
import { ChoicesAggregateModelSelector } from "./ChoicesAggregateModel.base"
import { ChoicesModel, ChoicesModelType } from "./ChoicesModel"
import { ChoicesModelSelector } from "./ChoicesModel.base"
import { ChoicesSelectColumn } from "./ChoicesSelectColumnEnum"
import { PollsAggregateModel, PollsAggregateModelType } from "./PollsAggregateModel"
import { PollsAggregateModelSelector } from "./PollsAggregateModel.base"
import { PollsModel, PollsModelType } from "./PollsModel"
import { PollsModelSelector } from "./PollsModel.base"
import { PollsSelectColumn } from "./PollsSelectColumnEnum"
import { ChoicesBoolExp, ChoicesOrderBy, PollsBoolExp, PollsOrderBy } from "./RootStore.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  choices: IObservableArray<ChoicesModelType>;
  choices_by_pk: ChoicesModelType;
  polls: IObservableArray<PollsModelType>;
  polls_by_pk: PollsModelType;
}

/**
 * QueryRootBase
 * auto generated base class for the model QueryRootModel.
 */
export const QueryRootModelBase = withTypedRefs<Refs>()(ModelBase
  .named('QueryRoot')
  .props({
    __typename: types.optional(types.literal("query_root"), "query_root"),
    choices: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => ChoicesModel)))),
    choices_aggregate: types.union(types.undefined, types.late((): any => ChoicesAggregateModel)),
    choices_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late((): any => ChoicesModel))),
    polls: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => PollsModel)))),
    polls_aggregate: types.union(types.undefined, types.late((): any => PollsAggregateModel)),
    polls_by_pk: types.union(types.undefined, types.null, MSTGQLRef(types.late((): any => PollsModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class QueryRootModelSelector extends QueryBuilder {
  choices(builder: string | ChoicesModelSelector | ((selector: ChoicesModelSelector) => ChoicesModelSelector) | undefined, args?: { distinctOn?: ChoicesSelectColumn[], limit?: number, offset?: number, orderBy?: ChoicesOrderBy[], where?: ChoicesBoolExp }) { return this.__child(`choices`+ (args ? '('+['distinctOn', 'limit', 'offset', 'orderBy', 'where'].map((argName) => ((args as any)[argName] ? `${argName}: ${JSON.stringify((args as any)[argName])}` : null) ).filter((v) => v!=null).join(', ') + ')': ''), ChoicesModelSelector, builder) }
  choices_aggregate(builder: string | ChoicesAggregateModelSelector | ((selector: ChoicesAggregateModelSelector) => ChoicesAggregateModelSelector) | undefined, args?: { distinctOn?: ChoicesSelectColumn[], limit?: number, offset?: number, orderBy?: ChoicesOrderBy[], where?: ChoicesBoolExp }) { return this.__child(`choices_aggregate`+ (args ? '('+['distinctOn', 'limit', 'offset', 'orderBy', 'where'].map((argName) => ((args as any)[argName] ? `${argName}: ${JSON.stringify((args as any)[argName])}` : null) ).filter((v) => v!=null).join(', ') + ')': ''), ChoicesAggregateModelSelector, builder) }
  choices_by_pk(builder: string | ChoicesModelSelector | ((selector: ChoicesModelSelector) => ChoicesModelSelector) | undefined, args: { id: any }) { return this.__child(`choices_by_pk`+ (args ? '('+['id'].map((argName) => ((args as any)[argName] ? `${argName}: ${JSON.stringify((args as any)[argName])}` : null) ).filter((v) => v!=null).join(', ') + ')': ''), ChoicesModelSelector, builder) }
  polls(builder: string | PollsModelSelector | ((selector: PollsModelSelector) => PollsModelSelector) | undefined, args?: { distinctOn?: PollsSelectColumn[], limit?: number, offset?: number, orderBy?: PollsOrderBy[], where?: PollsBoolExp }) { return this.__child(`polls`+ (args ? '('+['distinctOn', 'limit', 'offset', 'orderBy', 'where'].map((argName) => ((args as any)[argName] ? `${argName}: ${JSON.stringify((args as any)[argName])}` : null) ).filter((v) => v!=null).join(', ') + ')': ''), PollsModelSelector, builder) }
  polls_aggregate(builder: string | PollsAggregateModelSelector | ((selector: PollsAggregateModelSelector) => PollsAggregateModelSelector) | undefined, args?: { distinctOn?: PollsSelectColumn[], limit?: number, offset?: number, orderBy?: PollsOrderBy[], where?: PollsBoolExp }) { return this.__child(`polls_aggregate`+ (args ? '('+['distinctOn', 'limit', 'offset', 'orderBy', 'where'].map((argName) => ((args as any)[argName] ? `${argName}: ${JSON.stringify((args as any)[argName])}` : null) ).filter((v) => v!=null).join(', ') + ')': ''), PollsAggregateModelSelector, builder) }
  polls_by_pk(builder: string | PollsModelSelector | ((selector: PollsModelSelector) => PollsModelSelector) | undefined, args: { id: any }) { return this.__child(`polls_by_pk`+ (args ? '('+['id'].map((argName) => ((args as any)[argName] ? `${argName}: ${JSON.stringify((args as any)[argName])}` : null) ).filter((v) => v!=null).join(', ') + ')': ''), PollsModelSelector, builder) }
}
export function selectFromQueryRoot() {
  return new QueryRootModelSelector()
}

export const queryRootModelPrimitives = selectFromQueryRoot()
