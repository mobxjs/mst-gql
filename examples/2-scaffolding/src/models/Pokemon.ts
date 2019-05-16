import { PokemonModel } from "./Pokemon.model"

/* The TypeScript type of an instance of Pokemon */
export type PokemonType = typeof Pokemon.Type

/* A graphql query fragment containing all the primitive fields of Pokemon */
export { pokemonPrimitives } from "./Pokemon.model"

export const Pokemon = PokemonModel
  .actions(self => ({
    // This is just an auto-generated example action, which can be safely thrown away. 
    // Feel free to add your own actions, props, views etc to the model. 
    // Any code outside the '#region mst-gql-*'  regions will be preserved
    log() {
      console.log(JSON.stringify(self))
    }
  }))
