import {
  TRIGGER_EQUATIONS_AREA,
  TRIGGER_BACK_EQUATIONS_AREA
} from "../../action/testconfiguration/TestConfiguration";

const initialState = {
  visible: true,
  icon: "+",
  togglable: "yes"
};

export const TriggerEquationAreaReducer = (state = initialState, action) => {
  switch (action.type) {
    case TRIGGER_EQUATIONS_AREA:
      return {
        ...state,
        visible: (state.visible = true),
        icon: (state.icon = "-"),
        togglable: (state.togglerValue = "no")
      };
    case TRIGGER_BACK_EQUATIONS_AREA:
      return {
        ...state,
        visible: (state.visible = false),
        icon: (state.icon = "+"),
        togglable: (state.togglerValue = "yes")
      };

    default:
      return state;
  }
};
