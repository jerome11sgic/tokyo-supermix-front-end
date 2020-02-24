import {
  TOGGLE_FINISH_PRODUCT_DRAWER,
  CLOSE_FINISH_PRODUCT_DRAWER
} from "../../action/testresults/TestResults";

const initialState = {
  FPvisible: false
};

export const ToggleFilterDrawers = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FINISH_PRODUCT_DRAWER:
      return {
        ...state,
        FPvisible: (state.FPvisible = true)
      };

    case CLOSE_FINISH_PRODUCT_DRAWER:
      return {
        ...state,
        FPvisible: (state.FPvisible = false)
      };

    default:
      return state;
  }
};
