import * as fs from "fs"

import { PubSub } from "graphql-subscriptions"
import { ChuckNorris } from "fakergem"
import { v4 } from "node-uuid"

import { RootStoreBase } from "./RootStore.base"
import { MessageModel, MessageModelType } from "./MessageModel"
import { getSnapshot, applySnapshot, resolveIdentifier } from "mobx-state-tree"

export type RootStoreType = typeof RootStore.Type

export const RootStore = RootStoreBase.views(self => {
  return {
    allMessages(offset = "", count = 10) {
      // This is just a stub implementation! Should be powered by real DB in reality
      const sortedMessages = Array.from(self.messages.values()).sort((a, b) =>
        a.timestamp > b.timestamp ? 1 : -1
      )
      const offsetMessage = self.messages.get(offset)
      const start = offset ? sortedMessages.indexOf(offsetMessage) + 1 : 0
      return sortedMessages
        .slice(start, start + count)
        .map(msg => msg.serialize())
    },
    getMessage(id: string) {
      return self.messages.get(id).serialize()
    }
  }
}).actions(self => {
  const pubsub = new PubSub()

  function save() {
    fs.writeFileSync(
      __dirname + "/../db/data.json",
      JSON.stringify(getSnapshot(self), null, 2)
    )
  }

  function addMessage(msg: typeof MessageModel.CreationType) {
    const m = self.messages.put(msg)
    pubsub.publish("newMessages", { newMessages: m.serialize() })
    save()
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
      replies: []
    })
  }

  // setInterval(() => (self as any).addRandomMessage(), 10000)

  return {
    getPubSub() {
      return pubsub
    },
    addRandomMessage,
    addMessage,
    save,
    afterCreate() {
      const dataFile = fs.existsSync(__dirname + "/../db/data.json")
        ? __dirname + "/../db/data.json"
        : __dirname + "/../db/initial.json"
      applySnapshot(self, JSON.parse(fs.readFileSync(dataFile, "utf8")))
    },
    postTweet(text, userId, replyTo = "") {
      const user = self.users.get(userId)
      if (!user) throw new Error("Invalid user!")
      let m: MessageModelType
      if (!replyTo) {
        m = addMessage({
          __typename: "Message",
          id: v4(),
          text,
          user: user.id,
          timestamp: Date.now(),
          likes: [],
          replies: []
        })
      } else {
        m = resolveIdentifier(MessageModel, self, replyTo)
        m.replies.push({
          __typename: "Reply",
          id: v4(),
          text,
          user: user.id,
          timestamp: Date.now(),
          likes: []
        })
      }
      return m.serialize()
    },
    like(msgId, userId) {
      const user = self.users.get(userId)
      const msg = resolveIdentifier(MessageModel, self, msgId)
      if (!user || !msg) throw new Error("Invalid message or user!")
      if (msg.likes.includes(user)) msg.likes.remove(user)
      else msg.likes.push(user)
      // throw new Error("not good!")
      save()
      return msg.serialize()
    }
  }
})
