/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { MessageModel } from "./MessageModel"
import { UserModel } from "./UserModel"
import { UserModelSelector } from "./UserModel.base"
import { RootStoreType } from "./index"


/**
 * MessageBase
 * auto generated base class for the model MessageModel.
 */
export const MessageModelBase = ModelBase
  .named('Message')
  .props({
    __typename: types.optional(types.literal("Message"), "Message"),
    id: types.identifier,
    timestamp: types.union(types.undefined, types.number),
    user: types.union(types.undefined, MSTGQLRef(types.late(() => UserModel))),
    text: types.union(types.undefined, types.string),
    likes: types.union(types.undefined, types.null, types.array(MSTGQLRef(types.late(() => UserModel)))),
    replyTo: types.union(types.undefined, types.null, MSTGQLRef(types.late((): any => MessageModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class MessageModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get timestamp() { return this.__attr(`timestamp`) }
  get text() { return this.__attr(`text`) }
  user(builder?: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector)) { return this.__child(`user`, UserModelSelector, builder) }
  likes(builder?: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector)) { return this.__child(`likes`, UserModelSelector, builder) }
  replyTo(builder?: string | MessageModelSelector | ((selector: MessageModelSelector) => MessageModelSelector)) { return this.__child(`replyTo`, MessageModelSelector, builder) }
}
export function selectFromMessage() {
  return new MessageModelSelector()
}

export const messageModelPrimitives = selectFromMessage().timestamp.text
