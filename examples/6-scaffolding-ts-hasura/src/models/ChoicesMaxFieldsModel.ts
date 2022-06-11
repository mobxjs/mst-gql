import { Instance } from "mobx-state-tree"
import { ChoicesMaxFieldsModelBase } from "./ChoicesMaxFieldsModel.base"

/* The TypeScript type of an instance of ChoicesMaxFieldsModel */
export interface ChoicesMaxFieldsModelType
  extends Instance<typeof ChoicesMaxFieldsModel.Type> {}

/* A graphql query fragment builders for ChoicesMaxFieldsModel */
export {
  selectFromChoicesMaxFields,
  choicesMaxFieldsModelPrimitives,
  ChoicesMaxFieldsModelSelector
} from "./ChoicesMaxFieldsModel.base"

/**
 * ChoicesMaxFieldsModel
 */
export const ChoicesMaxFieldsModel = ChoicesMaxFieldsModelBase.actions(
  (self) => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  })
)
