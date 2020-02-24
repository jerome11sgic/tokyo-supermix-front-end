import { TOGGLE_BETWEEN_PRIVILEDGE_LEVELS } from "../../action/topbarnavigation/PrivilegeLevelNavigation";

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
    default:
      return state;
  }
};
