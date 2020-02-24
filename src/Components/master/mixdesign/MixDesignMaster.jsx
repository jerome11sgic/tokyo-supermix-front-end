import React, { Component } from "react";
import { FlexContainer } from "../../styledcomponents/container/FlexGrid";

import ManageMixDesign from "./mix/ManageMixDesignForm";
import MixDesignTileArea from "./MixDesignTitleArea";
import { connect } from "react-redux";

class MixDesignMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: true,
      visible: this.props.visible
    };
  }

  controlstatus = status => {
    console.log(status);
  };

  renderComponents = () => {
    if (this.props.routepath === "/mixdesignmaster") {
      return <ManageMixDesign />;
    }
  };

  render() {
    return (
      <FlexContainer leveltileareafixed>
        <MixDesignTileArea />
        {this.renderComponents()}
      </FlexContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    routepath: state.mixDesignLevelReducers.RoutingBetweenMixDesign.routepath
  };
};

const mapDispatchToProps = dispatch => {};

export default connect(mapStateToProps, mapDispatchToProps)(MixDesignMaster);
