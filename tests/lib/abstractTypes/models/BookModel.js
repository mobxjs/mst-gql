import { BookModelBase } from "./BookModel.base"

/* A graphql query fragment builders for BookModel */
export {
  selectFromBook,
  bookModelPrimitives,
  BookModelSelector
} from "./BookModel.base"

/**
 * BookModel
 */
export const BookModel = BookModelBase.actions((self) => ({
  // This is an auto-generated example action.
  log() {
    console.log(JSON.stringify(self))
  }
}))
