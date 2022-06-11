import { Instance } from "mobx-state-tree"
import { ChoicesVarPopFieldsModelBase } from "./ChoicesVarPopFieldsModel.base"

/* The TypeScript type of an instance of ChoicesVarPopFieldsModel */
export interface ChoicesVarPopFieldsModelType
  extends Instance<typeof ChoicesVarPopFieldsModel.Type> {}

/* A graphql query fragment builders for ChoicesVarPopFieldsModel */
export {
  selectFromChoicesVarPopFields,
  choicesVarPopFieldsModelPrimitives,
  ChoicesVarPopFieldsModelSelector
} from "./ChoicesVarPopFieldsModel.base"

/**
 * ChoicesVarPopFieldsModel
 */
export const ChoicesVarPopFieldsModel = ChoicesVarPopFieldsModelBase.actions(
  (self) => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  })
)
