/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { QueryBuilder } from "mst-gql"
import { BookModelType } from "./BookModel"
import { BookModelSelector, bookModelPrimitives } from "./BookModel.base"
import { MovieModelType } from "./MovieModel"
import { MovieModelSelector, movieModelPrimitives } from "./MovieModel.base"

export class SearchItemModelSelector extends QueryBuilder {
  movie(builder) { return this.__inlineFragment(`Movie`, MovieModelSelector, builder) }
  book(builder) { return this.__inlineFragment(`Book`, BookModelSelector, builder) }
}
export function selectFromSearchItem() {
  return new SearchItemModelSelector()
}

// provides all primitive fields of union member types combined together
export const searchItemModelPrimitives = selectFromSearchItem().movie(movieModelPrimitives).book(bookModelPrimitives)