import { combineReducers } from "redux";
import { RoutingBetweenPlantLevel } from "./RoutingBetweenPlantLevels";
import { EditPlantReducer } from "./EditPlantReducer";
// import { EditDesignationReducer } from "./EditDesignationReducer";

export const plantLevelReducers = combineReducers({
  RoutingBetweenPlantLevel: RoutingBetweenPlantLevel,
  EditPlantReducer: EditPlantReducer
  // EditDesignationReducer: EditDesignationReducer
});
