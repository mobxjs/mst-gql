import { Instance } from "mobx-state-tree"
import { PollsVarPopFieldsModelBase } from "./PollsVarPopFieldsModel.base"

/* The TypeScript type of an instance of PollsVarPopFieldsModel */
export interface PollsVarPopFieldsModelType
  extends Instance<typeof PollsVarPopFieldsModel.Type> {}

/* A graphql query fragment builders for PollsVarPopFieldsModel */
export {
  selectFromPollsVarPopFields,
  pollsVarPopFieldsModelPrimitives,
  PollsVarPopFieldsModelSelector
} from "./PollsVarPopFieldsModel.base"

/**
 * PollsVarPopFieldsModel
 */
export const PollsVarPopFieldsModel = PollsVarPopFieldsModelBase.actions(
  (self) => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  })
)
