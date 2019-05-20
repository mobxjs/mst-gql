/* This is a mst-sql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLObject, MSTGQLRef, QueryBuilder } from "mst-gql"

import { UserModel, UserModelSelector } from "./UserModel"
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

export function selectFromReply() {
  return new ReplyModelSelector()
}

export const replyModelPrimitives = selectFromReply().id.timestamp.text.build()

export class ReplyModelSelector<PARENT> extends QueryBuilder<PARENT> {
  get id() { return this.__attr(`id`) }
  get timestamp() { return this.__attr(`timestamp`) }
  get text() { return this.__attr(`text`) }
  user(): UserModelSelector<this> { return this.__child(`user`, UserModelSelector) as any }
  likes(): UserModelSelector<this> { return this.__child(`likes`, UserModelSelector) as any }
}

