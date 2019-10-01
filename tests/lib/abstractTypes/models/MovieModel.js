
import { MovieModelBase } from "./internal"



/**
 * MovieModel
 */
export const MovieModel = MovieModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
