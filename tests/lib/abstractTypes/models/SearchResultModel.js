import { SearchResultModelBase } from "./SearchResultModel.base"

/* A graphql query fragment builders for SearchResultModel */
export {
  selectFromSearchResult,
  searchResultModelPrimitives,
  SearchResultModelSelector
} from "./SearchResultModel.base"

/**
 * SearchResultModel
 */
export const SearchResultModel = SearchResultModelBase.actions((self) => ({
  // This is an auto-generated example action.
  log() {
    console.log(JSON.stringify(self))
  }
}))
