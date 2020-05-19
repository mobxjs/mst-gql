/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { ObservableMap } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin, QueryOptions, withTypedRefs } from "mst-gql"

import { MessageModel, MessageModelType } from "./MessageModel"
import { UserModel, UserModelType } from "./UserModel"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  messages: ObservableMap<string, MessageModelType>,
  users: ObservableMap<string, UserModelType>
}


/**
* Enums for the names of base graphql actions
*/
export enum RootStoreBaseQueries {
queryMessages="queryMessages",
queryMessage="queryMessage",
queryMe="queryMe"
}
export enum RootStoreBaseMutations {
mutateChangeName="mutateChangeName",
mutateLike="mutateLike",
mutatePostTweet="mutatePostTweet"
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
