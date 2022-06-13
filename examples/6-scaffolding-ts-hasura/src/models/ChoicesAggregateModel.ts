import { Instance } from "mobx-state-tree"
import { ChoicesAggregateModelBase } from "./ChoicesAggregateModel.base"

/* The TypeScript type of an instance of ChoicesAggregateModel */
export interface ChoicesAggregateModelType
  extends Instance<typeof ChoicesAggregateModel.Type> {}

/* A graphql query fragment builders for ChoicesAggregateModel */
export {
  selectFromChoicesAggregate,
  choicesAggregateModelPrimitives,
  ChoicesAggregateModelSelector
} from "./ChoicesAggregateModel.base"

/**
 * ChoicesAggregateModel
 */
export const ChoicesAggregateModel = ChoicesAggregateModelBase.actions(
  (self) => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  })
)
