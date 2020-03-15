import { Instance } from "mobx-state-tree"
import { PokemonAttackModelBase } from "./PokemonAttackModel.base"

/* The TypeScript type of an instance of PokemonAttackModel */
export interface PokemonAttackModelType extends Instance<typeof PokemonAttackModel.Type> {}

/* A graphql query fragment builders for PokemonAttackModel */
export { selectFromPokemonAttack, pokemonAttackModelPrimitives, PokemonAttackModelSelector } from "./PokemonAttackModel.base"

/**
 * PokemonAttackModel
 *
 * Represents a Pokémon's attack types
 */
export const PokemonAttackModel = PokemonAttackModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
