/* This is a mst-sql generated file */

/* #region type-imports */
import { types } from "mobx-state-tree"
import { MSTGQLStore, typeInfo, QueryOptions } from "mst-gql"
import { Message, messagePrimitives, User, userPrimitives } from "./index"
/* #endregion */

/* #region type-def */
/**
 * Store, managing, among others, all the objects received through graphQL
 */
const RootStore = MSTGQLStore.named("RootStore")
  .extend(typeInfo([["Message", Message], ["User", User]], ["Message", "User"]))
  .props({
    messages: types.optional(types.map(Message), {}),
    users: types.optional(types.map(User), {})
  })
  .actions(self => ({
    queryMessages(
      variables?: {},
      resultSelector = messagePrimitives,
      options: QueryOptions = {}
    ) {
      return self.query<typeof Message.Type[]>(
        `query messages { messages {
        ${resultSelector}
      } }`,
        variables,
        options
      )
    },
    queryMessage(
      variables: { id: string },
      resultSelector = messagePrimitives,
      options: QueryOptions = {}
    ) {
      return self.query<typeof Message.Type>(
        `query message($id: ID!) { message(id: $id) {
        ${resultSelector}
      } }`,
        variables,
        options
      )
    },
    queryMe(
      variables?: {},
      resultSelector = userPrimitives,
      options: QueryOptions = {}
    ) {
      return self.query<typeof User.Type>(
        `query me { me {
        ${resultSelector}
      } }`,
        variables,
        options
      )
    },
    mutateChangeName(
      variables: { id: string; name: string },
      resultSelector = userPrimitives,
      optimisticUpdate?: () => void
    ) {
      return self.mutate<typeof User.Type>(
        `mutation changeName($id: ID!, $name: String!) { changeName(id: $id, name: $name) {
        ${resultSelector}
      } }`,
        variables,
        optimisticUpdate
      )
    },
    subscribeNewMessages(variables?: {}, resultSelector = messagePrimitives) {
      return self.subscribe(
        `subscription newMessages { newMessages {
        ${resultSelector}
      } }`,
        variables
      )
    }
  }))
  /* #endregion */

  .actions(self => ({
    loadMessages() {
      return self.queryMessages(
        {},
        `
        ${messagePrimitives}
        user {
          ${userPrimitives}
        }
      `
      )
    }
  }))

export { RootStore }
