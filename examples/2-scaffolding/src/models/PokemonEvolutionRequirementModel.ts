import { Instance } from "mobx-state-tree"
import { PokemonEvolutionRequirementModelBase } from "./PokemonEvolutionRequirementModel.base"

/* The TypeScript type of an instance of PokemonEvolutionRequirementModel */
export interface PokemonEvolutionRequirementModelType extends Instance<typeof PokemonEvolutionRequirementModel.Type> {}

/* A graphql query fragment builders for PokemonEvolutionRequirementModel */
export { selectFromPokemonEvolutionRequirement, pokemonEvolutionRequirementModelPrimitives, PokemonEvolutionRequirementModelSelector } from "./PokemonEvolutionRequirementModel.base"

/**
 * PokemonEvolutionRequirementModel
 *
 * Represents a Pokémon's requirement to evolve
 */
export const PokemonEvolutionRequirementModel = PokemonEvolutionRequirementModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
