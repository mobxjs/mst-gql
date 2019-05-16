import { PokemonDimensionModel } from "./PokemonDimension.model"

/* The TypeScript type of an instance of PokemonDimension */
export type PokemonDimensionType = typeof PokemonDimension.Type

/* A graphql query fragment containing all the primitive fields of PokemonDimension */
export { pokemonDimensionPrimitives } from "./PokemonDimension.model"

export const PokemonDimension = PokemonDimensionModel
  .actions(self => ({
    // This is just an auto-generated example action, which can be safely thrown away. 
    // Feel free to add your own actions, props, views etc to the model. 
    // Any code outside the '#region mst-gql-*'  regions will be preserved
    log() {
      console.log(JSON.stringify(self))
    }
  }))
