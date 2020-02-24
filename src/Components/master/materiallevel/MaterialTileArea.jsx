import React, { Component } from "react";
import { Icon } from "antd";
import BasicCard from "../../styledcomponents/card/BasicCard";

import {
  TileArea,
  TileAreaText,
  TileAreaAction
} from "../../styledcomponents/card/TileArea";

export default class MaterialTileArea extends Component {
  statusChange1 = () => {
    console.log("type");
    this.props.type("type");
    // this.setState({:"supplier"});
  };
  statusChange2 = () => {
    this.props.type("nature");
    console.log("nature");
    // this.setState({type:"customer"})
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
          <TileAreaText unit>Material State</TileAreaText>
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
          <TileAreaText>Materials</TileAreaText>
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
