/* This is a mst-sql generated file */
import { types } from "mobx-state-tree"
import { MSTGQLStore, typeInfo } from "mst-gql"

/* #region type-imports */
import { Message } from "./index"
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
  .extend(typeInfo([['Message', Message]], ['Message']))
  .props({
    messages: types.optional(types.map(Message), {})
  })
 /* #endregion */

  .actions(self => ({
    startSubscription() {
      return self.subscribe(NewMessageSubQuery)
    }
  }))

export { RootStore }
