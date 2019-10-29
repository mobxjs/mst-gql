import { Instance, types } from "mobx-state-tree"
import { RootStoreBase, RootStoreBaseRefsType } from "./RootStore.base"
import { MessageModel } from "./MessageModel"
import { selectFromMessage } from "./MessageModel.base"

/* The TypeScript type of an instance of RootStore */
export interface RootStoreType extends Instance<typeof RootStore.Type> {}
export interface RootStoreType extends RootStoreBaseRefsType {}

/* Helper function to cast self argument to a RootStore instance */
const as = (self: any) => (self as unknown) as RootStoreType

// prettier-ignore
export const MESSAGE_FRAGMENT = selectFromMessage()
  .timestamp
  .text
  .user(user => user.name.avatar)
  .likes()
  .toString()

export const RootStore = RootStoreBase.props({
  // The store itself does store Messages in loading order,
  // so we use an additional collection of references, to preserve the order as
  // it should be, regardless whether we are loading new or old messages.
  sortedMessages: types.optional(types.array(types.reference(MessageModel)), [])
})
  .views(self => ({
    get me() {
      return as(self).users.get("mweststrate")
    }
  }))
  .actions(self => ({
    afterCreate() {
      self.subscribeNewMessages({}, MESSAGE_FRAGMENT, message => {
        as(self).sortedMessages.unshift(message)
      })
    },
    loadMessages(offset: string, count: number, replyTo = undefined) {
      const query = self.queryMessages(
        { offset, count, replyTo },
        MESSAGE_FRAGMENT
      )
      query.then(data => {
        self.sortedMessages.push(...data.messages)
      })
      return query
    }
  }))
  .actions(self => ({
    sendTweet(text: string, replyTo = undefined) {
      return self.mutatePostTweet({ text, user: self.me.id, replyTo })
    },
    loadInitialMessages() {
      return self.loadMessages("", 3)
    },
    loadMore() {
      const lastMessage = self.sortedMessages[self.sortedMessages.length - 1]
      return self.loadMessages(lastMessage.id, 2)
    }
  }))
