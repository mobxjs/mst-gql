/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { ObservableMap } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin, QueryOptions, withTypedRefs } from "mst-gql"

import { MessageModel, Message } from "./MessageModel"
import { messageModelPrimitives, MessageModelSelector } from "./MessageModel.base"
import { UserModel, User } from "./UserModel"
import { userModelPrimitives, UserModelSelector } from "./UserModel.base"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  messages: ObservableMap<string, Message>,
  users: ObservableMap<string, User>
}

/**
* Store, managing, among others, all the objects received through graphQL
*/
export const RootStoreBase = withTypedRefs<Refs>()(MSTGQLStore
  .named("RootStore")
  .extend(configureStoreMixin([['Message', () => MessageModel], ['User', () => UserModel]], ['Message', 'User'], "js"))
  .props({
    messages: types.optional(types.map(types.late((): any => MessageModel)), {}),
    users: types.optional(types.map(types.late((): any => UserModel)), {})
  })
  .actions(self => ({
    queryMessages(variables: { offset?: string, count?: number, replyTo?: string }, resultSelector: string | ((qb: MessageModelSelector) => MessageModelSelector) = messageModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ messages: Message[]}>(`query messages($offset: ID, $count: Int, $replyTo: ID) { messages(offset: $offset, count: $count, replyTo: $replyTo) {
        ${typeof resultSelector === "function" ? resultSelector(new MessageModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryMessage(variables: { id: string }, resultSelector: string | ((qb: MessageModelSelector) => MessageModelSelector) = messageModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ message: Message}>(`query message($id: ID!) { message(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new MessageModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryMe(variables?: {  }, resultSelector: string | ((qb: UserModelSelector) => UserModelSelector) = userModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ me: User}>(`query me { me {
        ${typeof resultSelector === "function" ? resultSelector(new UserModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    mutateChangeName(variables: { id: string, name: string }, resultSelector: string | ((qb: UserModelSelector) => UserModelSelector) = userModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ changeName: User}>(`mutation changeName($id: ID!, $name: String!) { changeName(id: $id, name: $name) {
        ${typeof resultSelector === "function" ? resultSelector(new UserModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateLike(variables: { msg: string, user: string }, resultSelector: string | ((qb: MessageModelSelector) => MessageModelSelector) = messageModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ like: Message}>(`mutation like($msg: ID!, $user: ID!) { like(msg: $msg, user: $user) {
        ${typeof resultSelector === "function" ? resultSelector(new MessageModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutatePostTweet(variables: { text: string, user: string, replyTo?: string }, resultSelector: string | ((qb: MessageModelSelector) => MessageModelSelector) = messageModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ postTweet: Message}>(`mutation postTweet($text: String!, $user: ID!, $replyTo: ID) { postTweet(text: $text, user: $user, replyTo: $replyTo) {
        ${typeof resultSelector === "function" ? resultSelector(new MessageModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    subscribeNewMessages(variables?: {  }, resultSelector: string | ((qb: MessageModelSelector) => MessageModelSelector) = messageModelPrimitives.toString(), onData?: (item: any) => void) {
      return self.subscribe<{ newMessages: Message}>(`subscription newMessages { newMessages {
        ${typeof resultSelector === "function" ? resultSelector(new MessageModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },
  })))
