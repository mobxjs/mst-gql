import { Instance } from "mobx-state-tree"
import { ChoicesAggregateFieldsModelBase } from "./ChoicesAggregateFieldsModel.base"

/* The TypeScript type of an instance of ChoicesAggregateFieldsModel */
export interface ChoicesAggregateFieldsModelType
  extends Instance<typeof ChoicesAggregateFieldsModel.Type> {}

/* A graphql query fragment builders for ChoicesAggregateFieldsModel */
export {
  selectFromChoicesAggregateFields,
  choicesAggregateFieldsModelPrimitives,
  ChoicesAggregateFieldsModelSelector
} from "./ChoicesAggregateFieldsModel.base"

/**
 * ChoicesAggregateFieldsModel
 */
export const ChoicesAggregateFieldsModel =
  ChoicesAggregateFieldsModelBase.actions((self) => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
