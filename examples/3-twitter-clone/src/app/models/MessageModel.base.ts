/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { IObservableArray } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { MessageModel, MessageModelType } from "./MessageModel"
import { UserModel, UserModelType } from "./UserModel"
import { UserModelSelector } from "./UserModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  user: UserModelType;
  likes: IObservableArray<UserModelType>;
  replyTo: MessageModelType;
}

/**
 * MessageBase
 * auto generated base class for the model MessageModel.
 */
export const MessageModelBase = withTypedRefs<Refs>()(ModelBase
  .named('Message')
  .props({
    __typename: types.optional(types.literal("Message"), "Message"),
    id: types.identifier,
    timestamp: types.union(types.undefined, types.number),
    user: types.union(types.undefined, MSTGQLRef(types.late((): any => UserModel))),
    text: types.union(types.undefined, types.string),
    likes: types.union(types.undefined, types.null, types.array(MSTGQLRef(types.late((): any => UserModel)))),
    replyTo: types.union(types.undefined, types.null, MSTGQLRef(types.late((): any => MessageModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

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
