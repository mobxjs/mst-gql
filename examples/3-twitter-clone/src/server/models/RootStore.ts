import * as fs from "fs"

import { PubSub } from "graphql-subscriptions"
import { ChuckNorris } from "fakergem"
import { v4 } from "node-uuid"

import { RootStoreBase } from "./RootStore.base"
import { MessageModel } from "./MessageModel"
import { getSnapshot, applySnapshot, resolveIdentifier } from "mobx-state-tree"
import { UserModel } from "./UserModel"

export type RootStoreType = typeof RootStore.Type

const DB_FILE = __dirname + "/../db/data.json"
const DB_FILE_INITIAL = __dirname + "/../db/initial.json"

export const RootStore = RootStoreBase.views(self => {
  return {
    allMessages(offset = "", count = 10, replyToId?) {
      /* This is just a stub implementation! Should be powered by real DB in reality */

      // check if we should search for replies
      const replyTo = replyToId && self.messages.get(replyToId)
      if (replyToId && !replyTo)
        throw new Error("Unknown message: " + replyToId)

      // sort messages
      const sortedMessages = Array.from(self.messages.values())
        .filter(m => (replyTo ? m.replyTo === replyTo : !m.replyTo))
        .sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))

      // the timeline is sorted in reverse, compared to replies
      if (replyTo) sortedMessages.reverse()

      // calculage offset
      const offsetMessage = self.messages.get(offset)
      const start = offset ? sortedMessages.indexOf(offsetMessage) + 1 : 0

      // apply limit, serialize message
      return sortedMessages
        .slice(start, start + count)
        .map(msg => msg.serialize())
    },
    getMessage(id: string) {
      return self.messages.get(id).serialize()
    },
    getReplies(parent) {
      return Array.from(self.messages.values())
        .filter(m => m.replyTo === parent)
        .sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))
        .map(m => m.serialize())
    }
  }
}).actions(self => {
  const pubsub = new PubSub()

  function saveToDB() {
    fs.writeFileSync(DB_FILE, JSON.stringify(getSnapshot(self), null, 2))
  }

  function addMessage(msg: typeof MessageModel.CreationType) {
    const m = self.messages.put(msg)
    if (!msg.replyTo)
      pubsub.publish("newMessages", { newMessages: m.serialize() })
    saveToDB()
    return m
  }

  function addRandomMessage() {
    addMessage({
      __typename: "Message",
      id: v4(),
      text: ChuckNorris.fact(),
      user: Math.random() < 0.7 ? "chucknorris" : "mweststrate",
      timestamp: Date.now(),
      likes: [],
      replyTo: undefined
    })
  }

  // setInterval(() => (self as any).addRandomMessage(), 10000)

  return {
    getPubSub() {
      return pubsub
    },
    addRandomMessage,
    addMessage,
    save: saveToDB,
    afterCreate() {
      const dataFile = fs.existsSync(DB_FILE) ? DB_FILE : DB_FILE_INITIAL
      applySnapshot(self, JSON.parse(fs.readFileSync(dataFile, "utf8")))
    },
    postTweet(text, userId, replyTo = undefined) {
      const user = self.users.get(userId)
      if (!user) throw new Error("Invalid user!")
      const m = addMessage({
        __typename: "Message",
        id: v4(),
        text,
        user: user.id,
        timestamp: Date.now(),
        likes: [],
        replyTo: replyTo
      })
      return m.serialize()
    },
    async like(msgId, userId) {
      const user = resolveIdentifier(UserModel, self, userId)
      const msg = resolveIdentifier(MessageModel, self, msgId)
      if (!user || !msg) throw new Error("Invalid message or user!")
      if (msg.likes.includes(user)) msg.likes.remove(user)
      else msg.likes.push(user)
      saveToDB()
      await sleep(2000)
      return msg.serialize()
    }
  }
})

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
