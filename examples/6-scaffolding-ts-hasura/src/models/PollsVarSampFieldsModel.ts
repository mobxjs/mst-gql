import { Instance } from "mobx-state-tree"
import { PollsVarSampFieldsModelBase } from "./PollsVarSampFieldsModel.base"

/* The TypeScript type of an instance of PollsVarSampFieldsModel */
export interface PollsVarSampFieldsModelType
  extends Instance<typeof PollsVarSampFieldsModel.Type> {}

/* A graphql query fragment builders for PollsVarSampFieldsModel */
export {
  selectFromPollsVarSampFields,
  pollsVarSampFieldsModelPrimitives,
  PollsVarSampFieldsModelSelector
} from "./PollsVarSampFieldsModel.base"

/**
 * PollsVarSampFieldsModel
 */
export const PollsVarSampFieldsModel = PollsVarSampFieldsModelBase.actions(
  (self) => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  })
)
