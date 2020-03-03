import { combineReducers } from "redux";
import { EquationConfigurationReducer } from "./EquationConfigurationReducer";

export const TestConfigurationReducers = combineReducers({
  equationConfigurationReducer: EquationConfigurationReducer
});
