import React, { Component } from "react";
import { FlexContainer } from "../../../styledcomponents/container/FlexGrid";

import Paragraph from "antd/lib/typography/Paragraph";
import AdditionalParameter from "../additionalparameter/AdditionalParameter"
const style = {
  fontSize: "medium",
  fontWeight: "600",
  alignSelf: "auto",
  padding: "10px"
};

export default class AdditionalParameterTitle extends Component {
  render() {
    return (
      <FlexContainer titles leveltitles>
        <Paragraph style={style}>Additional Parameter Master</Paragraph>
        <AdditionalParameter/>

      </FlexContainer>
    );
  }
}

