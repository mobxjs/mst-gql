/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { IObservableArray } from "mobx"
import { types, Instance } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { MessageModel, MessageModelType } from "./MessageModel"
import { UserModel, UserModelType } from "./UserModel"
import { UserModelSelector } from "./UserModel.base"
import { RootStoreType } from "./index"


/**
 * MessageBaseNoRefs
 * auto generated base class for the model MessageModel without refs.
 */
const MessageModelBaseNoRefs = ModelBase
  .named('Message')
  .props({
    __typename: types.optional(types.literal("Message"), "Message"),
    id: types.identifier,
    timestamp: types.union(types.undefined, types.number),
    text: types.union(types.undefined, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

/**
 * MessageBase
 * auto generated base class for the model MessageModel.
 */
export const MessageModelBase: typeof MessageModelBaseNoRefs = MessageModelBaseNoRefs
  .props({
    user: types.union(types.undefined, MSTGQLRef(types.late(() => UserModel))),
    likes: types.union(types.undefined, types.null, types.array(MSTGQLRef(types.late(() => UserModel)))),
    replyTo: types.union(types.undefined, types.null, MSTGQLRef(types.late((): any => MessageModel))),
  })

export type MessageModelBaseRefsType = {
  user: UserModelType,
  likes: IObservableArray<UserModelType>,
  replyTo: MessageModelType,
}


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
