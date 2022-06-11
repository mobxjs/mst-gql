import { Instance } from "mobx-state-tree"
import { ChoicesMutationResponseModelBase } from "./ChoicesMutationResponseModel.base"

/* The TypeScript type of an instance of ChoicesMutationResponseModel */
export interface ChoicesMutationResponseModelType
  extends Instance<typeof ChoicesMutationResponseModel.Type> {}

/* A graphql query fragment builders for ChoicesMutationResponseModel */
export {
  selectFromChoicesMutationResponse,
  choicesMutationResponseModelPrimitives,
  ChoicesMutationResponseModelSelector
} from "./ChoicesMutationResponseModel.base"

/**
 * ChoicesMutationResponseModel
 */
export const ChoicesMutationResponseModel =
  ChoicesMutationResponseModelBase.actions((self) => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
