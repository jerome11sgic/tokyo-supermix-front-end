import React, { Component } from "react";
import { Icon } from "antd";
import BasicCard from "../styledcomponents/card/BasicCard";

import { connect } from "react-redux";
import {
  ROUTE_TO_INCOMING_SAMPLE,
  ROUTE_TO_PROCESS_SAMPLE,
  ROUTE_TO_FINISH_PRODUCT_SAMPLE,
  ROUTE_TO_MATERIAL_LOAD_SAMPLE
} from "../../redux/action/sample/Sample";
import {
  TileArea,
  TileAreaText,
  TileAreaAction
} from "../styledcomponents/card/TileArea";

class SampleTitleArea extends Component {
  render() {
    return (
      <TileArea>
        <BasicCard
          finalproduct
          tileareacard
          size='small'
          hoverable={true}
          onClick={this.props.routeToIncomingSample}
        >
          <TileAreaText unit>Incoming Sample</TileAreaText>
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
          onClick={this.props.routeToProcessSample}
        >
          <TileAreaText unit>Process Sample</TileAreaText>
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
          onClick={this.props.routeToMaterialLoadSample}
        >
          <TileAreaText unit>Material Load</TileAreaText>
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
          onClick={this.props.routeToFinishProductSample}
        >
          <TileAreaText unit>FinishProduct Sample</TileAreaText>
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

const mapStateToProps = state => {};

const mapDispatchToProps = dispatch => {
  return {
    routeToIncomingSample: () => {
      dispatch({ type: ROUTE_TO_INCOMING_SAMPLE });
      console.log("ROUTE_TO_INCOMING_SAMPLE click dispatched");
    },
    routeToProcessSample: () => {
      dispatch({ type: ROUTE_TO_PROCESS_SAMPLE });
      console.log("ROUTE_TO_PROCESS_SAMPLE click dispatched");
    },
    routeToFinishProductSample: () => {
      dispatch({ type: ROUTE_TO_FINISH_PRODUCT_SAMPLE });
      console.log("ROUTE_TO_FINISH_PRODUCT_SAMPLE click dispatched");
    },
    routeToMaterialLoadSample: () => {
      dispatch({ type: ROUTE_TO_MATERIAL_LOAD_SAMPLE });
      console.log("ROUTE_TO_MATERIAL_LOAD_SAMPLE click dispatched");
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SampleTitleArea);
