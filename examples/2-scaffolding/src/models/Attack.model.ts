/* This is a mst-sql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLObject, MSTGQLRef } from "mst-gql"
import { RootStore } from "./index"


/**
* Attack
 *
 * Represents a Pokémon's attack types
*/
export const AttackModel = MSTGQLObject
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

export const attackPrimitives = `
__typename
name
type
damage
`

