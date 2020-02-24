import {
  ROUTE_TO_POUR_MASTER,
  ROUTE_TO_PROJECT_MASTER
} from "../../../action/master/sitelevel/SiteLevel";

const initialState = {
  routepath: "/projectmaster"
};

export const RoutingBetweenSiteLevel = (state = initialState, action) => {
  switch (action.type) {
    case ROUTE_TO_POUR_MASTER:
      return {
        ...state,
        routepath: (state.routepath = "/pourmaster")
      };

    case ROUTE_TO_PROJECT_MASTER:
      return {
        ...state,
        routepath: (state.routepath = "/projectmaster")
      };

    default:
      return state;
  }
};
