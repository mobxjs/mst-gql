import { QueryBuilder } from "mst-gql"
import { UserModelSelector, userModelPrimitives } from "./UserModel.base"
import { OrganizationModelSelector, organizationModelPrimitives } from "./OrganizationModel.base"

export class OwnerModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
  user(builder) { return this.__inlineFragment(`User`, UserModelSelector, builder) }
  organization(builder) { return this.__inlineFragment(`Organization`, OrganizationModelSelector, builder) }
}
export function selectFromOwner() {
	return new OwnerModelSelector()
}

export const ownerModelPrimitives = selectFromOwner().name