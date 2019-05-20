/* This is a mst-sql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLObject, MSTGQLRef, QueryBuilder } from "mst-gql"

import {
  PokemonDimensionModel,
  PokemonDimensionModelSelector
} from "./PokemonDimensionModel"
import {
  PokemonAttackModel,
  PokemonAttackModelSelector
} from "./PokemonAttackModel"
import { PokemonModel } from "./PokemonModel"
import {
  PokemonEvolutionRequirementModel,
  PokemonEvolutionRequirementModelSelector
} from "./PokemonEvolutionRequirementModel"
import { RootStore } from "./index"

/**
 * PokemonBase
 * auto generated base class for the model PokemonModel.
 *
 * Represents a Pokémon
 */
export const PokemonModelBase = MSTGQLObject.named("Pokemon")
  .props({
    __typename: types.optional(types.literal("Pokemon"), "Pokemon"),
    /** The ID of an object */
    id: types.identifier,
    /** The identifier of this Pokémon */
    number: types.optional(types.string, ""),
    /** The name of this Pokémon */
    name: types.optional(types.string, ""),
    /** The minimum and maximum weight of this Pokémon */
    weight: types.maybe(types.late(() => PokemonDimensionModel)),
    /** The minimum and maximum weight of this Pokémon */
    height: types.maybe(types.late(() => PokemonDimensionModel)),
    /** The classification of this Pokémon */
    classification: types.optional(types.string, ""),
    /** The type(s) of this Pokémon */
    types: types.array(types.string),
    /** The type(s) of Pokémons that this Pokémon is resistant to */
    resistant: types.array(types.string),
    /** The attacks of this Pokémon */
    attacks: types.maybe(types.late(() => PokemonAttackModel)),
    /** The type(s) of Pokémons that this Pokémon weak to */
    weaknesses: types.array(types.string),
    fleeRate: types.optional(types.number, 0),
    /** The maximum CP of this Pokémon */
    maxCP: types.optional(types.integer, 0),
    /** The evolutions of this Pokémon */
    evolutions: types.array(MSTGQLRef(types.late((): any => PokemonModel))),
    /** The evolution requirements of this Pokémon */
    evolutionRequirements: types.maybe(
      types.late(() => PokemonEvolutionRequirementModel)
    ),
    /** The maximum HP of this Pokémon */
    maxHP: types.optional(types.integer, 0),
    image: types.optional(types.string, "")
  })
  .views(self => ({
    get store() {
      return self.__getStore<typeof RootStore.Type>()
    }
  }))

export function selectFromPokemon() {
  return new PokemonModelSelector()
}

export const pokemonModelPrimitives = selectFromPokemon().id.number.name.classification.types.resistant.weaknesses.fleeRate.maxCP.maxHP.image.build()

export class PokemonModelSelector<PARENT> extends QueryBuilder<PARENT> {
  get id() {
    return this.__attr(`id`)
  }
  get number() {
    return this.__attr(`number`)
  }
  get name() {
    return this.__attr(`name`)
  }
  get classification() {
    return this.__attr(`classification`)
  }
  get types() {
    return this.__attr(`types`)
  }
  get resistant() {
    return this.__attr(`resistant`)
  }
  get weaknesses() {
    return this.__attr(`weaknesses`)
  }
  get fleeRate() {
    return this.__attr(`fleeRate`)
  }
  get maxCP() {
    return this.__attr(`maxCP`)
  }
  get maxHP() {
    return this.__attr(`maxHP`)
  }
  get image() {
    return this.__attr(`image`)
  }
  weight(): PokemonDimensionModelSelector<this> {
    return this.__child(`weight`, PokemonDimensionModelSelector) as any
  }
  height(): PokemonDimensionModelSelector<this> {
    return this.__child(`height`, PokemonDimensionModelSelector) as any
  }
  attacks(): PokemonAttackModelSelector<this> {
    return this.__child(`attacks`, PokemonAttackModelSelector) as any
  }
  evolutions(): PokemonModelSelector<this> {
    return this.__child(`evolutions`, PokemonModelSelector) as any
  }
  evolutionRequirements(): PokemonEvolutionRequirementModelSelector<this> {
    return this.__child(
      `evolutionRequirements`,
      PokemonEvolutionRequirementModelSelector
    ) as any
  }
}

selectFromPokemon()
  .classification.fleeRate.attacks()
  .fast()
  .damage.close()
  .close()
  .build()
