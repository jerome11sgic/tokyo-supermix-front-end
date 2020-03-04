import {
  TOGGLE_BETWEEN_PRIVILEDGE_LEVELS,
  CHECK_WHETHER_DEFAULT_PRIVILEDGE_LEVEL
} from "../../action/topbarnavigation/PrivilegeLevelNavigation";

const initialState = {
  priviledgekeys: "priviledges"
};

export const PriviledgeLevelNavigationReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case TOGGLE_BETWEEN_PRIVILEDGE_LEVELS:
      return {
        ...state,
        priviledgekeys: (state.priviledgekeys = action.key)
      };
    case CHECK_WHETHER_DEFAULT_PRIVILEDGE_LEVEL:
      return {
        priviledgekeys: (state.priviledgekeys = "priviledges")
      };
    default:
      return state;
  }
};
