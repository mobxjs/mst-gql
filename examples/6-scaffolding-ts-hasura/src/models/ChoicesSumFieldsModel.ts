import { Instance } from "mobx-state-tree"
import { ChoicesSumFieldsModelBase } from "./ChoicesSumFieldsModel.base"

/* The TypeScript type of an instance of ChoicesSumFieldsModel */
export interface ChoicesSumFieldsModelType
  extends Instance<typeof ChoicesSumFieldsModel.Type> {}

/* A graphql query fragment builders for ChoicesSumFieldsModel */
export {
  selectFromChoicesSumFields,
  choicesSumFieldsModelPrimitives,
  ChoicesSumFieldsModelSelector
} from "./ChoicesSumFieldsModel.base"

/**
 * ChoicesSumFieldsModel
 */
export const ChoicesSumFieldsModel = ChoicesSumFieldsModelBase.actions(
  (self) => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  })
)
