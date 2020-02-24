import {
  TOGGLE_TO_MASTER_TYPE_NAVIGATION,
  TOGGLE_TO_HOME_SCREEN_NAVIGATION,
  TOGGLE_TO_SAMPLE_TYPE_NAVIGATION,
  TOGGLE_TO_TEST_TRIALS_NAVIGATION,
  TOGGLE_TO_TEST_CONFIGURATION_NAVIGATION,
  TOGGLE_TO_PRIVILEDGES_NAVIGATION,
  TOGGLE_TO_TEST_RESULTS_NAVIGATION,
  TOGGLE_TO_DASHBOARD_NAVIGATION
} from "../../action/topbarnavigation/TopbarNavigation";

const initialState = {
  navpath: "/homescreen"
};

export const TopbarNavigationReducer = (state = initialState, action) => {
  switch (action.type) {
    //   localStorage.setItem("state",true);

    //   localStorage.getItem("state")
    case TOGGLE_TO_MASTER_TYPE_NAVIGATION:
      return {
        ...state,
        navpath: (state.navpath = "/master")
      };
    case TOGGLE_TO_HOME_SCREEN_NAVIGATION:
      return {
        ...state,
        navpath: (state.navpath = "/homescreen")
      };
    case TOGGLE_TO_SAMPLE_TYPE_NAVIGATION:
      return {
        ...state,
        navpath: (state.navpath = "/samples")
      };

    case TOGGLE_TO_TEST_TRIALS_NAVIGATION:
      return {
        ...state,
        navpath: (state.navpath = "/testtrials")
      };

    case TOGGLE_TO_TEST_CONFIGURATION_NAVIGATION:
      return {
        ...state,
        navpath: (state.navpath = "/testconfiguration")
      };

    case TOGGLE_TO_PRIVILEDGES_NAVIGATION:
      return {
        ...state,
        navpath: (state.navpath = "/priviledges")
      };
    case TOGGLE_TO_TEST_RESULTS_NAVIGATION:
      return {
        ...state,
        navpath: (state.navpath = "/testresults")
      };
    case TOGGLE_TO_DASHBOARD_NAVIGATION:
      return {
        ...state,
        navpath: (state.navpath = "/dashboard")
      };
    default:
      return state;
  }
};
