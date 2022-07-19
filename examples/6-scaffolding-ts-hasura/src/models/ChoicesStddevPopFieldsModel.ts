import { Instance } from "mobx-state-tree"
import { ChoicesStddevPopFieldsModelBase } from "./ChoicesStddevPopFieldsModel.base"

/* The TypeScript type of an instance of ChoicesStddevPopFieldsModel */
export interface ChoicesStddevPopFieldsModelType
  extends Instance<typeof ChoicesStddevPopFieldsModel.Type> {}

/* A graphql query fragment builders for ChoicesStddevPopFieldsModel */
export {
  selectFromChoicesStddevPopFields,
  choicesStddevPopFieldsModelPrimitives,
  ChoicesStddevPopFieldsModelSelector
} from "./ChoicesStddevPopFieldsModel.base"

/**
 * ChoicesStddevPopFieldsModel
 */
export const ChoicesStddevPopFieldsModel =
  ChoicesStddevPopFieldsModelBase.actions((self) => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
