import {
  ROUTE_TO_INCOMING_SAMPLE,
  ROUTE_TO_PROCESS_SAMPLE,
  ROUTE_TO_FINISH_PRODUCT_SAMPLE
} from "../../action/sample/Sample";

const initialState = {
  routepath: "/incomingsample"
};

export const RoutingBetweenSamples = (state = initialState, action) => {
  switch (action.type) {
    case ROUTE_TO_INCOMING_SAMPLE:
      return {
        ...state,
        routepath: (state.routepath = "/incomingsample")
      };

    case ROUTE_TO_PROCESS_SAMPLE:
      return {
        ...state,
        routepath: (state.routepath = "/processsample")
      };

    case ROUTE_TO_FINISH_PRODUCT_SAMPLE:
      return {
        ...state,
        routepath: (state.routepath = "/finishproductsample")
      };

    default:
      return state;
  }
};
