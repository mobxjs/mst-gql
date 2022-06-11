import { Instance } from "mobx-state-tree"
import { PollsStddevFieldsModelBase } from "./PollsStddevFieldsModel.base"

/* The TypeScript type of an instance of PollsStddevFieldsModel */
export interface PollsStddevFieldsModelType
  extends Instance<typeof PollsStddevFieldsModel.Type> {}

/* A graphql query fragment builders for PollsStddevFieldsModel */
export {
  selectFromPollsStddevFields,
  pollsStddevFieldsModelPrimitives,
  PollsStddevFieldsModelSelector
} from "./PollsStddevFieldsModel.base"

/**
 * PollsStddevFieldsModel
 */
export const PollsStddevFieldsModel = PollsStddevFieldsModelBase.actions(
  (self) => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  })
)
