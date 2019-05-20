/* This is a mst-sql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLObject, MSTGQLRef } from "mst-gql"

import { UserModel } from "./UserModel"
import { MessageModel } from "./MessageModel"
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
    replyTo: types.maybe(MSTGQLRef(types.late((): any => MessageModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<typeof RootStore.Type>()
    }
  }))


