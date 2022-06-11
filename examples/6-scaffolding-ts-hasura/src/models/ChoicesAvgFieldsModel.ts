import { Instance } from "mobx-state-tree"
import { ChoicesAvgFieldsModelBase } from "./ChoicesAvgFieldsModel.base"

/* The TypeScript type of an instance of ChoicesAvgFieldsModel */
export interface ChoicesAvgFieldsModelType
  extends Instance<typeof ChoicesAvgFieldsModel.Type> {}

/* A graphql query fragment builders for ChoicesAvgFieldsModel */
export {
  selectFromChoicesAvgFields,
  choicesAvgFieldsModelPrimitives,
  ChoicesAvgFieldsModelSelector
} from "./ChoicesAvgFieldsModel.base"

/**
 * ChoicesAvgFieldsModel
 */
export const ChoicesAvgFieldsModel = ChoicesAvgFieldsModelBase.actions(
  (self) => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  })
)
