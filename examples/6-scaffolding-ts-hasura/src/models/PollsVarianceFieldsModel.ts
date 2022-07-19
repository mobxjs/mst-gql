import { Instance } from "mobx-state-tree"
import { PollsVarianceFieldsModelBase } from "./PollsVarianceFieldsModel.base"

/* The TypeScript type of an instance of PollsVarianceFieldsModel */
export interface PollsVarianceFieldsModelType
  extends Instance<typeof PollsVarianceFieldsModel.Type> {}

/* A graphql query fragment builders for PollsVarianceFieldsModel */
export {
  selectFromPollsVarianceFields,
  pollsVarianceFieldsModelPrimitives,
  PollsVarianceFieldsModelSelector
} from "./PollsVarianceFieldsModel.base"

/**
 * PollsVarianceFieldsModel
 */
export const PollsVarianceFieldsModel = PollsVarianceFieldsModelBase.actions(
  (self) => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  })
)
