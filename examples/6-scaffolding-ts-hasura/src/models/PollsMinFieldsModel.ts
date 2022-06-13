import { Instance } from "mobx-state-tree"
import { PollsMinFieldsModelBase } from "./PollsMinFieldsModel.base"

/* The TypeScript type of an instance of PollsMinFieldsModel */
export interface PollsMinFieldsModelType
  extends Instance<typeof PollsMinFieldsModel.Type> {}

/* A graphql query fragment builders for PollsMinFieldsModel */
export {
  selectFromPollsMinFields,
  pollsMinFieldsModelPrimitives,
  PollsMinFieldsModelSelector
} from "./PollsMinFieldsModel.base"

/**
 * PollsMinFieldsModel
 */
export const PollsMinFieldsModel = PollsMinFieldsModelBase.actions((self) => ({
  // This is an auto-generated example action.
  log() {
    console.log(JSON.stringify(self))
  }
}))
