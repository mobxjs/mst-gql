import { Instance } from "mobx-state-tree"
import { PokemonDimensionModelBase } from "./PokemonDimensionModel.base"

/* The TypeScript type of an instance of PokemonDimensionModel */
export interface PokemonDimensionModelType extends Instance<typeof PokemonDimensionModel.Type> {}

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
