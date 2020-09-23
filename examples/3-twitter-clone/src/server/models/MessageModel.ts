import { MessageModelBase } from "./MessageModel.base"
import { getSnapshot } from "mobx-state-tree"

/* The TypeScript type of an instance of MessageModel */
export type MessageModelType = typeof MessageModel.Type

/**
 * MessageModel
 */
export const MessageModel = MessageModelBase.views((self) => ({
  serialize() {
    return {
      ...getSnapshot(self),
      likes: self.likes.map((like) => like.serialize()),
      user: self.user.serialize()
    }
  }
}))
