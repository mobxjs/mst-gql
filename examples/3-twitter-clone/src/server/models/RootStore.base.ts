/* This is a mst-sql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin, QueryOptions } from "mst-gql"

 import { MessageModel } from "./MessageModel"
 import { UserModel } from "./UserModel"

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
