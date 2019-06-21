/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLObject, QueryBuilder } from "mst-gql"
import { OrganizationModel } from "./OrganizationModel"
import { OwnerModelSelector } from "./OwnerModelSelector"
import { UserModel } from "./UserModel"


/**
 * RepoBase
 * auto generated base class for the model RepoModel.
 */
export const RepoModelBase = MSTGQLObject
  .named('Repo')
  .props({
    __typename: types.optional(types.literal("Repo"), "Repo"),
    id: types.identifier,
    owner: types.maybe(types.union(types.late(() => UserModel), types.late(() => OrganizationModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class RepoModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  owner(builder) { return this.__child(`owner`, OwnerModelSelector, builder) }
}
export function selectFromRepo() {
  return new RepoModelSelector()
}

export const repoModelPrimitives = selectFromRepo()
