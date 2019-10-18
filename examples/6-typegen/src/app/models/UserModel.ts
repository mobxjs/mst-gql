import { Instance } from "mobx-state-tree"
import {
  UserModelBase,
  UserModelBaseRefsType,
  createSelfWrapper
} from "./UserModel.base"

/* A graphql query fragment builders for UserModel */
export {
  selectFromUser,
  userModelPrimitives,
  UserModelSelector
} from "./UserModel.base"

const as = createSelfWrapper<UserModelType>()

/**
 * UserModel
 */
export const UserModel = UserModelBase.actions(
  as(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
)

/* The TypeScript type of an instance of UserModelBase */
export interface UserModelType extends Instance<typeof UserModel.Type> {}
export interface UserModelType extends UserModelBaseRefsType {}
