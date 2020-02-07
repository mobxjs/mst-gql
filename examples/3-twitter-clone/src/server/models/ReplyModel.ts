import { ReplyModelBase } from "./ReplyModel.base"
import { getSnapshot } from "mobx-state-tree"

/* The TypeScript type of an instance of ReplyModel */
export type Reply = typeof ReplyModel.Type

/**
 * ReplyModel
 */
export const ReplyModel = ReplyModelBase.views(self => ({
  serialize() {
    return {
      ...getSnapshot(self),
      likes: self.likes.map(like => like.serialize()),
      user: self.user.serialize()
    }
  }
}))
