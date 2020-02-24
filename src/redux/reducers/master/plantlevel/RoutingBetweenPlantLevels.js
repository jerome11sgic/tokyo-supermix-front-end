import {
  ROUTE_TO_PLANT_MASTER,
  ROUTE_TO_USER_ROLE_MASTER,
  ROUTE_TO_EMPLOYEE_MASTER,
  ROUTE_TO_CUSTOMER_MASTER,
  ROUTE_TO_SUPPLIER_MASTER,
  ROUTE_TO_SUPPLIER_CATEGORY_MASTER
} from "../../../action/master/plantlevel/PlantLevel";

const initialState = {
  routepath: "/plantmaster"
};

export const RoutingBetweenPlantLevel = (state = initialState, action) => {
  switch (action.type) {
    case ROUTE_TO_PLANT_MASTER:
      return {
        ...state,
        routepath: (state.routepath = "/plantmaster")
      };

    case ROUTE_TO_USER_ROLE_MASTER:
      return {
        ...state,
        routepath: (state.routepath = "/userrolemaster")
      };

    case ROUTE_TO_EMPLOYEE_MASTER:
      return {
        ...state,
        routepath: (state.routepath = "/employeemaster")
      };

    case ROUTE_TO_CUSTOMER_MASTER:
      return {
        ...state,
        routepath: (state.routepath = "/customermaster")
      };

    case ROUTE_TO_SUPPLIER_MASTER:
      return {
        ...state,
        routepath: (state.routepath = "/suppliermaster")
      };
    case ROUTE_TO_SUPPLIER_CATEGORY_MASTER:
      return {
        ...state,
        routepath: (state.routepath = "/suppliercategorymaster")
      };

    default:
      return state;
  }
};
