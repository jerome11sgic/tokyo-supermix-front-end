import {
  TOGGLE_BETWEEN_MASTER_LEVELS,
  CHECK_WHETHER_DEFAULT_MASTER_LEVEL
} from "../../action/topbarnavigation/MasterLevelNavigation";

const initialState = {
  masterlevelkey: "plantlevel"
};

export const MasterLevelNavigationReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_BETWEEN_MASTER_LEVELS:
      return {
        ...state,
        masterlevelkey: (state.masterlevelkey = action.key)
      };

    case CHECK_WHETHER_DEFAULT_MASTER_LEVEL:
      return {
        masterlevelkey: (state.masterlevelkey = "plantlevel")
      };

    default:
      return state;
  }
};
