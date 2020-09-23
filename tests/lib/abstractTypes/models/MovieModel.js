import { MovieModelBase } from "./MovieModel.base"

/* A graphql query fragment builders for MovieModel */
export {
  selectFromMovie,
  movieModelPrimitives,
  MovieModelSelector
} from "./MovieModel.base"

/**
 * MovieModel
 */
export const MovieModel = MovieModelBase.actions((self) => ({
  // This is an auto-generated example action.
  log() {
    console.log(JSON.stringify(self))
  }
}))
