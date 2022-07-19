import { Instance } from "mobx-state-tree"
import { PollsAggregateFieldsModelBase } from "./PollsAggregateFieldsModel.base"

/* The TypeScript type of an instance of PollsAggregateFieldsModel */
export interface PollsAggregateFieldsModelType
  extends Instance<typeof PollsAggregateFieldsModel.Type> {}

/* A graphql query fragment builders for PollsAggregateFieldsModel */
export {
  selectFromPollsAggregateFields,
  pollsAggregateFieldsModelPrimitives,
  PollsAggregateFieldsModelSelector
} from "./PollsAggregateFieldsModel.base"

/**
 * PollsAggregateFieldsModel
 */
export const PollsAggregateFieldsModel = PollsAggregateFieldsModelBase.actions(
  (self) => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  })
)
