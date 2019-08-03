import { UserModelBase } from "./UserModel.base"

/* The TypeScript type of an instance of UserModel */
export type UserModelType = typeof UserModel.Type

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
  changeName(name: string) {
    return self.store.mutateChangeName(
      {
        id: self.id,
        name
      },
      user => user.name,
      () => {
        self.name = name
      }
    )
  }
}))
