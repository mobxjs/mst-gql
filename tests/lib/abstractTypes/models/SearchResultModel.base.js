/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { BookModel } from "./BookModel"
import { MovieModel } from "./MovieModel"
import { SearchItemModelSelector } from "./SearchItemModelSelector"


/**
 * SearchResultBaseNoRefs
 * auto generated base class for the model SearchResultModel without refs.
 */
const SearchResultModelBaseNoRefs = ModelBase
  .named('SearchResult')
  .props({
    __typename: types.optional(types.literal("SearchResult"), "SearchResult"),
    inputQuery: types.union(types.undefined, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

/**
 * SearchResultBase
 * auto generated base class for the model SearchResultModel.
 */
export const SearchResultModelBase = SearchResultModelBaseNoRefs
  .props({
    items: types.union(types.undefined, types.array(types.union(types.null, types.union(types.late(() => MovieModel), types.late(() => BookModel))))),
  })



export class SearchResultModelSelector extends QueryBuilder {
  get inputQuery() { return this.__attr(`inputQuery`) }
  items(builder) { return this.__child(`items`, SearchItemModelSelector, builder) }
}
export function selectFromSearchResult() {
  return new SearchResultModelSelector()
}

export const searchResultModelPrimitives = selectFromSearchResult().inputQuery
