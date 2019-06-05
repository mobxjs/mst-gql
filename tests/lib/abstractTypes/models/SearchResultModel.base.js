/* This is a mst-sql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLObject, QueryBuilder } from "mst-gql"
import { BookModel } from "./BookModel"
import { MovieModel } from "./MovieModel"
import { SearchItemModelSelector } from "./SearchItemModelSelector"


/**
 * SearchResultBase
 * auto generated base class for the model SearchResultModel.
 */
export const SearchResultModelBase = MSTGQLObject
  .named('SearchResult')
  .props({
    __typename: types.optional(types.literal("SearchResult"), "SearchResult"),
    inputQuery: types.maybe(types.string),
    items: types.optional(types.array(types.union(types.late(() => MovieModel), types.late(() => BookModel))), []),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class SearchResultModelSelector extends QueryBuilder {
  get inputQuery() { return this.__attr(`inputQuery`) }
  items(builder) { return this.__child(`items`, SearchItemModelSelector, builder) }
}
export function selectFromSearchResult() {
  return new SearchResultModelSelector()
}

export const searchResultModelPrimitives = selectFromSearchResult().inputQuery
