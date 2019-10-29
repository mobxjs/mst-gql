import { Instance } from "mobx-state-tree"
import { MessageModelBase, MessageModelBaseRefsType } from "./MessageModel.base"

/* A graphql query fragment builders for MessageModel */
export {
  selectFromMessage,
  messageModelPrimitives,
  MessageModelSelector
} from "./MessageModel.base"

/* The TypeScript type of an instance of MessageModelBase */
export interface MessageModelType extends Instance<typeof MessageModel.Type> {}
export interface MessageModelType extends MessageModelBaseRefsType {}

/* Helper function to cast self argument to a MessageModel instance */
const as = (self: any) => (self as unknown) as MessageModelType

/**
 * MessageModel
 */
export const MessageModel = MessageModelBase.views(self => ({
  get isLikedByMe() {
    return as(self).likes.includes(self.store.me)
  }
})).actions(self => {
  let loadReplyQuery: ReturnType<typeof self.store.loadMessages>

  return {
    like() {
      return self.store.mutateLike(
        {
          msg: self.id,
          user: self.store.me.id
        },
        `__typename id likes { __typename id }`,
        () => {
          if (as(self).likes.includes(self.store.me))
            as(self).likes.remove(self.store.me)
          else as(self).likes.push(self.store.me)
        }
      )
    },
    loadReplies() {
      if (!loadReplyQuery) {
        loadReplyQuery = self.store.loadMessages(0, 100, self.id)
      } else {
        loadReplyQuery.refetch()
      }
      return loadReplyQuery
    }
  }
})
