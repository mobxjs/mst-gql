import { Instance } from "mobx-state-tree"
import { PollsModelBase } from "./PollsModel.base"

/* The TypeScript type of an instance of PollsModel */
export interface PollsModelType extends Instance<typeof PollsModel.Type> {}

/* A graphql query fragment builders for PollsModel */
export {
  selectFromPolls,
  pollsModelPrimitives,
  PollsModelSelector
} from "./PollsModel.base"

/**
 * PollsModel
 */
export const PollsModel = PollsModelBase.actions((self) => ({
  // This is an auto-generated example action.
  log() {
    console.log(JSON.stringify(self))
  }
}))
