import { combineReducers } from "redux";
import { RoutingBetweenTestResults } from "./RoutingBetweenTestResults";
import { ToggleFilterDrawers } from "./ToggleFilterDrawers";

export const testResultsReducers = combineReducers({
  RoutingBetweenTestResults: RoutingBetweenTestResults,
  ToggleFilterDrawers: ToggleFilterDrawers
});
