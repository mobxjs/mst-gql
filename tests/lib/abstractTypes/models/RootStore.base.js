/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin } from "mst-gql"
import SearchResultModel, searchResultModelPrimitives, SearchResultModelSelector, MovieModel, movieModelPrimitives, MovieModelSelector, BookModel, bookModelPrimitives, BookModelSelector, RepoModel, repoModelPrimitives, RepoModelSelector, UserModel, userModelPrimitives, UserModelSelector, OrganizationModel, organizationModelPrimitives, OrganizationModelSelector
  
} from "./internal";


/**
* Store, managing, among others, all the objects received through graphQL
*/
export const RootStoreBase = MSTGQLStore
  .named("RootStore")
  .extend(configureStoreMixin([['SearchResult', () => SearchResultModel], ['Movie', () => MovieModel], ['Book', () => BookModel], ['Repo', () => RepoModel], ['User', () => UserModel], ['Organization', () => OrganizationModel]], ['SearchResult', 'Repo']))
  .props({
    searchresults: types.optional(types.map(types.late(() => SearchResultModel)), {}),
    repos: types.optional(types.map(types.late(() => RepoModel)), {})
  })
  .actions(self => ({
    querySearch(variables, resultSelector = searchResultModelPrimitives.toString(), options = {}) {
      return self.query(`query search($text: String!) { search(text: $text) {
        ${typeof resultSelector === "function" ? resultSelector(new SearchResultModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryGetAllRepos(variables, resultSelector = repoModelPrimitives.toString(), options = {}) {
      return self.query(`query getAllRepos { getAllRepos {
        ${typeof resultSelector === "function" ? resultSelector(new RepoModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    mutateAddRepo(variables, resultSelector = repoModelPrimitives.toString(), optimisticUpdate) {
      return self.mutate(`mutation addRepo($name: String!, $ownerName: String!, $avatar: String, $logo: String) { addRepo(name: $name, ownerName: $ownerName, avatar: $avatar, logo: $logo) {
        ${typeof resultSelector === "function" ? resultSelector(new RepoModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
  }))
