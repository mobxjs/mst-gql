import { Instance } from "mobx-state-tree"
import { ChoicesVarSampFieldsModelBase } from "./ChoicesVarSampFieldsModel.base"

/* The TypeScript type of an instance of ChoicesVarSampFieldsModel */
export interface ChoicesVarSampFieldsModelType
  extends Instance<typeof ChoicesVarSampFieldsModel.Type> {}

/* A graphql query fragment builders for ChoicesVarSampFieldsModel */
export {
  selectFromChoicesVarSampFields,
  choicesVarSampFieldsModelPrimitives,
  ChoicesVarSampFieldsModelSelector
} from "./ChoicesVarSampFieldsModel.base"

/**
 * ChoicesVarSampFieldsModel
 */
export const ChoicesVarSampFieldsModel = ChoicesVarSampFieldsModelBase.actions(
  (self) => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  })
)
