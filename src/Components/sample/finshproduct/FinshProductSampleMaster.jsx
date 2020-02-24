import React, { Component } from "react";
import { FlexContainer } from "../../../styledcomponents/container/FlexGrid";
import FinshTileArea from "./FinshProductTileArea";
import ManageFinshSample from "./ManageFinshProduct";

export default class FinshProductSampleMaster extends Component {
  render() {
    return (
      <FlexContainer leveltileareafixed>
        <FinshTileArea />
        <ManageFinshSample />
      </FlexContainer>
    );
  }
}
