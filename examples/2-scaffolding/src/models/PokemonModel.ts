import { Instance } from "mobx-state-tree"
import { PokemonModelBase } from "./PokemonModel.base"

/* The TypeScript type of an instance of PokemonModel */
export interface PokemonModelType extends Instance<typeof PokemonModel.Type> {}

/* A graphql query fragment builders for PokemonModel */
export { selectFromPokemon, pokemonModelPrimitives, PokemonModelSelector } from "./PokemonModel.base"

/**
 * PokemonModel
 *
 * Represents a Pokémon
 */
export const PokemonModel = PokemonModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
