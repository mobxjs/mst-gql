import { PokemonEvolutionRequirementModelBase } from "./PokemonEvolutionRequirementModel.base"

/* The TypeScript type of an instance of PokemonEvolutionRequirementModel */
export type PokemonEvolutionRequirementModelType = typeof PokemonEvolutionRequirementModel.Type

/* A graphql query fragment builders for PokemonEvolutionRequirementModel */
export { selectFromPokemonEvolutionRequirement, pokemonEvolutionRequirementModelPrimitives, PokemonEvolutionRequirementModelSelector } from "./PokemonEvolutionRequirementModel.base"

/**
 * PokemonEvolutionRequirementModel
 *
 * Represents a Pokémon's requirement to evolve
 */
export const PokemonEvolutionRequirementModel = PokemonEvolutionRequirementModelBase
  .actions(self => ({
    // This is just an auto-generated example action, which can be safely thrown away. 
    // Feel free to add your own actions, props, views etc to the model. 
    // Any code outside the '#region mst-gql-*'  regions will be preserved
    log() {
      console.log(JSON.stringify(self))
    }
  }))
