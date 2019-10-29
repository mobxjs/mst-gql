import { Instance } from "mobx-state-tree"
import {
  PokemonAttackModelBase,
  PokemonAttackModelBaseRefsType
} from "./PokemonAttackModel.base"

/* A graphql query fragment builders for PokemonAttackModel */
export {
  selectFromPokemonAttack,
  pokemonAttackModelPrimitives,
  PokemonAttackModelSelector
} from "./PokemonAttackModel.base"

/* The TypeScript type of an instance of PokemonAttackModelBase */
export interface PokemonAttackModelType
  extends Instance<typeof PokemonAttackModel.Type> {}
export interface PokemonAttackModelType
  extends PokemonAttackModelBaseRefsType {}

/* Helper function to cast self argument to a PokemonAttackModel instance */
const as = (self: any) => (self as unknown) as PokemonAttackModelType

/**
 * PokemonAttackModel
 *
 * Represents a Pokémon's attack types
 */
export const PokemonAttackModel = PokemonAttackModelBase.actions(self => ({
  // This is an auto-generated example action.
  log() {
    console.log(JSON.stringify(as(self)))
  }
}))
