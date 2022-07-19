import { Instance } from "mobx-state-tree"
import { PollsMutationResponseModelBase } from "./PollsMutationResponseModel.base"

/* The TypeScript type of an instance of PollsMutationResponseModel */
export interface PollsMutationResponseModelType
  extends Instance<typeof PollsMutationResponseModel.Type> {}

/* A graphql query fragment builders for PollsMutationResponseModel */
export {
  selectFromPollsMutationResponse,
  pollsMutationResponseModelPrimitives,
  PollsMutationResponseModelSelector
} from "./PollsMutationResponseModel.base"

/**
 * PollsMutationResponseModel
 */
export const PollsMutationResponseModel =
  PollsMutationResponseModelBase.actions((self) => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
