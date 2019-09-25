/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLObject, MSTGQLRef, QueryBuilder } from "mst-gql"
import { AttackModel } from "./AttackModel"
import { AttackModelSelector } from "./AttackModel.base"
import { RootStoreType } from "./index"


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
    fast: types.union(types.undefined, types.null, types.array(types.union(types.null, MSTGQLRef(types.late(() => AttackModel))))),
    /** The special attacks of this Pokémon */
    special: types.union(types.undefined, types.null, types.array(types.union(types.null, MSTGQLRef(types.late(() => AttackModel))))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class PokemonAttackModelSelector extends QueryBuilder {
  fast(builder?: string | AttackModelSelector | ((selector: AttackModelSelector) => AttackModelSelector)) { return this.__child(`fast`, AttackModelSelector, builder) }
  special(builder?: string | AttackModelSelector | ((selector: AttackModelSelector) => AttackModelSelector)) { return this.__child(`special`, AttackModelSelector, builder) }
}
export function selectFromPokemonAttack() {
  return new PokemonAttackModelSelector()
}

export const pokemonAttackModelPrimitives = selectFromPokemonAttack()
