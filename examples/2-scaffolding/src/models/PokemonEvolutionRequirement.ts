/* #region mst-gql-header */
/* This file is generated using mst-gql-scaffold.js Mon, 06 May 2019 19:29:32 GMT */
import { types } from "mobx-state-tree"
import { MSTGQLObject } from "mst-gql"
/* #endregion */

/* #region mst-gql-body */
/**
 * PokemonEvolutionRequirement
 *
 * Represents a Pokémon's requirement to evolve
 */
const PokemonEvolutionRequirement = MSTGQLObject
  .named('PokemonEvolutionRequirement')
  .props({
    /** The amount of candy to evolve */
    amount: types.optional(types.integer, 0),
    /** The name of the candy to evolve */
    name: types.optional(types.string, ''),
  })
/* #endregion */
  .actions(self => ({
    // this is just an auto-generated example action. 
    // Feel free to add your own actions, props, views etc to the model. 
    // Any code outside the '#region mst-gql-*'  regions will be preserved
    log() {
      console.log(JSON.stringify(self))
    }
  }))

/* #region mst-gql-footer */
export { PokemonEvolutionRequirement }
/* #endregion */