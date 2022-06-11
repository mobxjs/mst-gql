import { Instance } from "mobx-state-tree"
import { PollsMaxFieldsModelBase } from "./PollsMaxFieldsModel.base"

/* The TypeScript type of an instance of PollsMaxFieldsModel */
export interface PollsMaxFieldsModelType
  extends Instance<typeof PollsMaxFieldsModel.Type> {}

/* A graphql query fragment builders for PollsMaxFieldsModel */
export {
  selectFromPollsMaxFields,
  pollsMaxFieldsModelPrimitives,
  PollsMaxFieldsModelSelector
} from "./PollsMaxFieldsModel.base"

/**
 * PollsMaxFieldsModel
 */
export const PollsMaxFieldsModel = PollsMaxFieldsModelBase.actions((self) => ({
  // This is an auto-generated example action.
  log() {
    console.log(JSON.stringify(self))
  }
}))
