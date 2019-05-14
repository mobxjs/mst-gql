/* This is a mst-sql generated file */

/* #region type-imports */
import { types } from "mobx-state-tree"
import { MSTGQLObject, MSTGQLRef } from "mst-gql"
import { RootStore } from "./RootStore"
import { PokemonDimension } from "./PokemonDimension"

import { PokemonAttack } from "./PokemonAttack"

import { PokemonEvolutionRequirement } from "./PokemonEvolutionRequirement"
/* #endregion */

/* #region fragments */
export const pokemonPrimitives = `
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

/* #endregion */

/* #region type-def */
export type PokemonType = typeof Pokemon.Type

/**
* Pokemon
 *
 * Represents a Pokémon
*/
export const Pokemon = MSTGQLObject
  .named('Pokemon')
  .props({
    /** The ID of an object */
    id: types.identifier,
    /** The identifier of this Pokémon */
    number: types.optional(types.string, ''),
    /** The name of this Pokémon */
    name: types.optional(types.string, ''),
    /** The minimum and maximum weight of this Pokémon */
    weight: types.maybe(types.late(() => PokemonDimension)),
    /** The minimum and maximum weight of this Pokémon */
    height: types.maybe(types.late(() => PokemonDimension)),
    /** The classification of this Pokémon */
    classification: types.optional(types.string, ''),
    /** The type(s) of this Pokémon */
    types: types.array(types.string),
    /** The type(s) of Pokémons that this Pokémon is resistant to */
    resistant: types.array(types.string),
    /** The attacks of this Pokémon */
    attacks: types.maybe(types.late(() => PokemonAttack)),
    /** The type(s) of Pokémons that this Pokémon weak to */
    weaknesses: types.array(types.string),
    fleeRate: types.optional(types.number, 0),
    /** The maximum CP of this Pokémon */
    maxCP: types.optional(types.integer, 0),
    /** The evolutions of this Pokémon */
    evolutions: types.array(MSTGQLRef(types.late((): any => Pokemon))),
    /** The evolution requirements of this Pokémon */
    evolutionRequirements: types.maybe(types.late(() => PokemonEvolutionRequirement)),
    /** The maximum HP of this Pokémon */
    maxHP: types.optional(types.integer, 0),
    image: types.optional(types.string, ''),
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