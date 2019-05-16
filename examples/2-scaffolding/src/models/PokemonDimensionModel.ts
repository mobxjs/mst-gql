import { PokemonDimensionModelBase } from "./PokemonDimensionModel.base"

/* The TypeScript type of an instance of PokemonDimensionModel */
export type PokemonDimensionModelType = typeof PokemonDimensionModel.Type

/* A graphql query fragment containing all the primitive fields of PokemonDimensionModel */
export { pokemonDimensionModelPrimitives } from "./PokemonDimensionModel.base"

/**
 * PokemonDimensionModel
 *
 * Represents a Pokémon's dimensions
 */
export const PokemonDimensionModel = PokemonDimensionModelBase
  .actions(self => ({
    // This is just an auto-generated example action, which can be safely thrown away. 
    // Feel free to add your own actions, props, views etc to the model. 
    // Any code outside the '#region mst-gql-*'  regions will be preserved
    log() {
      console.log(JSON.stringify(self))
    }
  }))
