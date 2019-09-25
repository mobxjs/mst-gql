import { MSTGQLObject } from "mst-gql"
import { types } from "mobx-state-tree"

export const ModelBase = MSTGQLObject.props({
  $created: types.optional(types.Date, () => new Date())
})
