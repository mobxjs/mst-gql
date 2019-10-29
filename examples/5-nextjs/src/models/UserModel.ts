import { Instance } from "mobx-state-tree"
import { UserModelBase, UserModelBaseRefsType } from "./UserModel.base"

/* A graphql query fragment builders for UserModel */
export {
  selectFromUser,
  userModelPrimitives,
  UserModelSelector
} from "./UserModel.base"

/* The TypeScript type of an instance of UserModelBase */
export interface UserModelType extends Instance<typeof UserModel.Type> {}
export interface UserModelType extends UserModelBaseRefsType {}

/* Helper function to cast self argument to a UserModel instance */
const as = (self: any) => (self as unknown) as UserModelType

/**
 * UserModel
 */
export const UserModel = UserModelBase.actions(self => ({
  // This is an auto-generated example action.
  log() {
    console.log(JSON.stringify(as(self)))
  }
}))
