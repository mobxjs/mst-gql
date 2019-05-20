/* This is a mst-sql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLObject, MSTGQLRef, QueryBuilder } from "mst-gql"

import { UserModel, UserModelSelector } from "./UserModel"
import { ReplyModel, ReplyModelSelector } from "./ReplyModel"
import { RootStore } from "./index"

/**
 * MessageBase
 * auto generated base class for the model MessageModel.
 */
export const MessageModelBase = MSTGQLObject
  .named('Message')
  .props({
    __typename: types.optional(types.literal("Message"), "Message"),
    id: types.identifier,
    timestamp: types.number,
    user: MSTGQLRef(types.late(() => UserModel)),
    text: types.string,
    likes: types.array(MSTGQLRef(types.late(() => UserModel))),
    replies: types.array(types.late(() => ReplyModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<typeof RootStore.Type>()
    }
  }))

export function selectFromMessage() {
  return new MessageModelSelector()
}

export const messageModelPrimitives = selectFromMessage().id.timestamp.text.build()

export class MessageModelSelector<PARENT> extends QueryBuilder<PARENT> {
  get id() { return this.__attr(`id`) }
  get timestamp() { return this.__attr(`timestamp`) }
  get text() { return this.__attr(`text`) }
  user(): UserModelSelector<this> { return this.__child(`user`, UserModelSelector) as any }
  likes(): UserModelSelector<this> { return this.__child(`likes`, UserModelSelector) as any }
  replies(): ReplyModelSelector<this> { return this.__child(`replies`, ReplyModelSelector) as any }
}

