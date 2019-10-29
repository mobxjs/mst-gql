import { Instance } from "mobx-state-tree"
import {
  PokemonEvolutionRequirementModelBase,
  PokemonEvolutionRequirementModelBaseRefsType
} from "./PokemonEvolutionRequirementModel.base"

/* A graphql query fragment builders for PokemonEvolutionRequirementModel */
export {
  selectFromPokemonEvolutionRequirement,
  pokemonEvolutionRequirementModelPrimitives,
  PokemonEvolutionRequirementModelSelector
} from "./PokemonEvolutionRequirementModel.base"

/* The TypeScript type of an instance of PokemonEvolutionRequirementModelBase */
export interface PokemonEvolutionRequirementModelType
  extends Instance<typeof PokemonEvolutionRequirementModel.Type> {}
export interface PokemonEvolutionRequirementModelType
  extends PokemonEvolutionRequirementModelBaseRefsType {}

/* Helper function to cast self argument to a PokemonEvolutionRequirementModel instance */
const as = (self: any) =>
  (self as unknown) as PokemonEvolutionRequirementModelType

/**
 * PokemonEvolutionRequirementModel
 *
 * Represents a Pokémon's requirement to evolve
 */
export const PokemonEvolutionRequirementModel = PokemonEvolutionRequirementModelBase.actions(
  self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(as(self)))
    }
  })
)
