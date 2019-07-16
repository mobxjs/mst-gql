import { QueryBuilder } from "mst-gql"
import { OrganizationModelSelector } from "./OrganizationModel.base"
import { UserModelSelector } from "./UserModel.base"

export class OwnerModelSelector extends QueryBuilder {
  get id() {
    return this.__attr(`id`)
  }
  get name() {
    return this.__attr(`name`)
  }
  user(builder) {
    return this.__inlineFragment(`User`, UserModelSelector, builder)
  }
  organization(builder) {
    return this.__inlineFragment(
      `Organization`,
      OrganizationModelSelector,
      builder
    )
  }
}
export function selectFromOwner() {
  return new OwnerModelSelector()
}

export const ownerModelPrimitives = selectFromOwner().name
