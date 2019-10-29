import { Instance } from "mobx-state-tree"
import {
  PokemonDimensionModelBase,
  PokemonDimensionModelBaseRefsType
} from "./PokemonDimensionModel.base"

/* A graphql query fragment builders for PokemonDimensionModel */
export {
  selectFromPokemonDimension,
  pokemonDimensionModelPrimitives,
  PokemonDimensionModelSelector
} from "./PokemonDimensionModel.base"

/* The TypeScript type of an instance of PokemonDimensionModelBase */
export interface PokemonDimensionModelType
  extends Instance<typeof PokemonDimensionModel.Type> {}
export interface PokemonDimensionModelType
  extends PokemonDimensionModelBaseRefsType {}

/* Helper function to cast self argument to a PokemonDimensionModel instance */
const as = (self: any) => (self as unknown) as PokemonDimensionModelType

/**
 * PokemonDimensionModel
 *
 * Represents a Pokémon's dimensions
 */
export const PokemonDimensionModel = PokemonDimensionModelBase.actions(
  self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(as(self)))
    }
  })
)
