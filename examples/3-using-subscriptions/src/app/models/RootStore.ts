/* This is a mst-sql generated file */
import { localStorageMixin } from "mst-gql"

/* #region type-imports */
import { types } from "mobx-state-tree"
import gql from "graphql-tag"
import { MSTGQLStore, configureStoreMixin, QueryOptions } from "mst-gql"
import { Message, messagePrimitives } from "./index"
/* #endregion */

/* #region type-def */
/**
* Store, managing, among others, all the objects received through graphQL
*/
const RootStore = MSTGQLStore
  .named("RootStore")
  .extend(configureStoreMixin([['Message', Message]], ['Message']))
  .props({
    messages: types.optional(types.map(Message), {})
  })
  .actions(self => ({
    queryMessages(variables?: {  }, resultSelector = messagePrimitives, options: QueryOptions = {}) {
      return self.query<typeof Message.Type[]>(gql`query messages { messages {
        ${resultSelector}
      } }`, variables, options)
    },
    subscribeNewMessages(variables?: {  }, resultSelector = messagePrimitives) {
      return self.subscribe<typeof Message.Type>(gql`subscription newMessages { newMessages {
        ${resultSelector}
      } }`, variables)
    },    
  }))
 /* #endregion */
  .extend(localStorageMixin())

export { RootStore }
