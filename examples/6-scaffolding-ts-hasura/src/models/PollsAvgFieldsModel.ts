import { Instance } from "mobx-state-tree"
import { PollsAvgFieldsModelBase } from "./PollsAvgFieldsModel.base"

/* The TypeScript type of an instance of PollsAvgFieldsModel */
export interface PollsAvgFieldsModelType
  extends Instance<typeof PollsAvgFieldsModel.Type> {}

/* A graphql query fragment builders for PollsAvgFieldsModel */
export {
  selectFromPollsAvgFields,
  pollsAvgFieldsModelPrimitives,
  PollsAvgFieldsModelSelector
} from "./PollsAvgFieldsModel.base"

/**
 * PollsAvgFieldsModel
 */
export const PollsAvgFieldsModel = PollsAvgFieldsModelBase.actions((self) => ({
  // This is an auto-generated example action.
  log() {
    console.log(JSON.stringify(self))
  }
}))
