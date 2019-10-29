import { Instance } from "mobx-state-tree"
import { AttackModelBase, AttackModelBaseRefsType } from "./AttackModel.base"

/* A graphql query fragment builders for AttackModel */
export {
  selectFromAttack,
  attackModelPrimitives,
  AttackModelSelector
} from "./AttackModel.base"

/* The TypeScript type of an instance of AttackModelBase */
export interface AttackModelType extends Instance<typeof AttackModel.Type> {}
export interface AttackModelType extends AttackModelBaseRefsType {}

/* Helper function to cast self argument to a AttackModel instance */
const as = (self: any) => (self as unknown) as AttackModelType

/**
 * AttackModel
 *
 * Represents a Pokémon's attack types
 */
export const AttackModel = AttackModelBase.actions(self => ({
  // This is an auto-generated example action.
  log() {
    console.log(JSON.stringify(as(self)))
  }
}))
