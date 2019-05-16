import { PokemonAttackModel } from "./PokemonAttack.model"

/* The TypeScript type of an instance of PokemonAttack */
export type PokemonAttackType = typeof PokemonAttack.Type

/* A graphql query fragment containing all the primitive fields of PokemonAttack */
export { pokemonAttackPrimitives } from "./PokemonAttack.model"

export const PokemonAttack = PokemonAttackModel
  .actions(self => ({
    // This is just an auto-generated example action, which can be safely thrown away. 
    // Feel free to add your own actions, props, views etc to the model. 
    // Any code outside the '#region mst-gql-*'  regions will be preserved
    log() {
      console.log(JSON.stringify(self))
    }
  }))
