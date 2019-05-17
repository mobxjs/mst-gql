import * as fs from "fs"

import { PubSub } from "graphql-subscriptions"
import { ChuckNorris } from "fakergem"
import { v4 } from "node-uuid"

import { RootStoreBase } from "./RootStore.base"
import { MessageModel } from "./MessageModel"
import { getSnapshot, applySnapshot } from "mobx-state-tree"

export type RootStoreType = typeof RootStore.Type

export const RootStore = RootStoreBase.views(self => {
  return {
    allMessages() {
      return Array.from(self.messages.values())
        .sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1))
        .map(msg => msg.serialize())
    },
    getMessage(id: string) {
      return self.messages.get(id).serialize()
    }
  }
}).actions(self => {
  const pubsub = new PubSub()

  function save() {
    // TODO
  }

  function addMessage(msg: typeof MessageModel.CreationType) {
    const m = self.messages.put(msg)
    pubsub.publish("newMessages", { newMessages: m.serialize() })
    save()
  }

  function addRandomMessage() {
    addMessage({
      __typename: "Message",
      id: v4(),
      text: ChuckNorris.fact(),
      user: Math.random() < 0.7 ? "chucknorris" : "mweststrate",
      timestamp: Date.now(),
      replyTo: undefined
    } as const)
  }

  setInterval(() => (self as any).addRandomMessage(), 5000)

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
    }
  }
})
