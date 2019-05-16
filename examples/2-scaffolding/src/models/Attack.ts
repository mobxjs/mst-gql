import { AttackModel } from "./Attack.model"

/* The TypeScript type of an instance of Attack */
export type AttackType = typeof Attack.Type

/* A graphql query fragment containing all the primitive fields of Attack */
export { attackPrimitives } from "./Attack.model"

export const Attack = AttackModel
  .actions(self => ({
    // This is just an auto-generated example action, which can be safely thrown away. 
    // Feel free to add your own actions, props, views etc to the model. 
    // Any code outside the '#region mst-gql-*'  regions will be preserved
    log() {
      console.log(JSON.stringify(self))
    }
  }))
