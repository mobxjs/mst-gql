import { RootStoreBase } from "./RootStore.base"
import { types } from "mobx-state-tree"
import { MessageModel } from "./MessageModel"
import { selectFromMessage } from "./MessageModel.base"
import { localStorageMixin } from "mst-gql"

// prettier-ignore
export const MESSAGE_FRAGMENT = selectFromMessage()
  .timestamp
  .text
  .user(user => user.name.avatar)
  .toString()

export type RootStoreType = typeof RootStore.Type

export const RootStore = RootStoreBase.props({
  // The store itself does store Messages in loading order,
  // so we use an additional collection of references, to preserve the order as
  // it should be, regardless whether we are loading new or old messages.
  sortedMessages: types.optional(types.array(types.reference(MessageModel)), [])
})
  .views(self => ({
    get me() {
      return self.users.get("mweststrate")
    }
  }))
  .actions(self => ({
    afterCreate() {
      self.subscribeNewMessages({}, MESSAGE_FRAGMENT, message => {
        self.sortedMessages.unshift(message)
      })
    },
    loadMessages(offset, count, replyTo = undefined) {
      const query = self.queryMessages(
        { offset, count, replyTo },
        MESSAGE_FRAGMENT
      )
      query.then(data => {
        self.sortedMessages.push(...data)
      })
      return query
    }
  }))
  .actions(self => ({
    sendTweet(text, replyTo = undefined) {
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
