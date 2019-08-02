/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLObject, MSTGQLRef, QueryBuilder } from "mst-gql"
import { PokemonAttackModel } from "./PokemonAttackModel"
import { PokemonAttackModelSelector } from "./PokemonAttackModel.base"
import { PokemonDimensionModel } from "./PokemonDimensionModel"
import { PokemonDimensionModelSelector } from "./PokemonDimensionModel.base"
import { PokemonEvolutionRequirementModel } from "./PokemonEvolutionRequirementModel"
import { PokemonEvolutionRequirementModelSelector } from "./PokemonEvolutionRequirementModel.base"
import { PokemonModel } from "./PokemonModel"
import { RootStoreType } from "./index"


/**
 * PokemonBase
 * auto generated base class for the model PokemonModel.
 *
 * Represents a Pokémon
 */
export const PokemonModelBase = MSTGQLObject
  .named('Pokemon')
  .props({
    __typename: types.optional(types.literal("Pokemon"), "Pokemon"),
    /** The ID of an object */
    id: types.identifier,
    /** The identifier of this Pokémon */
    number: types.maybeNull(types.string),
    /** The name of this Pokémon */
    name: types.maybeNull(types.string),
    /** The minimum and maximum weight of this Pokémon */
    weight: types.maybeNull(types.late(() => PokemonDimensionModel)),
    /** The minimum and maximum weight of this Pokémon */
    height: types.maybeNull(types.late(() => PokemonDimensionModel)),
    /** The classification of this Pokémon */
    classification: types.maybeNull(types.string),
    /** The type(s) of this Pokémon */
    types: types.optional(types.array(types.string), []),
    /** The type(s) of Pokémons that this Pokémon is resistant to */
    resistant: types.optional(types.array(types.string), []),
    /** The attacks of this Pokémon */
    attacks: types.maybeNull(types.late(() => PokemonAttackModel)),
    /** The type(s) of Pokémons that this Pokémon weak to */
    weaknesses: types.optional(types.array(types.string), []),
    fleeRate: types.maybeNull(types.number),
    /** The maximum CP of this Pokémon */
    maxCP: types.maybeNull(types.integer),
    /** The evolutions of this Pokémon */
    evolutions: types.optional(types.array(MSTGQLRef(types.late((): any => PokemonModel))), []),
    /** The evolution requirements of this Pokémon */
    evolutionRequirements: types.maybeNull(types.late(() => PokemonEvolutionRequirementModel)),
    /** The maximum HP of this Pokémon */
    maxHP: types.maybeNull(types.integer),
    image: types.maybeNull(types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class PokemonModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get number() { return this.__attr(`number`) }
  get name() { return this.__attr(`name`) }
  get classification() { return this.__attr(`classification`) }
  get types() { return this.__attr(`types`) }
  get resistant() { return this.__attr(`resistant`) }
  get weaknesses() { return this.__attr(`weaknesses`) }
  get fleeRate() { return this.__attr(`fleeRate`) }
  get maxCP() { return this.__attr(`maxCP`) }
  get maxHP() { return this.__attr(`maxHP`) }
  get image() { return this.__attr(`image`) }
  weight(builder?: string | PokemonDimensionModelSelector | ((selector: PokemonDimensionModelSelector) => PokemonDimensionModelSelector)) { return this.__child(`weight`, PokemonDimensionModelSelector, builder) }
  height(builder?: string | PokemonDimensionModelSelector | ((selector: PokemonDimensionModelSelector) => PokemonDimensionModelSelector)) { return this.__child(`height`, PokemonDimensionModelSelector, builder) }
  attacks(builder?: string | PokemonAttackModelSelector | ((selector: PokemonAttackModelSelector) => PokemonAttackModelSelector)) { return this.__child(`attacks`, PokemonAttackModelSelector, builder) }
  evolutions(builder?: string | PokemonModelSelector | ((selector: PokemonModelSelector) => PokemonModelSelector)) { return this.__child(`evolutions`, PokemonModelSelector, builder) }
  evolutionRequirements(builder?: string | PokemonEvolutionRequirementModelSelector | ((selector: PokemonEvolutionRequirementModelSelector) => PokemonEvolutionRequirementModelSelector)) { return this.__child(`evolutionRequirements`, PokemonEvolutionRequirementModelSelector, builder) }
}
export function selectFromPokemon() {
  return new PokemonModelSelector()
}

export const pokemonModelPrimitives = selectFromPokemon().number.name.classification.types.resistant.weaknesses.fleeRate.maxCP.maxHP.image
