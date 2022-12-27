/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { IObservableArray } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { PollsModel, PollsModelType } from "./PollsModel"
import { PollsModelSelector } from "./PollsModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  returning: IObservableArray<PollsModelType>;
}

/**
 * PollsMutationResponseBase
 * auto generated base class for the model PollsMutationResponseModel.
 */
export const PollsMutationResponseModelBase = withTypedRefs<Refs>()(ModelBase
  .named('PollsMutationResponse')
  .props({
    __typename: types.optional(types.literal("polls_mutation_response"), "polls_mutation_response"),
    affected_rows: types.union(types.undefined, types.integer),
    returning: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => PollsModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class PollsMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder: string | PollsModelSelector | ((selector: PollsModelSelector) => PollsModelSelector) | undefined = undefined) { return this.__child(`returning`, PollsModelSelector, builder) }
}
export function selectFromPollsMutationResponse() {
  return new PollsMutationResponseModelSelector()
}

export const pollsMutationResponseModelPrimitives = selectFromPollsMutationResponse().affected_rows
