/* This is a mst-sql generated file */

/* #region type-imports */
import { types } from "mobx-state-tree"
import { MSTGQLObject, MSTGQLRef } from "mst-gql"
import { RootStore } from "./index"
/* #endregion */

/* #region fragments */
export const attackPrimitives = `
__typename
name
type
damage
`

/* #endregion */

/* #region type-def */
export type AttackType = typeof Attack.Type

/**
* Attack
 *
 * Represents a Pokémon's attack types
*/
export const Attack = MSTGQLObject
  .named('Attack')
  .props({
    __typename: types.optional(types.literal("Attack"), "Attack"),
    /** The name of this Pokémon attack */
    name: types.optional(types.string, ''),
    /** The type of this Pokémon attack */
    type: types.optional(types.string, ''),
    /** The damage of this Pokémon attack */
    damage: types.optional(types.integer, 0),
  })
  .views(self => ({
    get store() {
      return self.__getStore<typeof RootStore.Type>()
    }
  }))
/* #endregion */

  .actions(self => ({
    // This is just an auto-generated example action, which can be safely thrown away. 
    // Feel free to add your own actions, props, views etc to the model. 
    // Any code outside the '#region mst-gql-*'  regions will be preserved
    log() {
      console.log(JSON.stringify(self))
    }
  }))