import { UserModelBase } from "./UserModel.base"

/* The TypeScript type of an instance of UserModel */
export type UserModelType = typeof UserModel.Type

/* A graphql query fragment containing all the primitive fields of UserModel */
export {
  userModelPrimitives,
  UserModelSelector,
  selectFromUser
} from "./UserModel.base"

/**
 * UserModel
 */
export const UserModel = UserModelBase.actions(self => ({
  // This is just an auto-generated example action, which can be safely thrown away.
  // Feel free to add your own actions, props, views etc to the model.
  // Any code outside the '#region mst-gql-*'  regions will be preserved
  log() {
    console.log(JSON.stringify(self))
  }
}))
