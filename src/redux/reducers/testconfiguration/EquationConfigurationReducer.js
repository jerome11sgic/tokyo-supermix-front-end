import {
  ADD_EQUATION_SYMBOLS,
  ADD_TEXT_BODY_WITH_KEYPRESS,
  ADD_PARAMETERS,
  POP_PARAMETERS,
  CREATE_MINI_CARD,
  REMOVE_MINI_CARD,
  CLEAR_STATES_WHILE_CANCEL
} from "../../action/testconfiguration/TestConfiguration";

const initialState = {
  textBody: "",
  regex: /[^=+-/.()√π<>²\d*]/gi,
  acceptedIndexes: [],
  //creation of mini cards
  cards: [],
  tmp: [],
  //storing payload for api call
  paramsData: []
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
          "[^" + state.acceptedIndexes + "0-9=+-/.()√π<>²\\d*]",
          "g"
        )),
        textBody: state.textBody + action.payload
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
          "[^" + state.acceptedIndexes + "0-9=+-/.()√π<>²\\d*]",
          "g"
        ))
      };

    case CREATE_MINI_CARD:
      state.acceptedIndexes.push(action.payload.abbreviation);
      console.log(state.acceptedIndexes[0]);
      state.paramsData.push(action.payload.id);
      console.log(
        "DEBUG-ParamsData:" + state.paramsData.map((post, index) => post)
      );
      return {
        ...state,
        cards: [...state.cards, action.payload.abbreviation],
        regex: (state.regex = new RegExp(
          "[^" + state.acceptedIndexes + "0-9=+-/.()√π<>²\\d*]",
          "g"
        ))
      };

    case REMOVE_MINI_CARD:
      const newState = state.cards.filter(
        val => val !== action.payload.abbreviation
      );
      console.log("DEBUG1234: ", newState);
      console.log(
        "DEBUG SEARCH CHAR: " +
          state.textBody.replace(action.payload.abbreviation, "")
      );

      return {
        ...state,
        cards: newState,
        regex: (state.regex = new RegExp(
          "[^" + newState + "0-9=+-/.()√π<>²\\d*]",
          "g"
        )),
        textBody: state.textBody.replace(action.payload.abbreviation, "")
      };

    case CLEAR_STATES_WHILE_CANCEL:
      return {
        ...state,
        cards: [],
        regex: /[^=+-/.()√π<>²\d*]/gi,
        acceptedIndexes: [],
        textBody: ""
      };

    default:
      return state;
  }
};
