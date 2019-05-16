/* This is a mst-sql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLObject, MSTGQLRef } from "mst-gql"

import { PokemonDimensionModel } from "./PokemonDimensionModel"
import { PokemonAttackModel } from "./PokemonAttackModel"
import { PokemonModel } from "./PokemonModel"
import { PokemonEvolutionRequirementModel } from "./PokemonEvolutionRequirementModel"
import { RootStore } from "./index"

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
    number: types.optional(types.string, ''),
    /** The name of this Pokémon */
    name: types.optional(types.string, ''),
    /** The minimum and maximum weight of this Pokémon */
    weight: types.maybe(types.late(() => PokemonDimensionModel)),
    /** The minimum and maximum weight of this Pokémon */
    height: types.maybe(types.late(() => PokemonDimensionModel)),
    /** The classification of this Pokémon */
    classification: types.optional(types.string, ''),
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
    evolutionRequirements: types.maybe(types.late(() => PokemonEvolutionRequirementModel)),
    /** The maximum HP of this Pokémon */
    maxHP: types.optional(types.integer, 0),
    image: types.optional(types.string, ''),
  })
  .views(self => ({
    get store() {
      return self.__getStore<typeof RootStore.Type>()
    }
  }))

export const pokemonModelPrimitives = `
__typename
id
number
name
classification
types
resistant
weaknesses
fleeRate
maxCP
maxHP
image
`

