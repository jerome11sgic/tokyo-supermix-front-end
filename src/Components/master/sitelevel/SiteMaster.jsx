import React, { Component } from "react";
import { FlexContainer } from "../../styledcomponents/container/FlexGrid";

import SiteTitleArea from "./SiteTitleArea";
import { connect } from "react-redux";
import ManageProject from "../sitelevel/project/ManageProject";
import ManagePour from "../sitelevel/pour/ManagePour"

class SiteMaster extends Component {
  renderComponents = () => {
    if (this.props.routepath === "/pourmaster") {
      return <ManagePour/>;
    } else if (this.props.routepath === "/projectmaster") {
      return <ManageProject />;
    }
  };
  render() {
    return (
      <FlexContainer leveltileareafixed>
        <SiteTitleArea />
        {this.renderComponents()}
      </FlexContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    routepath: state.siteLevelReducers.RoutingBetweenSiteLevel.routepath
  };
};

const mapDispatchToProps = dispatch => {};

export default connect(mapStateToProps, mapDispatchToProps)(SiteMaster);
