/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./internal"
import {BookModel, MovieModel, SearchItemModelSelector} from "./internal"


/**
 * SearchResultBase
 * auto generated base class for the model SearchResultModel.
 */
export const SearchResultModelBase = ModelBase
  .named('SearchResult')
  .props({
    __typename: types.optional(types.literal("SearchResult"), "SearchResult"),
    inputQuery: types.maybeNull(types.string),
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
