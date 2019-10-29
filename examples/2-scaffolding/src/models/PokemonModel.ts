import { Instance } from "mobx-state-tree"
import { PokemonModelBase, PokemonModelBaseRefsType } from "./PokemonModel.base"

/* A graphql query fragment builders for PokemonModel */
export {
  selectFromPokemon,
  pokemonModelPrimitives,
  PokemonModelSelector
} from "./PokemonModel.base"

/* The TypeScript type of an instance of PokemonModelBase */
export interface PokemonModelType extends Instance<typeof PokemonModel.Type> {}
export interface PokemonModelType extends PokemonModelBaseRefsType {}

/* Helper function to cast self argument to a PokemonModel instance */
const as = (self: any) => (self as unknown) as PokemonModelType

/**
 * PokemonModel
 *
 * Represents a Pokémon
 */
export const PokemonModel = PokemonModelBase.actions(self => ({
  // This is an auto-generated example action.
  log() {
    console.log(JSON.stringify(as(self)))
  }
}))
