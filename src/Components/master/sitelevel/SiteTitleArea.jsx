import React, { Component } from "react";
import { Icon } from "antd";
import BasicCard from "../../styledcomponents/card/BasicCard";
import { connect } from "react-redux";
import {
  ROUTE_TO_POUR_MASTER,
  ROUTE_TO_PROJECT_MASTER
} from "../../../redux/action/master/sitelevel/SiteLevel";
import {
  TileArea,
  TileAreaText,
  TileAreaAction
} from "../../styledcomponents/card/TileArea";

class SiteTitleArea extends Component {
  render() {
    return (
      <TileArea>
        <BasicCard
          finalproduct
          tileareacard
          size="small"
          hoverable={true}
          onClick={this.props.routeToPourMaster}
        >
          <TileAreaText>Pour</TileAreaText>
          <TileAreaAction>
            <Icon
              filled
              type="plus"
              style={{ color: "red", fontSize: "22px" }}
            />
          </TileAreaAction>
        </BasicCard>
        <BasicCard
          finalproduct
          tileareacard
          size="small"
          hoverable={true}
          onClick={this.props.routeToProjectMaster}
        >
          <TileAreaText>Project</TileAreaText>
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

const mapStateToProps = state => {};

const mapDispatchToProps = dispatch => {
  return {
    routeToPourMaster: () => {
      dispatch({ type: ROUTE_TO_POUR_MASTER });
      console.log("ROUTE_TO_POUR_MASTER click dispatched");
    },
    routeToProjectMaster: () => {
      dispatch({ type: ROUTE_TO_PROJECT_MASTER });
      console.log("ROUTE_TO_PROJECT_MASTER click dispatched");
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SiteTitleArea);
