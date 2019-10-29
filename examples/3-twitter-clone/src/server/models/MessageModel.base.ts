/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { IObservableArray } from "mobx"
import { types, Instance } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { MessageModel, MessageModelType } from "./MessageModel"
import { UserModel, UserModelType } from "./UserModel"
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



