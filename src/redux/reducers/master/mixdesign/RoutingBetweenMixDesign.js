import { ROUTE_TO_MIX_DESIGN } from "../../../action/master/mixdesign/MixDesign";

const initialState = {
  routepath: "/mixdesignmaster"
};

export const RoutingBetweenMixDesign = (state = initialState, action) => {
  switch (action.type) {
    case ROUTE_TO_MIX_DESIGN:
      return {
        ...state,
        routepath: (state.routepath = "/mixdesignmaster")
      };

    default:
      return state;
  }
};
