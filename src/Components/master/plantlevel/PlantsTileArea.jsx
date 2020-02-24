import React, { Component } from "react";
import { Icon } from "antd";
import BasicCard from "../../styledcomponents/card/BasicCard";
import { connect } from "react-redux";
import {
  ROUTE_TO_USER_ROLE_MASTER,
  ROUTE_TO_PLANT_MASTER,
  ROUTE_TO_EMPLOYEE_MASTER,
  ROUTE_TO_CUSTOMER_MASTER,
  ROUTE_TO_SUPPLIER_MASTER,
  ROUTE_TO_SUPPLIER_CATEGORY_MASTER
} from "../../../redux/action/master/plantlevel/PlantLevel";
import {
  TileArea,
  TileAreaText,
  TileAreaAction
} from "../../styledcomponents/card/TileArea";

class PlantsTileArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: true
    };
  }

  render() {
    return (
      <TileArea>
        <BasicCard
          finalproduct
          tileareacard
          size='small'
          hoverable={true}
          onClick={this.props.routeToPlantMaster}
        >
          <TileAreaText>Plant</TileAreaText>
          <TileAreaAction>
            <Icon
              filled
              type='plus'
              style={{ color: "red", fontSize: "22px" }}
            />
          </TileAreaAction>
        </BasicCard>
        <BasicCard
          finalproduct
          tileareacard
          size='small'
          hoverable={true}
          onClick={this.props.routeToUserRoleMaster}
        >
          <TileAreaText>Designation</TileAreaText>
          <TileAreaAction>
            <Icon
              filled
              type='plus'
              style={{ color: "red", fontSize: "22px" }}
            />
          </TileAreaAction>
        </BasicCard>
        <BasicCard
          finalproduct
          tileareacard
          size='small'
          hoverable={true}
          onClick={this.props.routeToEmployeeMaster}
        >
          <TileAreaText>Employee</TileAreaText>
          <TileAreaAction>
            <Icon
              filled
              type='plus'
              style={{ color: "red", fontSize: "22px" }}
            />
          </TileAreaAction>
        </BasicCard>

        <BasicCard
          finalproduct
          tileareacard
          size='small'
          hoverable={true}
          onClick={this.props.routeToCustomerMaster}
        >
          <TileAreaText>Customer</TileAreaText>
          <TileAreaAction>
            <Icon
              filled
              type='plus'
              style={{ color: "red", fontSize: "22px" }}
            />
          </TileAreaAction>
        </BasicCard>

        <BasicCard
          finalproduct
          tileareacard
          size='small'
          hoverable={true}
          onClick={this.props.routeToSupplierCategoryMaster}
        >
          <TileAreaText unit>Supplier Category</TileAreaText>
          <TileAreaAction>
            <Icon
              filled
              type='plus'
              style={{ color: "red", fontSize: "22px" }}
            />
          </TileAreaAction>
        </BasicCard>

        <BasicCard
          finalproduct
          tileareacard
          size='small'
          hoverable={true}
          onClick={this.props.routeToSupplierMaster}
        >
          <TileAreaText>Supplier</TileAreaText>
          <TileAreaAction>
            <Icon
              filled
              type='plus'
              style={{ color: "red", fontSize: "22px" }}
            />
          </TileAreaAction>
        </BasicCard>
      </TileArea>
    );
  }
}

// const mapStateToProps = state => {};

const mapDispatchToProps = dispatch => {
  return {
    routeToPlantMaster: () => {
      dispatch({ type: ROUTE_TO_PLANT_MASTER });
      console.log("route to plant master click dispatched");
    },
    routeToUserRoleMaster: () => {
      dispatch({ type: ROUTE_TO_USER_ROLE_MASTER });
      console.log("route to user role master click dispatched");
    },
    routeToEmployeeMaster: () => {
      dispatch({ type: ROUTE_TO_EMPLOYEE_MASTER });
      console.log("route to employee master click dispatched");
    },
    routeToCustomerMaster: () => {
      dispatch({ type: ROUTE_TO_CUSTOMER_MASTER });
      console.log("route to customer master click dispatched");
    },
    routeToSupplierMaster: () => {
      dispatch({ type: ROUTE_TO_SUPPLIER_MASTER });
      console.log("route to supplier master click dispatched");
    },
    routeToSupplierCategoryMaster: () => {
      dispatch({ type: ROUTE_TO_SUPPLIER_CATEGORY_MASTER });
      console.log("route to supplier category master click dispatched");
    }
  };
};

export default connect(null, mapDispatchToProps)(PlantsTileArea);
