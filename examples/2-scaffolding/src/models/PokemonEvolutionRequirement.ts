/* This is a mst-sql generated file */
import { types } from "mobx-state-tree"
import { MSTGQLObject } from "mst-gql"

/* #region type-imports */

/* #endregion */

/* #region fragments */
export const pokemonEvolutionRequirementPrimitives = `
id
__typename
amount
name
`
export const pokemonEvolutionRequirementFieldsShallow = pokemonEvolutionRequirementPrimitives
export const pokemonEvolutionRequirementFieldsDeep = pokemonEvolutionRequirementPrimitives
/* #endregion */

/* #region type-def */

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

export { PokemonEvolutionRequirement }