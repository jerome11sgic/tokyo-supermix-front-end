import {
  ROUTE_TO_MAIN_CATEGORY_MASTER,
  ROUTE_TO_SUB_CATEGORY_MASTER,
  ROUTE_TO_SAMPLE_CATEGORY_MASTER,
  ROUTE_TO_MATERIAL_TYPE
} from "../../../action/master/categorylevel/CatergoryLevel";

const initialState = {
  routepath: "/materialtypemaster"
};

export const RoutingBetweenCategoryLevel = (state = initialState, action) => {
  switch (action.type) {
    case ROUTE_TO_MAIN_CATEGORY_MASTER:
      return {
        ...state,
        routepath: (state.routepath = "/maincatergorymaster")
      };

    case ROUTE_TO_SUB_CATEGORY_MASTER:
      return {
        ...state,
        routepath: (state.routepath = "/subcatergorymaster")
      };

    case ROUTE_TO_SAMPLE_CATEGORY_MASTER:
      return {
        ...state,
        routepath: (state.routepath = "/samplecatergorymaster")
      };
    case ROUTE_TO_MATERIAL_TYPE:
      return {
        ...state,
        routepath: (state.routepath = "/materialtypemaster")
      };

    default:
      return state;
  }
};
