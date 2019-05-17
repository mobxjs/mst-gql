import { RootStoreBase } from "./RootStore.base"
import { messageModelPrimitives, userModelPrimitives } from "./"

export type RootStoreType = typeof RootStore.Type

export const RootStore = RootStoreBase.views(self => ({
  get me() {
    return self.users.get("mweststrate")
  }
})).actions(self => ({
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
