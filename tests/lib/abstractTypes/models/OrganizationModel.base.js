/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLObject, QueryBuilder } from "mst-gql"


/**
 * OrganizationBase
 * auto generated base class for the model OrganizationModel.
 */
export const OrganizationModelBase = MSTGQLObject
  .named('Organization')
  .props({
    __typename: types.optional(types.literal("Organization"), "Organization"),
    id: types.identifier,
    name: types.maybeNull(types.string),
    logo: types.maybeNull(types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class OrganizationModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
  get logo() { return this.__attr(`logo`) }
}
export function selectFromOrganization() {
  return new OrganizationModelSelector()
}

export const organizationModelPrimitives = selectFromOrganization().name.logo
