import { Instance } from "mobx-state-tree"
import { ChoicesStddevFieldsModelBase } from "./ChoicesStddevFieldsModel.base"

/* The TypeScript type of an instance of ChoicesStddevFieldsModel */
export interface ChoicesStddevFieldsModelType
  extends Instance<typeof ChoicesStddevFieldsModel.Type> {}

/* A graphql query fragment builders for ChoicesStddevFieldsModel */
export {
  selectFromChoicesStddevFields,
  choicesStddevFieldsModelPrimitives,
  ChoicesStddevFieldsModelSelector
} from "./ChoicesStddevFieldsModel.base"

/**
 * ChoicesStddevFieldsModel
 */
export const ChoicesStddevFieldsModel = ChoicesStddevFieldsModelBase.actions(
  (self) => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  })
)
