/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { IObservableArray } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { MessageModel, MessageModelType } from "./MessageModel"
import { UserModel, UserModelType } from "./UserModel"
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


