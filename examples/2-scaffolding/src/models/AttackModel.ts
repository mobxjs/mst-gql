import { AttackModelBase } from "./AttackModel.base"

/* The TypeScript type of an instance of AttackModel */
export type AttackModelType = typeof AttackModel.Type

/* A graphql query fragment builders for AttackModel */
export { selectFromAttack, attackModelPrimitives, AttackModelSelector } from "./AttackModel.base"

/**
 * AttackModel
 *
 * Represents a Pokémon's attack types
 */
export const AttackModel = AttackModelBase
  .actions(self => ({
    // This is just an auto-generated example action, which can be safely thrown away. 
    // Feel free to add your own actions, props, views etc to the model. 
    // Any code outside the '#region mst-gql-*'  regions will be preserved
    log() {
      console.log(JSON.stringify(self))
    }
  }))
