import React, { Component } from "react";
import { FlexContainer } from "../../styledcomponents/container/FlexGrid";

import { connect } from "react-redux";

import TestResultsTileArea from "./TestResultsTileArea";
import ManageRawMaterial from "./rawmaterial/ManageRawMaterial";
import ManageFinishProduct from "./finishproduct/ManageFinishProduct";

class TestResultsMaster extends Component {
  renderComponents = () => {
    if (this.props.routepath === "/rawmaterial") {
      return <ManageRawMaterial />;
    } else if (this.props.routepath === "/finishproduct") {
      return <ManageFinishProduct />;
    }
  };
  render() {
    return (
      <FlexContainer leveltileareafixed>
        <TestResultsTileArea />
        {this.renderComponents()}
      </FlexContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    routepath: state.testResultsReducers.RoutingBetweenTestResults.routepath
  };
};

const mapDispatchToProps = dispatch => null;

export default connect(mapStateToProps, mapDispatchToProps)(TestResultsMaster);
