/* This is a mst-sql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLObject, MSTGQLRef, QueryBuilder } from "mst-gql"

import { AttackModel } from "./AttackModel"
import { AttackModelSelector } from "./AttackModel.base"
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
    fast: types.optional(types.array(MSTGQLRef(types.late(() => AttackModel))), []),
    /** The special attacks of this Pokémon */
    special: types.optional(types.array(MSTGQLRef(types.late(() => AttackModel))), []),
  })
  .views(self => ({
    get store() {
      return self.__getStore<typeof RootStore.Type>()
    }
  }))

export class PokemonAttackModelSelector extends QueryBuilder {

  fast(builder?: string | ((attack: AttackModelSelector) => AttackModelSelector)) { return this.__child(`fast`, AttackModelSelector, builder) }
  special(builder?: string | ((attack: AttackModelSelector) => AttackModelSelector)) { return this.__child(`special`, AttackModelSelector, builder) }
}

export function selectFromPokemonAttack() {
  return new PokemonAttackModelSelector()
}

export const pokemonAttackModelPrimitives = selectFromPokemonAttack().toString()

