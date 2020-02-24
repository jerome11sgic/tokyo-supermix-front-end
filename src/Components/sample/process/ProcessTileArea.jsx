import React, { Component } from "react";
import { Icon } from "antd";
import BasicCard from "../../../styledcomponents/card/BasicCard";
import {
  TileArea,
  TileAreaAction,
  TileAreaText
} from "../../styledcomponents/card/TileArea";

export default class ProcessTileArea extends Component {
  render() {
    return (
      <TileArea>
        <BasicCard
          finalproduct
          size='small'
          hoverable={true}
          //   onClick={this.statusChange1}
        >
          <TileAreaText>Add Sample</TileAreaText>
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
          size='small'
          hoverable={true}
          //   onClick={this.statusChange2}
        >
          <TileAreaText> Import From Excel</TileAreaText>
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
