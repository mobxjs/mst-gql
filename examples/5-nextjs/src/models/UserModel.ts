import { Instance } from "mobx-state-tree"
import { UserModelBase } from "./UserModel.base"

/* The TypeScript type of an instance of UserModel */
export interface UserModelType extends Instance<typeof UserModel.Type> {}

/* A graphql query fragment builders for UserModel */
export {
  selectFromUser,
  userModelPrimitives,
  UserModelSelector
} from "./UserModel.base"

/**
 * UserModel
 */
export const UserModel = UserModelBase.actions(self => ({}))
