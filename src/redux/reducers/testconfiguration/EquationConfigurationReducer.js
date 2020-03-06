import {
  ADD_EQUATION_SYMBOLS,
  ADD_TEXT_BODY_WITH_KEYPRESS,
  ADD_PARAMETERS,
  POP_PARAMETERS,
  CREATE_MINI_CARD,
  REMOVE_MINI_CARD
} from "../../action/testconfiguration/TestConfiguration";

const initialState = {
  textBody: "",
  regex: /[^=+-/.()√π<>²\d*]/gi,
  acceptedIndexes: [],
  //creation of mini cards
  cards: []
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

    case CREATE_MINI_CARD:
      console.log(action.payload.parameterAbbr);
      state.cards.push(action.payload.parameterAbbr);
      console.log(state.cards);

      return {
        ...state,
        cards: state.cards
      };

    case REMOVE_MINI_CARD:
      console.log(action.payload.parameterAbbr);
      for (let i = 0; i < state.cards.length; i++) {
        if (state.cards[i] === action.payload.parameterAbbr) {
          console.log(state.cards[i]);
          state.cards.splice(i, 1);
        }
      }
      console.log(state.cards);
      return {
        ...state,
        cards: state.cards
      };

    default:
      return state;
  }
};
