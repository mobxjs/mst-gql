import { PokemonModelBase } from "./PokemonModel.base"

/* The TypeScript type of an instance of PokemonModel */
export type PokemonModelType = typeof PokemonModel.Type

/* A graphql query fragment builders for PokemonModel */
export {
  selectFromPokemon,
  pokemonModelPrimitives,
  PokemonModelSelector
} from "./PokemonModel.base"

/**
 * PokemonModel
 *
 * Represents a Pokémon
 */
export const PokemonModel = PokemonModelBase.actions(self => ({
  // This is an auto-generated example action.
  log() {
    console.log(JSON.stringify(self))
  }
}))
