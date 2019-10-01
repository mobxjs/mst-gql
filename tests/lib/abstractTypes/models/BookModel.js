
import { BookModelBase } from "./internal"



/**
 * BookModel
 */
export const BookModel = BookModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
