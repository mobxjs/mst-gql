
import { UserModelBase } from "./internal"



/**
 * UserModel
 */
export const UserModel = UserModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
