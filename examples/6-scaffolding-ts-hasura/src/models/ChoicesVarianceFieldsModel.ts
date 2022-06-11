import { Instance } from "mobx-state-tree"
import { ChoicesVarianceFieldsModelBase } from "./ChoicesVarianceFieldsModel.base"

/* The TypeScript type of an instance of ChoicesVarianceFieldsModel */
export interface ChoicesVarianceFieldsModelType
  extends Instance<typeof ChoicesVarianceFieldsModel.Type> {}

/* A graphql query fragment builders for ChoicesVarianceFieldsModel */
export {
  selectFromChoicesVarianceFields,
  choicesVarianceFieldsModelPrimitives,
  ChoicesVarianceFieldsModelSelector
} from "./ChoicesVarianceFieldsModel.base"

/**
 * ChoicesVarianceFieldsModel
 */
export const ChoicesVarianceFieldsModel =
  ChoicesVarianceFieldsModelBase.actions((self) => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
