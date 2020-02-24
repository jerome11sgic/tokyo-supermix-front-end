import React, { Component } from "react";
import { FlexContainer } from "../../styledcomponents/container/FlexGrid";
import UnitTileArea from "./UnitTileArea";

import ManageUnit from "./ManageUnit";

export default class UnitMaster extends Component {
  render() {
    return (
      <FlexContainer leveltileareafixed>
        <UnitTileArea />
        <ManageUnit />
      </FlexContainer>
    );
  }
}
