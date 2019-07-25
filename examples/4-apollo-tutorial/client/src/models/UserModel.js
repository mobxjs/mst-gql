import { UserModelBase } from "./UserModel.base"

/* A graphql query fragment builders for UserModel */
export {
  selectFromUser,
  userModelPrimitives,
  UserModelSelector
} from "./UserModel.base"

/**
 * UserModel
 */
export const UserModel = UserModelBase.actions(self => ({
  // This is an auto-generated example action.
  log() {
    console.log(JSON.stringify(self))
  }
}))
