import { MessageModelBase } from "./MessageModel.base"

/* The TypeScript type of an instance of MessageModel */
export type MessageModelType = typeof MessageModel.Type

/* A graphql query fragment containing all the primitive fields of MessageModel */
export { messageModelPrimitives } from "./MessageModel.base"

/**
 * MessageModel
 */
export const MessageModel = MessageModelBase.views(self => ({
  get isLikedByMe() {
    return self.likes.includes(self.store.me)
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
          if (self.likes.includes(self.store.me))
            self.likes.remove(self.store.me)
          else self.likes.push(self.store.me)
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
