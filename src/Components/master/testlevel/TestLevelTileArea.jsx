import React, { Component } from "react";
import { Icon } from "antd";
import BasicCard from "../../styledcomponents/card/BasicCard";

import {
  TileArea,
  TileAreaText,
  TileAreaAction
} from "../../styledcomponents/card/TileArea";

export default class TestLevelTileArea extends Component {
  statusChange1 = () => {
    console.log("equipment");
    this.props.type("equipment");
  };
  statusChange2 = () => {
    this.props.type("testlevel");
    console.log("testlevel");
  };
  render() {
    return (
      <TileArea>
        {/* <BasicCard
          finalproduct
          size="small"
          className="test_basic_card"
          hoverable={true}
            onClick={this.statusChange1}
        >
          <div className="test_text_area">Test Parameter</div>
          <div className="test_action_area">
            <Icon
              filled
              type="snippets"
              style={{ color: "red", fontSize: "22px" }}
            />
          </div>
        </BasicCard> */}
        <BasicCard
          finalproduct
          tileareacard
          size='small'
          className='test_basic_card'
          hoverable={true}
          onClick={this.statusChange2}
        >
          <TileAreaText u>Test Type</TileAreaText>
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
