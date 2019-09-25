import { Instance, IAnyType } from "mobx-state-tree"
import { UserModelBase } from "./UserModel.base"
import { TodoType } from "./TodoModel"
import { RootStoreType } from "./RootStore"

/* The TypeScript type of an instance of UserModel */
export interface UserModelType extends Instance<typeof UserModel.Type> {}

/* A graphql query fragment builders for UserModel */
export {
  selectFromUser,
  userModelPrimitives,
  UserModelSelector
} from "./UserModel.base"

export interface UserType {
  __typename: "User"
  id: string
  email: string | null
  todos: [TodoType]
  store: RootStoreType
}

/**
 * UserModel
 */
export const UserModel = UserModelBase.actions(self => ({
  // This is an auto-generated example action.
  log() {
    console.log(JSON.stringify(self))
  }
}))
