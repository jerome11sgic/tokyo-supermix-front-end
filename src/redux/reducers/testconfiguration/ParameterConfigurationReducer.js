import {
  SELECT_UNIT,
  TICK_CHECKBOX
} from "../../action/testconfiguration/TestConfiguration";

const initialState = {
  unit: "",
  record: [],
  nextUnit: [],
  newRecord: [],
  switchRelevant: [],
  disabled: true
};

export const ParameterConfigurationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_UNIT:
      console.log(action.payload);
      state.unit = action.payload.value;
      console.log(state.unit);
      state.newRecord.push(action.payload.record);
      console.log(state.newRecord.length);
      for (let i = 0; i < state.newRecord.length; i++) {
        if (
          state.newRecord[i].parameterName ===
          action.payload.record.parameterName
        ) {
          console.log(state.newRecord[i].parameterName);
          console.log("match");
          console.log(i);
          console.log(state.newRecord);
          state.record.splice(0, 1, {
            parameterName: action.payload.record.parameterName,
            parameterAbbr: action.payload.record.parameterAbbr,
            unit: state.unit
          });
          break;
        }
        if (
          state.record[i].parameterName !== action.payload.record.parameterName
        ) {
          console.log("didn't match");
          state.record.splice(1, 0, {
            parameterName: action.payload.record.parameterName,
            parameterAbbr: action.payload.record.parameterAbbr,
            unit: state.unit
          });
          state.newRecord.splice(1, 0, {
            parameterName: action.payload.record.parameterName,
            parameterAbbr: action.payload.record.parameterAbbr,
            unit: state.unit
          });
          break;
        }
      }

      console.log(state.record);
      // state.nextUnit.push(state.unit);
      // console.log(state.nextUnit);
      // state.newRecord.push(action.payload.record);
      // console.log(state.newRecord);
      // state.newRecord.splice(1, 2, state.unit);
      // console.log(state.newRecord);

      return {
        ...state,
        newRecord: state.newRecord,
        disabled: (state.disabled = false)
      };

    case TICK_CHECKBOX:
      console.log(action.payload);
      for (let i = 0; i < state.record.length; i++) {
        if (state.record[i].parameterName === action.payload.parameterName) {
          state.switchRelevant.push(state.record[i]);
          console.log(state.switchRelevant);
        }
      }

      return {
        ...state,
        switchRelevant: state.switchRelevant
      };

    default:
      return state;
  }
};
