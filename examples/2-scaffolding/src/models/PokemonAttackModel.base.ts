/* This is a mst-sql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLObject, MSTGQLRef, QueryBuilder } from "mst-gql"

import { AttackModel, AttackModelSelector } from "./AttackModel"
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
    fast: types.array(MSTGQLRef(types.late(() => AttackModel))),
    /** The special attacks of this Pokémon */
    special: types.array(MSTGQLRef(types.late(() => AttackModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<typeof RootStore.Type>()
    }
  }))

export function selectFromPokemonAttack() {
  return new PokemonAttackModelSelector()
}

export const pokemonAttackModelPrimitives = selectFromPokemonAttack().build()

export class PokemonAttackModelSelector<PARENT> extends QueryBuilder<PARENT> {
  fast(): AttackModelSelector<this> { return this.__child(`fast`, AttackModelSelector) as any }
  special(): AttackModelSelector<this> { return this.__child(`special`, AttackModelSelector) as any }
}

