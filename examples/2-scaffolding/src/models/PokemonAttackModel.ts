import { PokemonAttackModelBase } from "./PokemonAttackModel.base"

/* The TypeScript type of an instance of PokemonAttackModel */
export type PokemonAttackModelType = typeof PokemonAttackModel.Type

/* A graphql query fragment containing all the primitive fields of PokemonAttackModel */
export { pokemonAttackModelPrimitives } from "./PokemonAttackModel.base"

/**
 * PokemonAttackModel
 *
 * Represents a Pokémon's attack types
 */
export const PokemonAttackModel = PokemonAttackModelBase
  .actions(self => ({
    // This is just an auto-generated example action, which can be safely thrown away. 
    // Feel free to add your own actions, props, views etc to the model. 
    // Any code outside the '#region mst-gql-*'  regions will be preserved
    log() {
      console.log(JSON.stringify(self))
    }
  }))
