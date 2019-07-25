import { AttackModelBase } from "./AttackModel.base"

/* The TypeScript type of an instance of AttackModel */
export type AttackModelType = typeof AttackModel.Type

/* A graphql query fragment builders for AttackModel */
export {
  selectFromAttack,
  attackModelPrimitives,
  AttackModelSelector
} from "./AttackModel.base"

/**
 * AttackModel
 *
 * Represents a Pokémon's attack types
 */
export const AttackModel = AttackModelBase.actions(self => ({
  // This is an auto-generated example action.
  log() {
    console.log(JSON.stringify(self))
  }
}))
