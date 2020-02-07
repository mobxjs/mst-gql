/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { ObservableMap } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin, QueryOptions, withTypedRefs } from "mst-gql"

import { MessageModel, Message } from "./MessageModel"
import { UserModel, User } from "./UserModel"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  messages: ObservableMap<string, Message>,
  users: ObservableMap<string, User>
}

/**
* Store, managing, among others, all the objects received through graphQL
*/
export const RootStoreBase = withTypedRefs<Refs>()(types.model()
  .named("RootStore")
  .extend(configureStoreMixin([['Message', () => MessageModel], ['User', () => UserModel]], ['Message', 'User'], "js"))
  .props({
    messages: types.optional(types.map(types.late((): any => MessageModel)), {}),
    users: types.optional(types.map(types.late((): any => UserModel)), {})
  })
  .actions(self => ({
  })))
