import React, { Component } from "react";
import { FlexContainer } from "../../../styledcomponents/container/FlexGrid";
import AddTestParameter from "../testparameter/AddTestParameter"

import Paragraph from "antd/lib/typography/Paragraph";

const style = {
  fontSize: "medium",
  fontWeight: "600",
  alignSelf: "auto",
  padding: "10px"
};

export default class TestParameterTitle extends Component {
  render() {
    return (
      <FlexContainer titles leveltitles>
        <Paragraph style={style}>Test Parameter Master</Paragraph>
        <AddTestParameter/>
      </FlexContainer>
    );
  }
}

