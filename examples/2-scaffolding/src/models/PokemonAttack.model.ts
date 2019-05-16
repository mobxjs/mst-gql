/* This is a mst-sql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLObject, MSTGQLRef } from "mst-gql"
import { RootStore } from "./index"
import { Attack } from "./Attack"

/**
* PokemonAttack
 *
 * Represents a Pokémon's attack types
*/
export const PokemonAttackModel = MSTGQLObject
  .named('PokemonAttack')
  .props({
    __typename: types.optional(types.literal("PokemonAttack"), "PokemonAttack"),
    /** The fast attacks of this Pokémon */
    fast: types.array(types.late(() => Attack)),
    /** The special attacks of this Pokémon */
    special: types.array(types.late(() => Attack)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<typeof RootStore.Type>()
    }
  }))

export const pokemonAttackPrimitives = `
__typename
`

