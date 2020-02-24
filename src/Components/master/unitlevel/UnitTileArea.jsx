import React, { Component } from "react";
import { Icon } from "antd";
import BasicCard from "../../styledcomponents/card/BasicCard";
import "./styleUnit.css";
import {
  TileArea,
  TileAreaText,
  TileAreaAction
} from "../../styledcomponents/card/TileArea";

export default class UnitTileArea extends Component {
  render() {
    return (
      <TileArea>
        <BasicCard
          finalproduct
          tileareacard
          size="small"
          hoverable={true}
          //   onClick={this.statusChange1}
        >
          <TileAreaText unit>Manage Unit</TileAreaText>
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
