/* This is a mst-sql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLObject, MSTGQLRef, QueryBuilder } from "mst-gql"

import { UserModel } from "./UserModel"
import { RootStore } from "./index"

/**
 * ReplyBase
 * auto generated base class for the model ReplyModel.
 */
export const ReplyModelBase = MSTGQLObject
  .named('Reply')
  .props({
    __typename: types.optional(types.literal("Reply"), "Reply"),
    id: types.identifier,
    timestamp: types.number,
    user: MSTGQLRef(types.late(() => UserModel)),
    text: types.string,
    likes: types.array(MSTGQLRef(types.late(() => UserModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<typeof RootStore.Type>()
    }
  }))


