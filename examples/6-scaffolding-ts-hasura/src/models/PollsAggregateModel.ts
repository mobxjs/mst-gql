import { Instance } from "mobx-state-tree"
import { PollsAggregateModelBase } from "./PollsAggregateModel.base"

/* The TypeScript type of an instance of PollsAggregateModel */
export interface PollsAggregateModelType
  extends Instance<typeof PollsAggregateModel.Type> {}

/* A graphql query fragment builders for PollsAggregateModel */
export {
  selectFromPollsAggregate,
  pollsAggregateModelPrimitives,
  PollsAggregateModelSelector
} from "./PollsAggregateModel.base"

/**
 * PollsAggregateModel
 */
export const PollsAggregateModel = PollsAggregateModelBase.actions((self) => ({
  // This is an auto-generated example action.
  log() {
    console.log(JSON.stringify(self))
  }
}))
