import { UserModelBase } from "./UserModel.base"

/* The TypeScript type of an instance of UserModel */
export type UserModelType = typeof UserModel.Type



/**
 * UserModel
 */
export const UserModel = UserModelBase
  .actions(self => ({
    // This is just an auto-generated example action, which can be safely thrown away. 
    // Feel free to add your own actions, props, views etc to the model. 
    // Any code outside the '#region mst-gql-*'  regions will be preserved
    log() {
      console.log(JSON.stringify(self))
    }
  }))
