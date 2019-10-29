/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { OrganizationModel } from "./OrganizationModel"
import { OwnerModelSelector } from "./OwnerModelSelector"
import { UserModel } from "./UserModel"


/**
 * RepoBaseNoRefs
 * auto generated base class for the model RepoModel without refs.
 */
const RepoModelBaseNoRefs = ModelBase
  .named('Repo')
  .props({
    __typename: types.optional(types.literal("Repo"), "Repo"),
    id: types.identifier,
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

/**
 * RepoBase
 * auto generated base class for the model RepoModel.
 */
export const RepoModelBase = RepoModelBaseNoRefs
  .props({
    owner: types.union(types.undefined, types.null, types.union(types.late(() => UserModel), types.late(() => OrganizationModel))),
  })



export class RepoModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  owner(builder) { return this.__child(`owner`, OwnerModelSelector, builder) }
}
export function selectFromRepo() {
  return new RepoModelSelector()
}

export const repoModelPrimitives = selectFromRepo()
