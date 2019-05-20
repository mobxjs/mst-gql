import { PokemonModelBase } from "./PokemonModel.base"

/* The TypeScript type of an instance of PokemonModel */
export type PokemonModelType = typeof PokemonModel.Type

/* A graphql query fragment builders for PokemonModel */
export { selectFromPokemon, pokemonModelPrimitives, PokemonModelSelector } from "./PokemonModel.base"

/**
 * PokemonModel
 *
 * Represents a Pokémon
 */
export const PokemonModel = PokemonModelBase
  .actions(self => ({
    // This is just an auto-generated example action, which can be safely thrown away. 
    // Feel free to add your own actions, props, views etc to the model. 
    // Any code outside the '#region mst-gql-*'  regions will be preserved
    log() {
      console.log(JSON.stringify(self))
    }
  }))
