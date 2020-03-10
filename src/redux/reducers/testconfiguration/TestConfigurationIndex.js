import { combineReducers } from "redux";
import { EquationConfigurationReducer } from "./EquationConfigurationReducer";
import { ParameterConfigurationReducer } from "./ParameterConfigurationReducer";
import { TriggerEquationAreaReducer } from "./TriggerEquationAreaReducer";

export const TestConfigurationReducers = combineReducers({
  equationConfigurationReducer: EquationConfigurationReducer,
  parameterConfigurationReducer: ParameterConfigurationReducer,
  triggerEquationAreaReducer: TriggerEquationAreaReducer
});
