import { Instance } from "mobx-state-tree"
import { ChoicesModelBase } from "./ChoicesModel.base"

/* The TypeScript type of an instance of ChoicesModel */
export interface ChoicesModelType extends Instance<typeof ChoicesModel.Type> {}

/* A graphql query fragment builders for ChoicesModel */
export {
  selectFromChoices,
  choicesModelPrimitives,
  ChoicesModelSelector
} from "./ChoicesModel.base"

/**
 * ChoicesModel
 */
export const ChoicesModel = ChoicesModelBase.actions((self) => ({
  // This is an auto-generated example action.
  log() {
    console.log(JSON.stringify(self))
  }
}))
