import {
  ROUTE_TO_RAW_MATERIAL_TEST_RESULTS,
  ROUTE_TO_FINISH_PRODUCT_TEST_RESULTS
} from "../../action/testresults/TestResults";

const initialState = {
  routepath: "/rawmaterial"
};

export const RoutingBetweenTestResults = (state = initialState, action) => {
  switch (action.type) {
    case ROUTE_TO_RAW_MATERIAL_TEST_RESULTS:
      return {
        ...state,
        routepath: (state.routepath = "/rawmaterial")
      };

    case ROUTE_TO_FINISH_PRODUCT_TEST_RESULTS:
      return {
        ...state,
        routepath: (state.routepath = "/finishproduct")
      };

    default:
      return state;
  }
};
