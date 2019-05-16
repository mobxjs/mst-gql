import { PokemonEvolutionRequirementModel } from "./PokemonEvolutionRequirement.model"

/* The TypeScript type of an instance of PokemonEvolutionRequirement */
export type PokemonEvolutionRequirementType = typeof PokemonEvolutionRequirement.Type

/* A graphql query fragment containing all the primitive fields of PokemonEvolutionRequirement */
export { pokemonEvolutionRequirementPrimitives } from "./PokemonEvolutionRequirement.model"

export const PokemonEvolutionRequirement = PokemonEvolutionRequirementModel
  .actions(self => ({
    // This is just an auto-generated example action, which can be safely thrown away. 
    // Feel free to add your own actions, props, views etc to the model. 
    // Any code outside the '#region mst-gql-*'  regions will be preserved
    log() {
      console.log(JSON.stringify(self))
    }
  }))
