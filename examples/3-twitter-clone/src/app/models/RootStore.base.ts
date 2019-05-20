/* This is a mst-sql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin, QueryOptions } from "mst-gql"

import { MessageModel, messageModelPrimitives, UserModel, userModelPrimitives } from "./index"

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
    queryMessages(variables: { offset: string | undefined, count: number | undefined, replyTo: string | undefined }, resultSelector = messageModelPrimitives, options: QueryOptions = {}) {
      return self.query<typeof MessageModel.Type[]>(`query messages($offset: ID, $count: Int, $replyTo: ID) { messages(offset: $offset, count: $count, replyTo: $replyTo) {
        ${resultSelector}
      } }`, variables, options)
    },
    queryMessage(variables: { id: string }, resultSelector = messageModelPrimitives, options: QueryOptions = {}) {
      return self.query<typeof MessageModel.Type>(`query message($id: ID!) { message(id: $id) {
        ${resultSelector}
      } }`, variables, options)
    },
    queryMe(variables?: {  }, resultSelector = userModelPrimitives, options: QueryOptions = {}) {
      return self.query<typeof UserModel.Type>(`query me { me {
        ${resultSelector}
      } }`, variables, options)
    },
    mutateChangeName(variables: { id: string, name: string }, resultSelector = userModelPrimitives, optimisticUpdate?: () => void) {
      return self.mutate<typeof UserModel.Type>(`mutation changeName($id: ID!, $name: String!) { changeName(id: $id, name: $name) {
        ${resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateLike(variables: { msg: string, user: string }, resultSelector = messageModelPrimitives, optimisticUpdate?: () => void) {
      return self.mutate<typeof MessageModel.Type>(`mutation like($msg: ID!, $user: ID!) { like(msg: $msg, user: $user) {
        ${resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutatePostTweet(variables: { text: string, user: string, replyTo: string | undefined }, resultSelector = messageModelPrimitives, optimisticUpdate?: () => void) {
      return self.mutate<typeof MessageModel.Type>(`mutation postTweet($text: String!, $user: ID!, $replyTo: ID) { postTweet(text: $text, user: $user, replyTo: $replyTo) {
        ${resultSelector}
      } }`, variables, optimisticUpdate)
    },
    subscribeNewMessages(variables?: {  }, resultSelector = messageModelPrimitives, onData?: (item: T) => void) {
      return self.subscribe<typeof MessageModel.Type>(`subscription newMessages { newMessages {
        ${resultSelector}
      } }`, variables, onData)
    },    
  }))
