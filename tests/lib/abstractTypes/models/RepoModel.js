import { RepoModelBase } from "./RepoModel.base"

/* A graphql query fragment builders for RepoModel */
export {
  selectFromRepo,
  repoModelPrimitives,
  RepoModelSelector
} from "./RepoModel.base"

/**
 * RepoModel
 */
export const RepoModel = RepoModelBase.actions(self => ({
  // This is an auto-generated example action.
  log() {
    console.log(JSON.stringify(self))
  }
}))
