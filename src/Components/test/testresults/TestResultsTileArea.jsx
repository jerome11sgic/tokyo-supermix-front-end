import React, { Component } from "react";
import { Icon } from "antd";
import BasicCard from "../../styledcomponents/card/BasicCard";

import { connect } from "react-redux";

import {
  TileArea,
  TileAreaText,
  TileAreaAction
} from "../../styledcomponents/card/TileArea";
import {
  ROUTE_TO_RAW_MATERIAL_TEST_RESULTS,
  ROUTE_TO_FINISH_PRODUCT_TEST_RESULTS
} from "../../../redux/action/testresults/TestResults";

class TestResultsTileArea extends Component {
  render() {
    return (
      <TileArea>
        <BasicCard
          finalproduct
          tileareacard
          size='medium'
          hoverable={true}
          onClick={this.props.routeToRawMaterialTestResults}
        >
          <TileAreaText unit testreport>
            Raw Material Test Result
          </TileAreaText>
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
          onClick={this.props.routeToFinishProductTestResults}
        >
          <TileAreaText unit testreport>
            Finish Product Test Result
          </TileAreaText>
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

const mapStateToProps = state => null;

const mapDispatchToProps = dispatch => {
  return {
    routeToRawMaterialTestResults: () => {
      dispatch({ type: ROUTE_TO_RAW_MATERIAL_TEST_RESULTS });
      console.log("toggled to raw material results screen");
    },
    routeToFinishProductTestResults: () => {
      dispatch({ type: ROUTE_TO_FINISH_PRODUCT_TEST_RESULTS });
      console.log("toggled to finish product results screen");
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestResultsTileArea);
