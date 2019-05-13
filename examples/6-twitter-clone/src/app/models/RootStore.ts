/* This is a mst-sql generated file */
import { types } from "mobx-state-tree"
import { MSTGQLStore, typeInfo } from "mst-gql"
import { userPrimitives, messagePrimitives } from "./index"

/* #region type-imports */
import { Message, User } from "./index"
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
  /* #endregion */

  .actions(self => ({
    loadMessages() {
      return self.query<(typeof Message.Type)[]>(`query { messages {
        ${messagePrimitives}
        user {
          ${userPrimitives}
        }
      } }`)
    },
    changeName(id: string, name: string) {
      return self.mutate(
        `mutation changeName($id: ID!, $name: String!) { changeName(id: $id, name: $name) { id __typename name }}`,
        { id, name }
      )
    }
  }))

export { RootStore }
