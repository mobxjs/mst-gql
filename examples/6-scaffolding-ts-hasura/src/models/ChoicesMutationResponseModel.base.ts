/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { IObservableArray } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ChoicesModel, ChoicesModelType } from "./ChoicesModel"
import { ChoicesModelSelector } from "./ChoicesModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  returning: IObservableArray<ChoicesModelType>;
}

/**
 * ChoicesMutationResponseBase
 * auto generated base class for the model ChoicesMutationResponseModel.
 */
export const ChoicesMutationResponseModelBase = withTypedRefs<Refs>()(ModelBase
  .named('ChoicesMutationResponse')
  .props({
    __typename: types.optional(types.literal("choices_mutation_response"), "choices_mutation_response"),
    affected_rows: types.union(types.undefined, types.integer),
    returning: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => ChoicesModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class ChoicesMutationResponseModelSelector extends QueryBuilder {
  get affected_rows() { return this.__attr(`affected_rows`) }
  returning(builder: string | ChoicesModelSelector | ((selector: ChoicesModelSelector) => ChoicesModelSelector) | undefined) { return this.__child(`returning`, ChoicesModelSelector, builder) }
}
export function selectFromChoicesMutationResponse() {
  return new ChoicesMutationResponseModelSelector()
}

export const choicesMutationResponseModelPrimitives = selectFromChoicesMutationResponse().affected_rows
