/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { ObservableMap } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin, QueryOptions } from "mst-gql"

import { MessageModel, MessageModelType } from "./MessageModel"
import { UserModel, UserModelType } from "./UserModel"


/**
* Store, managing, among others, all the objects received through graphQL
*/
const RootStoreBaseNoRefs = types.model()
  .named("RootStore")
  .extend(configureStoreMixin([['Message', () => MessageModel], ['User', () => UserModel]], ['Message', 'User']))
  .actions(self => ({
  }))

export const RootStoreBase: typeof RootStoreBaseNoRefs = RootStoreBaseNoRefs
  .props({
    messages: types.optional(types.map(types.late(() => MessageModel)), {}),
    users: types.optional(types.map(types.late(() => UserModel)), {})
  })

export type RootStoreBaseRefsType = {
  messages: ObservableMap<string, MessageModelType>,
  users: ObservableMap<string, UserModelType>
}
