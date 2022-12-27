/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { PollsModel, PollsModelType } from "./PollsModel"
import { PollsModelSelector } from "./PollsModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  poll: PollsModelType;
}

/**
 * ChoicesBase
 * auto generated base class for the model ChoicesModel.
 */
export const ChoicesModelBase = withTypedRefs<Refs>()(ModelBase
  .named('Choices')
  .props({
    __typename: types.optional(types.literal("choices"), "choices"),
    id: types.identifier,
    poll: types.union(types.undefined, MSTGQLRef(types.late((): any => PollsModel))),
    poll_id: types.union(types.undefined, types.frozen()),
    text: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class ChoicesModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get poll_id() { return this.__attr(`poll_id`) }
  get text() { return this.__attr(`text`) }
  poll(builder: string | PollsModelSelector | ((selector: PollsModelSelector) => PollsModelSelector) | undefined = undefined) { return this.__child(`poll`, PollsModelSelector, builder) }
}
export function selectFromChoices() {
  return new ChoicesModelSelector()
}

export const choicesModelPrimitives = selectFromChoices().poll_id.text
