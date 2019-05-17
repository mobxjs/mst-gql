import { RootStoreBase } from "./RootStore.base"
import { messageModelPrimitives, userModelPrimitives } from "./"

export type RootStoreType = typeof RootStore.Type

export const RootStore = RootStoreBase.actions(self => ({
  afterCreate() {
    self.subscribeNewMessages(
      undefined,
      `${messageModelPrimitives} user { ${userModelPrimitives} } `
    )
  },
  loadMessages() {
    return self.queryMessages(
      {},
      `
      ${messageModelPrimitives}
      user {
        ${userModelPrimitives}
      }
    `
    )
  }
}))
