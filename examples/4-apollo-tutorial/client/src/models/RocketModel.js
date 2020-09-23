import { RocketModelBase } from "./RocketModel.base"

/* A graphql query fragment builders for RocketModel */
export {
  selectFromRocket,
  rocketModelPrimitives,
  RocketModelSelector
} from "./RocketModel.base"

/**
 * RocketModel
 */
export const RocketModel = RocketModelBase.actions((self) => ({
  // This is an auto-generated example action.
  log() {
    console.log(JSON.stringify(self))
  }
}))
