/* This is a mst-sql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLObject, MSTGQLRef } from "mst-gql"

import { AttackModel } from "./AttackModel"
import { RootStore } from "./index"

/**
 * PokemonAttackBase
 * auto generated base class for the model PokemonAttackModel.
 *
 * Represents a Pokémon's attack types
 */
export const PokemonAttackModelBase = MSTGQLObject
  .named('PokemonAttack')
  .props({
    __typename: types.optional(types.literal("PokemonAttack"), "PokemonAttack"),
    /** The fast attacks of this Pokémon */
    fast: types.array(types.late(() => AttackModel)),
    /** The special attacks of this Pokémon */
    special: types.array(types.late(() => AttackModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<typeof RootStore.Type>()
    }
  }))

export const pokemonAttackModelPrimitives = `
__typename
`

