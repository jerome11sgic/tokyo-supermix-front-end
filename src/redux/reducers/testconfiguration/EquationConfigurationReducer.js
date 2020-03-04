import {
  ADD_EQUATION_SYMBOLS,
  ADD_TEXT_BODY_WITH_KEYPRESS,
  ADD_PARAMETERS,
  POP_PARAMETERS
} from "../../action/testconfiguration/TestConfiguration";

const initialState = {
  textBody: "",
  regex: /[^=+-/.()√π<>²\d*]/gi,
  acceptedIndexes: []
};

export const EquationConfigurationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EQUATION_SYMBOLS:
      return {
        ...state,
        textBody: state.textBody + action.payload
      };
    case ADD_TEXT_BODY_WITH_KEYPRESS:
      return {
        ...state,
        textBody: action.payload.replace(state.regex, "")
      };

    case ADD_PARAMETERS:
      state.acceptedIndexes.push(action.payload);
      console.log(state.acceptedIndexes[0]);
      return {
        ...state,
        regex: (state.regex = new RegExp(
          "[^" + state.acceptedIndexes + "0-9=+-/.()√π<>²d*]",
          "g"
        ))
      };

    case POP_PARAMETERS:
      for (let i = 0; i < state.acceptedIndexes.length; i++) {
        if (state.acceptedIndexes[i] === action.payload) {
          console.log(state.acceptedIndexes[i]);
          state.acceptedIndexes.splice(i, 1);
          console.log(state.acceptedIndexes);
        }
      }

      return {
        ...state,
        regex: (state.regex = new RegExp(
          "[^" + state.acceptedIndexes + "0-9=+-/.()√π<>²d*]",
          "g"
        ))
      };
    default:
      return state;
  }
};
