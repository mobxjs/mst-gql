import { Instance } from "mobx-state-tree"
import { PollsStddevSampFieldsModelBase } from "./PollsStddevSampFieldsModel.base"

/* The TypeScript type of an instance of PollsStddevSampFieldsModel */
export interface PollsStddevSampFieldsModelType
  extends Instance<typeof PollsStddevSampFieldsModel.Type> {}

/* A graphql query fragment builders for PollsStddevSampFieldsModel */
export {
  selectFromPollsStddevSampFields,
  pollsStddevSampFieldsModelPrimitives,
  PollsStddevSampFieldsModelSelector
} from "./PollsStddevSampFieldsModel.base"

/**
 * PollsStddevSampFieldsModel
 */
export const PollsStddevSampFieldsModel =
  PollsStddevSampFieldsModelBase.actions((self) => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
