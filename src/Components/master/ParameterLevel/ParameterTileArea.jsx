import React, { Component } from "react";

import { Icon } from "antd";

import BasicCard from "../../styledcomponents/card/BasicCard";
import { connect } from "react-redux";
import {
  ROUTE_TO_PARAMETER_MASTER,
  ROUTE_TO_MATERIAL_PARAMETER_MASTER,
  ROUTE_TO_EQUIPMENT_PARAMETER_MASTER,
  ROUTE_TO_TEST_PARAMETER_MASTER,
  ROUTE_TO_ADDITIONAL_PARAMETER_MASTER
} from "../../../redux/action/master/parameter/ParameterLevel";
import {
  TileArea,
  TileAreaText,
  TileAreaAction
} from "../../styledcomponents/card/TileArea";

class ParameterTileArea extends Component {
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
          onClick={this.props.routeToParameterMaster}
        >
          <TileAreaText>Parameter </TileAreaText>
          <TileAreaAction>
            <Icon
              filled
              type="plus"
              style={{ color: "red", fontSize: "22px" }}
            />
          </TileAreaAction>
        </BasicCard>

        {/* <BasicCard
          finalproduct
          tileareacard
          size='small'
          hoverable={true}
          onClick={this.props.routeToMaterialParameterMaster}
        >
          <TileAreaText unit>Material Parameter</TileAreaText>
          <TileAreaAction>
            <Icon
              filled
              type='plus'
              style={{ color: "red", fontSize: "22px" }}
            />
          </TileAreaAction>
        </BasicCard> */}

        {/* <BasicCard
          finalproduct
          tileareacard
          size='small'
          hoverable={true}
          onClick={this.props.routeToEquipmentParameterMaster}
        >
          <TileAreaText unit>Equipment Parameter</TileAreaText>
          <TileAreaAction>
            <Icon
              filled
              type='plus'
              style={{ color: "red", fontSize: "22px" }}
            />
          </TileAreaAction>
        </BasicCard> */}

        {/* <BasicCard
          finalproduct
          tileareacard
          size="small"
          className="parameter_basic_card"
          hoverable={true}
          onClick={this.props.routeToTestParameterMaster}
        >
          <TileAreaText unit>Test Parameter</TileAreaText>
          <TileAreaAction>
            <Icon
              filled
              type="plus"
              style={{ color: "red", fontSize: "22px" }}
            />
          </TileAreaAction>
        </BasicCard> */}

        {/* <BasicCard
          finalproduct
          tileareacard
          size="small"
          className="parameter_basic_card"
          hoverable={true}
          onClick={this.props.routeToAdditionalParameterMaster}
        >
          <TileAreaText unit>Additional Parameter</TileAreaText>
          <TileAreaAction>
            <Icon
              filled
              type="plus"
              style={{ color: "red", fontSize: "22px" }}
            />
          </TileAreaAction>
        </BasicCard> */}
      </TileArea>
    );
  }
}

// const mapStateToProps = null;

const mapDispatchToProps = dispatch => {
  return {
    routeToParameterMaster: () => {
      dispatch({ type: ROUTE_TO_PARAMETER_MASTER });
      console.log("route to parameter master click dispatched");
    },
    routeToMaterialParameterMaster: () => {
      dispatch({ type: ROUTE_TO_MATERIAL_PARAMETER_MASTER });
      console.log("route to material parameter click dispatched");
    },
    routeToEquipmentParameterMaster: () => {
      dispatch({ type: ROUTE_TO_EQUIPMENT_PARAMETER_MASTER });
      console.log("route to equipment parameter click dispatched");
    },
    routeToTestParameterMaster: () => {
      dispatch({ type: ROUTE_TO_TEST_PARAMETER_MASTER });
      console.log("route to test parameter click dispatched");
    },
    routeToAdditionalParameterMaster: () => {
      dispatch({ type: ROUTE_TO_ADDITIONAL_PARAMETER_MASTER });
      console.log("route to additional parameter click dispatched");
    }
  };
};

export default connect(null, mapDispatchToProps)(ParameterTileArea);
