/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin, QueryOptions, MutationOptions } from "mst-gql"

import { MessageModel, MessageModelType } from "./MessageModel"
import { UserModel, UserModelType } from "./UserModel"


/**
* Store, managing, among others, all the objects received through graphQL
*/
export const RootStoreBase = types.model()
  .named("RootStore")
  .extend(configureStoreMixin([['Message', () => MessageModel], ['User', () => UserModel]], ['Message', 'User']))
  .props({
    messages: types.optional(types.map(types.late(() => MessageModel)), {}),
    users: types.optional(types.map(types.late(() => UserModel)), {})
  })
  .actions(self => ({
  }))
