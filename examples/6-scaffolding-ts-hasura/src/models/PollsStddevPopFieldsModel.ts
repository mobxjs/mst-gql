import { Instance } from "mobx-state-tree"
import { PollsStddevPopFieldsModelBase } from "./PollsStddevPopFieldsModel.base"

/* The TypeScript type of an instance of PollsStddevPopFieldsModel */
export interface PollsStddevPopFieldsModelType
  extends Instance<typeof PollsStddevPopFieldsModel.Type> {}

/* A graphql query fragment builders for PollsStddevPopFieldsModel */
export {
  selectFromPollsStddevPopFields,
  pollsStddevPopFieldsModelPrimitives,
  PollsStddevPopFieldsModelSelector
} from "./PollsStddevPopFieldsModel.base"

/**
 * PollsStddevPopFieldsModel
 */
export const PollsStddevPopFieldsModel = PollsStddevPopFieldsModelBase.actions(
  (self) => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  })
)
