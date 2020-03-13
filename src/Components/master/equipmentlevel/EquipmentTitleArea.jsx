import React, { Component } from "react";
import { Icon } from "antd";
import BasicCard from "../../styledcomponents/card/BasicCard";
import "./styleEquipment.css";
import {
  TileArea,
  TileAreaText,
  TileAreaAction
} from "../../styledcomponents/card/TileArea";

export default class EquipmentTitleArea extends Component {
  statusChange1 = () => {
    console.log("equipment");
    this.props.type("equipment");
  };
  statusChange2 = () => {
    this.props.type("calibration");
    console.log("calibration");
  };
  statusChange3 = () => {
    this.props.type("equipmentplant");
    console.log("equipmentplant");
  };
  render() {
    return (
      <TileArea>
        <BasicCard
          finalproduct
          tileareacard
          size='small'
          hoverable={true}
          onClick={this.statusChange1}
        >
          <TileAreaText testreport>Equipment</TileAreaText>
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
          onClick={this.statusChange3}
        >
          <TileAreaText testreport>Plant Equipment</TileAreaText>
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
          onClick={this.statusChange2}
        >
          <TileAreaText testreport unit>
            Plant Equipment Calibration
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
