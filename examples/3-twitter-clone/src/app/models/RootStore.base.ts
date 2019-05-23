/* This is a mst-sql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin, QueryOptions } from "mst-gql"

 import { MessageModel } from "./MessageModel"
 import { messageModelPrimitives, MessageModelSelector } from "./MessageModel.base"
 import { UserModel } from "./UserModel"
 import { userModelPrimitives, UserModelSelector } from "./UserModel.base"

/**
* Store, managing, among others, all the objects received through graphQL
*/
export const RootStoreBase = MSTGQLStore
  .named("RootStore")
  .extend(configureStoreMixin([['Message', () => MessageModel], ['User', () => UserModel]], ['Message', 'User']))
  .props({
    messages: types.optional(types.map(types.late(() => MessageModel)), {}),
    users: types.optional(types.map(types.late(() => UserModel)), {})
  })
  .actions(self => ({
    queryMessages(variables: { offset: string | undefined, count: number | undefined, replyTo: string | undefined }, resultSelector: string | ((qb: MessageModelSelector) => MessageModelSelector) = messageModelPrimitives, options: QueryOptions = {}) {
      return self.query<typeof MessageModel.Type[]>(`query messages($offset: ID, $count: Int, $replyTo: ID) { messages(offset: $offset, count: $count, replyTo: $replyTo) {
        ${typeof resultSelector === "function" ? resultSelector(new MessageModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryMessage(variables: { id: string }, resultSelector: string | ((qb: MessageModelSelector) => MessageModelSelector) = messageModelPrimitives, options: QueryOptions = {}) {
      return self.query<typeof MessageModel.Type>(`query message($id: ID!) { message(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new MessageModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryMe(variables?: {  }, resultSelector: string | ((qb: UserModelSelector) => UserModelSelector) = userModelPrimitives, options: QueryOptions = {}) {
      return self.query<typeof UserModel.Type>(`query me { me {
        ${typeof resultSelector === "function" ? resultSelector(new UserModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    mutateChangeName(variables: { id: string, name: string }, resultSelector: string | ((qb: UserModelSelector) => UserModelSelector) = userModelPrimitives, optimisticUpdate?: () => void) {
      return self.mutate<typeof UserModel.Type>(`mutation changeName($id: ID!, $name: String!) { changeName(id: $id, name: $name) {
        ${typeof resultSelector === "function" ? resultSelector(new UserModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateLike(variables: { msg: string, user: string }, resultSelector: string | ((qb: MessageModelSelector) => MessageModelSelector) = messageModelPrimitives, optimisticUpdate?: () => void) {
      return self.mutate<typeof MessageModel.Type>(`mutation like($msg: ID!, $user: ID!) { like(msg: $msg, user: $user) {
        ${typeof resultSelector === "function" ? resultSelector(new MessageModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutatePostTweet(variables: { text: string, user: string, replyTo: string | undefined }, resultSelector: string | ((qb: MessageModelSelector) => MessageModelSelector) = messageModelPrimitives, optimisticUpdate?: () => void) {
      return self.mutate<typeof MessageModel.Type>(`mutation postTweet($text: String!, $user: ID!, $replyTo: ID) { postTweet(text: $text, user: $user, replyTo: $replyTo) {
        ${typeof resultSelector === "function" ? resultSelector(new MessageModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    subscribeNewMessages(variables?: {  }, resultSelector: string | ((qb: MessageModelSelector) => MessageModelSelector) = messageModelPrimitives, onData?: (item: any) => void) {
      return self.subscribe<typeof MessageModel.Type>(`subscription newMessages { newMessages {
        ${typeof resultSelector === "function" ? resultSelector(new MessageModelSelector()).toString() : resultSelector}
      } }`, variables, onData)
    },    
  }))
