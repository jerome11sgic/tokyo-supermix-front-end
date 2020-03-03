import React, { Component } from "react";
import { FlexContainer } from "../../styledcomponents/container/FlexGrid";
import TestLevelTileArea from "./TestLevelTileArea";
import ManageTestType from "./testtype/ManageTestType";

export default class TestLevelMaster extends Component {
  state = {
    type: ""
  };

  typechange = type => {
    console.log(type);
    this.setState({ type: type });
  };
  render() {
    return (
      <FlexContainer leveltileareafixed>
        <TestLevelTileArea type={this.typechange} />
        <ManageTestType />
      </FlexContainer>
    );
  }
}
