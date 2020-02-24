import React, { Component } from "react";

import { Icon } from "antd";

import BasicCard from "../../styledcomponents/card/BasicCard";
import { connect } from "react-redux";

import {
  TileArea,
  TileAreaText,
  TileAreaAction
} from "../../styledcomponents/card/TileArea";
import { ROUTE_TO_MIX_DESIGN } from "../../../redux/action/master/mixdesign/MixDesign";

class MixDesignTileArea extends Component {
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
          size="small"
          hoverable={true}
          onClick={this.props.routeToMixDesignMaster}
        >
          <TileAreaText>Mix Design</TileAreaText>
          <TileAreaAction>
            <Icon
              filled
              type="plus"
              style={{ color: "red", fontSize: "22px" }}
            />
          </TileAreaAction>
        </BasicCard>
      </TileArea>
    );
  }
}

// const mapStateToProps = null;

const mapDispatchToProps = dispatch => {
  return {
    routeToMixDesignMaster: () => {
      dispatch({ type: ROUTE_TO_MIX_DESIGN });
      console.log("route to mix design master click dispatched");
    }
  };
};

export default connect(null, mapDispatchToProps)(MixDesignTileArea);
