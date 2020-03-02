import React, { Component } from "react";
import { FlexContainer } from "../styledcomponents/container/FlexGrid";

import SampleTitleArea from "./SampleTileArea";
import { connect } from "react-redux";

import ManageProcessSample from "./process/ManageProcessSample";
import ManageFinishProduct from "./finshproduct/ManageFinishProduct";

import ManageIncoming from "./incoming/ManageIncoming";
import ManageMaterialLoad from "./materialload/ManagematerialLoad";

class SampleMaster extends Component {
  renderComponents = () => {
    if (this.props.routepath === "/incomingsample") {
      return <ManageIncoming />;
    } else if (this.props.routepath === "/processsample") {
      return <ManageProcessSample />;
    } else if (this.props.routepath === "/finishproductsample") {
      return <ManageFinishProduct />;
    } else if (this.props.routepath === "/materialload") {
      return <ManageMaterialLoad />;
    }
  };
  render() {
    return (
      <FlexContainer leveltileareafixed>
        <SampleTitleArea />
        {this.renderComponents()}
      </FlexContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    routepath: state.samplesReducers.RoutingBetweenSamples.routepath
  };
};

const mapDispatchToProps = dispatch => {};

export default connect(mapStateToProps, mapDispatchToProps)(SampleMaster);
