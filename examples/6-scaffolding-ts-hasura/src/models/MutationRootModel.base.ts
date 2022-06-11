/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ChoicesMutationResponseModel, ChoicesMutationResponseModelType } from "./ChoicesMutationResponseModel"
import { ChoicesMutationResponseModelSelector } from "./ChoicesMutationResponseModel.base"
import { PollsMutationResponseModel, PollsMutationResponseModelType } from "./PollsMutationResponseModel"
import { PollsMutationResponseModelSelector } from "./PollsMutationResponseModel.base"
import { ChoicesBoolExp, ChoicesIncInput, ChoicesInsertInput, ChoicesOnConflict, ChoicesSetInput, PollsBoolExp, PollsIncInput, PollsInsertInput, PollsOnConflict, PollsSetInput } from "./RootStore.base"
import { RootStoreType } from "./index"


/**
 * MutationRootBase
 * auto generated base class for the model MutationRootModel.
 */
export const MutationRootModelBase = ModelBase
  .named('MutationRoot')
  .props({
    __typename: types.optional(types.literal("mutation_root"), "mutation_root"),
    delete_choices: types.union(types.undefined, types.null, types.late((): any => ChoicesMutationResponseModel)),
    delete_polls: types.union(types.undefined, types.null, types.late((): any => PollsMutationResponseModel)),
    insert_choices: types.union(types.undefined, types.null, types.late((): any => ChoicesMutationResponseModel)),
    insert_polls: types.union(types.undefined, types.null, types.late((): any => PollsMutationResponseModel)),
    update_choices: types.union(types.undefined, types.null, types.late((): any => ChoicesMutationResponseModel)),
    update_polls: types.union(types.undefined, types.null, types.late((): any => PollsMutationResponseModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class MutationRootModelSelector extends QueryBuilder {
  delete_choices(builder: string | ChoicesMutationResponseModelSelector | ((selector: ChoicesMutationResponseModelSelector) => ChoicesMutationResponseModelSelector) | undefined, args: { where: ChoicesBoolExp }) { return this.__child(`delete_choices`+ (args ? '('+['where'].map((argName) => ((args as any)[argName] ? `${argName}: ${JSON.stringify((args as any)[argName])}` : null) ).filter((v) => v!=null).join(', ') + ')': ''), ChoicesMutationResponseModelSelector, builder) }
  delete_polls(builder: string | PollsMutationResponseModelSelector | ((selector: PollsMutationResponseModelSelector) => PollsMutationResponseModelSelector) | undefined, args: { where: PollsBoolExp }) { return this.__child(`delete_polls`+ (args ? '('+['where'].map((argName) => ((args as any)[argName] ? `${argName}: ${JSON.stringify((args as any)[argName])}` : null) ).filter((v) => v!=null).join(', ') + ')': ''), PollsMutationResponseModelSelector, builder) }
  insert_choices(builder: string | ChoicesMutationResponseModelSelector | ((selector: ChoicesMutationResponseModelSelector) => ChoicesMutationResponseModelSelector) | undefined, args: { objects: ChoicesInsertInput[], onConflict?: ChoicesOnConflict }) { return this.__child(`insert_choices`+ (args ? '('+['objects', 'onConflict'].map((argName) => ((args as any)[argName] ? `${argName}: ${JSON.stringify((args as any)[argName])}` : null) ).filter((v) => v!=null).join(', ') + ')': ''), ChoicesMutationResponseModelSelector, builder) }
  insert_polls(builder: string | PollsMutationResponseModelSelector | ((selector: PollsMutationResponseModelSelector) => PollsMutationResponseModelSelector) | undefined, args: { objects: PollsInsertInput[], onConflict?: PollsOnConflict }) { return this.__child(`insert_polls`+ (args ? '('+['objects', 'onConflict'].map((argName) => ((args as any)[argName] ? `${argName}: ${JSON.stringify((args as any)[argName])}` : null) ).filter((v) => v!=null).join(', ') + ')': ''), PollsMutationResponseModelSelector, builder) }
  update_choices(builder: string | ChoicesMutationResponseModelSelector | ((selector: ChoicesMutationResponseModelSelector) => ChoicesMutationResponseModelSelector) | undefined, args: { inc?: ChoicesIncInput, set?: ChoicesSetInput, where: ChoicesBoolExp }) { return this.__child(`update_choices`+ (args ? '('+['inc', 'set', 'where'].map((argName) => ((args as any)[argName] ? `${argName}: ${JSON.stringify((args as any)[argName])}` : null) ).filter((v) => v!=null).join(', ') + ')': ''), ChoicesMutationResponseModelSelector, builder) }
  update_polls(builder: string | PollsMutationResponseModelSelector | ((selector: PollsMutationResponseModelSelector) => PollsMutationResponseModelSelector) | undefined, args: { inc?: PollsIncInput, set?: PollsSetInput, where: PollsBoolExp }) { return this.__child(`update_polls`+ (args ? '('+['inc', 'set', 'where'].map((argName) => ((args as any)[argName] ? `${argName}: ${JSON.stringify((args as any)[argName])}` : null) ).filter((v) => v!=null).join(', ') + ')': ''), PollsMutationResponseModelSelector, builder) }
}
export function selectFromMutationRoot() {
  return new MutationRootModelSelector()
}

export const mutationRootModelPrimitives = selectFromMutationRoot()
