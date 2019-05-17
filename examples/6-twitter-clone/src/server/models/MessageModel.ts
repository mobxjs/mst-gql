import { MessageModelBase } from "./MessageModel.base"

/* The TypeScript type of an instance of MessageModel */
export type MessageModelType = typeof MessageModel.Type



/**
 * MessageModel
 */
export const MessageModel = MessageModelBase
  .actions(self => ({
    // This is just an auto-generated example action, which can be safely thrown away. 
    // Feel free to add your own actions, props, views etc to the model. 
    // Any code outside the '#region mst-gql-*'  regions will be preserved
    log() {
      console.log(JSON.stringify(self))
    }
  }))
