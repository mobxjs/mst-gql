/* This is a mst-sql generated file */
import { types } from "mobx-state-tree"
import { MSTGQLObject, MSTGQLRef } from "mst-gql"

/* #region type-imports */
import { _ModelMutationType } from "./_ModelMutationType"
import { Todo } from "./Todo"
import { TodoPreviousValues } from "./TodoPreviousValues"
/* #endregion */

/* #region fragments */
export const todoSubscriptionPayloadPrimitives = `
__typename
updatedFields
`

/* #endregion */

/* #region type-def */

/**
* TodoSubscriptionPayload
*/
const TodoSubscriptionPayload = MSTGQLObject
  .named('TodoSubscriptionPayload')
  .props({
    mutation: _ModelMutationType,
    node: types.maybe(MSTGQLRef(types.late(() => Todo))),
    updatedFields: types.array(types.string),
    previousValues: types.maybe(MSTGQLRef(types.late(() => TodoPreviousValues))),
  })
/* #endregion */

  .actions(self => ({
    // this is just an auto-generated example action. 
    // Feel free to add your own actions, props, views etc to the model. 
    // Any code outside the '#region mst-gql-*'  regions will be preserved
    log() {
      console.log(JSON.stringify(self))
    }
  }))

export { TodoSubscriptionPayload }