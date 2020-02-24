import React, { Component } from "react";
import { FlexContainer } from "../../styledcomponents/container/FlexGrid";
import { globalHistory } from "@reach/router";
import ManageParameterMaster from "./ParameterMaster/ManageParameterMaster";
import ParameterTileArea from "./ParameterTileArea";
import { connect } from "react-redux";
import ManageTestParameter from "./testparameter/ManageTestParameter";
import ManageEquipmentParameter from "./equipmentparameter/ManageEquipmentParameter";
import ManageMaterialParameter from "./materialparameter/ManageMaterialParameter";
import ManageAdditionalParameter from "./additionalparameter/ManageAdditionalParameter";
class ParameterMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: true,
      visible: this.props.visible
    };
  }
  componentDidMount() {
    console.log(globalHistory.location.hash);
    let orgString = globalHistory.location.hash;
    let modString = orgString.substr(0, 8);
    console.log(modString);
  }

  controlstatus = status => {
    console.log(status);
  };

  renderComponents = () => {
    if (this.props.routepath === "/parametermaster") {
      return <ManageParameterMaster />;
    } else if (this.props.routepath === "/materialparameter") {
      return <ManageMaterialParameter />;
    } else if (this.props.routepath === "/equipmentparameter") {
      return <ManageEquipmentParameter />;
    } else if (this.props.routepath === "/additionalparameter") {
      return <ManageAdditionalParameter />;
    }
  };

  render() {
    return (
      <FlexContainer leveltileareafixed>
        <ParameterTileArea />
        {this.renderComponents()}
      </FlexContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    routepath:
      state.parameterLevelReducers.RoutingBetweenParameterLevel.routepath
  };
};

const mapDispatchToProps = dispatch => {};

export default connect(mapStateToProps, mapDispatchToProps)(ParameterMaster);
