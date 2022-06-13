import { Instance } from "mobx-state-tree"
import { ChoicesStddevSampFieldsModelBase } from "./ChoicesStddevSampFieldsModel.base"

/* The TypeScript type of an instance of ChoicesStddevSampFieldsModel */
export interface ChoicesStddevSampFieldsModelType
  extends Instance<typeof ChoicesStddevSampFieldsModel.Type> {}

/* A graphql query fragment builders for ChoicesStddevSampFieldsModel */
export {
  selectFromChoicesStddevSampFields,
  choicesStddevSampFieldsModelPrimitives,
  ChoicesStddevSampFieldsModelSelector
} from "./ChoicesStddevSampFieldsModel.base"

/**
 * ChoicesStddevSampFieldsModel
 */
export const ChoicesStddevSampFieldsModel =
  ChoicesStddevSampFieldsModelBase.actions((self) => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
