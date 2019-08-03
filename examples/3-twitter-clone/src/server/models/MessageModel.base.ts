/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLObject, MSTGQLRef, QueryBuilder } from "mst-gql"
import { MessageModel } from "./MessageModel"
import { UserModel } from "./UserModel"
import { RootStoreType } from "./index"


/**
 * MessageBase
 * auto generated base class for the model MessageModel.
 */
export const MessageModelBase = MSTGQLObject
  .named('Message')
  .props({
    __typename: types.optional(types.literal("Message"), "Message"),
    id: types.identifier,
    timestamp: types.maybeNull(types.number),
    user: types.maybeNull(MSTGQLRef(types.late(() => UserModel))),
    text: types.maybeNull(types.string),
    likes: types.optional(types.array(MSTGQLRef(types.late(() => UserModel))), []),
    replyTo: types.maybeNull(MSTGQLRef(types.late((): any => MessageModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))


