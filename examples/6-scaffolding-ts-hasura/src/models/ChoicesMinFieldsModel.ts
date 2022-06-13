import { Instance } from "mobx-state-tree"
import { ChoicesMinFieldsModelBase } from "./ChoicesMinFieldsModel.base"

/* The TypeScript type of an instance of ChoicesMinFieldsModel */
export interface ChoicesMinFieldsModelType
  extends Instance<typeof ChoicesMinFieldsModel.Type> {}

/* A graphql query fragment builders for ChoicesMinFieldsModel */
export {
  selectFromChoicesMinFields,
  choicesMinFieldsModelPrimitives,
  ChoicesMinFieldsModelSelector
} from "./ChoicesMinFieldsModel.base"

/**
 * ChoicesMinFieldsModel
 */
export const ChoicesMinFieldsModel = ChoicesMinFieldsModelBase.actions(
  (self) => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  })
)
