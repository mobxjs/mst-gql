/* #region mst-gql-header */
/* This file is generated using mst-gql-scaffold.js Mon, 06 May 2019 19:29:32 GMT */
import { types } from "mobx-state-tree"
import { MSTGQLObject } from "mst-gql"

import { PokemonDimension, PokemonAttack, PokemonEvolutionRequirement } from "./index"
/* #endregion */

/* #region mst-gql-body */
/**
 * Pokemon
 *
 * Represents a Pokémon
 */
const Pokemon = MSTGQLObject
  .named('Pokemon')
  .props({
    /** The ID of an object */
    id: types.identifier,
    /** The identifier of this Pokémon */
    number: types.optional(types.string, ''),
    /** The name of this Pokémon */
    name: types.optional(types.string, ''),
    /** The minimum and maximum weight of this Pokémon */
    weight: types.maybe(types.reference(PokemonDimension)),
    /** The minimum and maximum weight of this Pokémon */
    height: types.maybe(types.reference(PokemonDimension)),
    /** The classification of this Pokémon */
    classification: types.optional(types.string, ''),
    /** The type(s) of this Pokémon */
    types: types.array(types.string),
    /** The type(s) of Pokémons that this Pokémon is resistant to */
    resistant: types.array(types.string),
    /** The attacks of this Pokémon */
    attacks: types.maybe(types.reference(PokemonAttack)),
    /** The type(s) of Pokémons that this Pokémon weak to */
    weaknesses: types.array(types.string),
    fleeRate: types.optional(types.number, 0),
    /** The maximum CP of this Pokémon */
    maxCP: types.optional(types.integer, 0),
    /** The evolutions of this Pokémon */
    evolutions: types.array(types.reference(types.late((): any => Pokemon))),
    /** The evolution requirements of this Pokémon */
    evolutionRequirements: types.maybe(types.reference(PokemonEvolutionRequirement)),
    /** The maximum HP of this Pokémon */
    maxHP: types.optional(types.integer, 0),
    image: types.optional(types.string, ''),
  }) /* #endregion */
  .actions(self => ({
    // this is just an auto-generated example action.
    // Feel free to add your own actions, props, views etc to the model.
    // Any code outside the '#region mst-gql-*'  regions will be preserved
    log() {
      console.log(JSON.stringify(self))
    }
  }))

/* #region mst-gql-footer */
export { Pokemon }
/* #endregion */
