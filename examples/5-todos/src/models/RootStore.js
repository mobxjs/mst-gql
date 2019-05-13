/* This is a mst-sql generated file */
import { types } from "mobx-state-tree"
import { MSTGQLStore, typeInfo } from "mst-gql"

/* #region type-imports */
import { Query, Asset, Todo, _QueryMeta, Mutation, InvokeFunctionPayload, Subscription, AssetSubscriptionPayload, AssetPreviousValues, TodoSubscriptionPayload, TodoPreviousValues } from "./index"
/* #endregion */

/* #region type-def */
/**
* Store, managing, among others, all the objects received through graphQL
*/
const RootStore = MSTGQLStore
  .named("RootStore")
  .extend(typeInfo([['Query', Query], ['Asset', Asset], ['Todo', Todo], ['_QueryMeta', _QueryMeta], ['Mutation', Mutation], ['InvokeFunctionPayload', InvokeFunctionPayload], ['Subscription', Subscription], ['AssetSubscriptionPayload', AssetSubscriptionPayload], ['AssetPreviousValues', AssetPreviousValues], ['TodoSubscriptionPayload', TodoSubscriptionPayload], ['TodoPreviousValues', TodoPreviousValues]], ['Asset', 'Todo', 'AssetPreviousValues', 'TodoPreviousValues']))
  .props({
    assets: types.optional(types.map(Asset), {}),
    todos: types.optional(types.map(Todo), {}),
    assetpreviousvaluess: types.optional(types.map(AssetPreviousValues), {}),
    todopreviousvaluess: types.optional(types.map(TodoPreviousValues), {})
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

export { RootStore }