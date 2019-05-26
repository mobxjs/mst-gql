import { PokemonDimensionModelBase } from "./PokemonDimensionModel.base"

/* The TypeScript type of an instance of PokemonDimensionModel */
export type PokemonDimensionModelType = typeof PokemonDimensionModel.Type

/* A graphql query fragment builders for PokemonDimensionModel */
export { selectFromPokemonDimension, pokemonDimensionModelPrimitives, PokemonDimensionModelSelector } from "./PokemonDimensionModel.base"

/**
 * PokemonDimensionModel
 *
 * Represents a Pokémon's dimensions
 */
export const PokemonDimensionModel = PokemonDimensionModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
