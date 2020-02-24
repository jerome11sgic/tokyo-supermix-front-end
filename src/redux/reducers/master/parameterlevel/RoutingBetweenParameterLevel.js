import {
  ROUTE_TO_PARAMETER_MASTER,
  ROUTE_TO_MATERIAL_PARAMETER_MASTER,
  ROUTE_TO_EQUIPMENT_PARAMETER_MASTER,
  ROUTE_TO_TEST_PARAMETER_MASTER,
  ROUTE_TO_ADDITIONAL_PARAMETER_MASTER
} from "../../../action/master/parameter/ParameterLevel";

const initialState = {
  routepath: "/parametermaster"
};

export const RoutingBetweenParameterLevel = (state = initialState, action) => {
  switch (action.type) {
    case ROUTE_TO_PARAMETER_MASTER:
      return {
        ...state,
        routepath: (state.routepath = "/parametermaster")
      };

    case ROUTE_TO_MATERIAL_PARAMETER_MASTER:
      return {
        ...state,
        routepath: (state.routepath = "/materialparameter")
      };

    case ROUTE_TO_EQUIPMENT_PARAMETER_MASTER:
      return {
        ...state,
        routepath: (state.routepath = "/equipmentparameter")
      };

    case ROUTE_TO_TEST_PARAMETER_MASTER:
      return {
        ...state,
        routepath: (state.routepath = "/testparameter")
      };

    case ROUTE_TO_ADDITIONAL_PARAMETER_MASTER:
      return {
        ...state,
        routepath: (state.routepath = "/additionalparameter")
      };

    default:
      return state;
  }
};
