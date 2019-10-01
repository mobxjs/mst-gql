/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import {} from "./internal"

/**
 * MovieBase
 * auto generated base class for the model MovieModel.
 */
export const MovieModelBase = ModelBase
  .named('Movie')
  .props({
    __typename: types.optional(types.literal("Movie"), "Movie"),
    description: types.maybeNull(types.string),
    director: types.maybeNull(types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class MovieModelSelector extends QueryBuilder {
  get description() { return this.__attr(`description`) }
  get director() { return this.__attr(`director`) }
}
export function selectFromMovie() {
  return new MovieModelSelector()
}

export const movieModelPrimitives = selectFromMovie().description.director
