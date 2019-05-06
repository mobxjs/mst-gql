import { types, getParent } from "mobx-state-tree"

import { MSTGQLStore } from "./MSTGQLStore"

export const MSTGQLObject = types
  .model("MSTGQLObject", {
    __typename: types.string,
    id: types.identifier
  })
  .views(self => ({
    get store(): typeof MSTGQLStore.Type {
      return getParent(self, 2)
    }
  }))
