/* This is a mst-sql generated file */
import { types } from "mobx-state-tree"
import { MSTGQLStore } from "mst-gql"

/* #region type-imports */
import { Query, Message, Subscription } from "./index"
/* #endregion */
import { messagePrimitives } from "./index"

const NewMessageSubQuery = `
  subscription messageSub {
    newMessages { ${messagePrimitives} }
  }
`

/* #region type-def */
/**
* Store, managing, among others, all the objects received through graphQL
*/
const RootStore = MSTGQLStore
.named("RootStore")
.props({
    querys: types.optional(types.map(Query), {}),
    messages: types.optional(types.map(Message), {}),
    subscriptions: types.optional(types.map(Subscription), {})
})
 /* #endregion */

  .actions(self => ({
    startSubscription() {
      return self.subscribe(NewMessageSubQuery)
    }
  }))

export { RootStore }
