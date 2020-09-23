import { MissionModelBase } from "./MissionModel.base"

/* A graphql query fragment builders for MissionModel */
export {
  selectFromMission,
  missionModelPrimitives,
  MissionModelSelector
} from "./MissionModel.base"

/**
 * MissionModel
 */
export const MissionModel = MissionModelBase.actions((self) => ({
  // This is an auto-generated example action.
  log() {
    console.log(JSON.stringify(self))
  }
}))
