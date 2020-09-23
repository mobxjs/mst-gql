import { UserModelBase } from "./UserModel.base"
import { getSnapshot } from "mobx-state-tree"

/* The TypeScript type of an instance of UserModel */
export type UserModelType = typeof UserModel.Type

/**
 * UserModel
 */
export const UserModel = UserModelBase.actions((self) => ({
  setName(name: string) {
    self.name = name
    self.store.save()
  }
})).views((self) => ({
  serialize() {
    return getSnapshot(self)
  }
}))
