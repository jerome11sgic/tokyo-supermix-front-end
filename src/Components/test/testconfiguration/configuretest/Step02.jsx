import React, { Component } from "react";
import { FlexContainer } from "../../../styledcomponents/container/FlexGrid";
import TestParameterTable from "../tables/TestParameterTable";
// import AddTestParameterTable from "../tables/AddTestParameterTable";

export default class Step02 extends Component {
  render() {
    return (
      <FlexContainer style={{ justifyContent: "center" }}>
        <TestParameterTable />
      </FlexContainer>
    );
  }
}
