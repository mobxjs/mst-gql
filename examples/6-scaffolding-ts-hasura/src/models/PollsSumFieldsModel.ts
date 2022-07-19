import { Instance } from "mobx-state-tree"
import { PollsSumFieldsModelBase } from "./PollsSumFieldsModel.base"

/* The TypeScript type of an instance of PollsSumFieldsModel */
export interface PollsSumFieldsModelType
  extends Instance<typeof PollsSumFieldsModel.Type> {}

/* A graphql query fragment builders for PollsSumFieldsModel */
export {
  selectFromPollsSumFields,
  pollsSumFieldsModelPrimitives,
  PollsSumFieldsModelSelector
} from "./PollsSumFieldsModel.base"

/**
 * PollsSumFieldsModel
 */
export const PollsSumFieldsModel = PollsSumFieldsModelBase.actions((self) => ({
  // This is an auto-generated example action.
  log() {
    console.log(JSON.stringify(self))
  }
}))
