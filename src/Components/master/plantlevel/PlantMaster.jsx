import React, { Component } from "react";
import {} from "antd";
import { globalHistory } from "@reach/router";
import PlantsTileArea from "./PlantsTileArea";
import { connect } from "react-redux";
import { FlexContainer } from "../../styledcomponents/container/FlexGrid";
import ManagePlants from "./plant/ManagePlants";
import ManageQCStaff from "./employee/ManageQCStaff";
import ManageCustomer from "./customer/ManageCustomer";
import ManageSupplier from "./supplier/ManageSupplier";
import ManageUserRoles from "./userrole/ManageUserRoles";
import ManageSupplierCategory from "./suppliercategory/ManageSupplierCategory";
import { CHECK_WHETHER_DEFAULT_MASTER_LEVEL } from "../../../redux/action/topbarnavigation/MasterLevelNavigation";

class PlantMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: true,
      visible: this.props.visible
    };
  }

  componentDidMount() {
    if (this.props.masterkeys === "plantlevel") {
      console.log("out passed");
    } else {
      this.props.navigationRefresh();
    }
  }

  controlstatus = status => {
    console.log(status);
  };

  renderComponents = () => {
    if (this.props.routepath === "/plantmaster") {
      return <ManagePlants />;
    } else if (this.props.routepath === "/userrolemaster") {
      return <ManageUserRoles />;
    } else if (this.props.routepath === "/employeemaster") {
      return <ManageQCStaff />;
    } else if (this.props.routepath === "/customermaster") {
      return <ManageCustomer />;
    } else if (this.props.routepath === "/suppliermaster") {
      return <ManageSupplier />;
    } else if (this.props.routepath === "/suppliercategorymaster") {
      return <ManageSupplierCategory />;
    }
  };

  render() {
    return (
      <FlexContainer leveltileareafixed>
        <PlantsTileArea />

        {this.renderComponents()}
      </FlexContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    routepath: state.plantLevelReducers.RoutingBetweenPlantLevel.routepath,
    masterkeys: state.masterLevelNavigationReducer.masterlevelkey
  };
};

const mapDispatchToProps = dispatch => {
  return {
    navigationRefresh: () => {
      dispatch({ type: CHECK_WHETHER_DEFAULT_MASTER_LEVEL });
      console.log("check default master key while master clicked");
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlantMaster);
