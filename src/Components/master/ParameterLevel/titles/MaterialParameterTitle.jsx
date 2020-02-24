import React, { Component } from "react";
import { FlexContainer } from "../../../styledcomponents/container/FlexGrid";

import Paragraph from "antd/lib/typography/Paragraph";
import AddMaterialParameter from "../materialparameter/AddMaterialParameter";

const style = {
  fontSize: "medium",
  fontWeight: "600",
  alignSelf: "auto",
  padding: "10px"
};

export default class MaterialParameterTitle extends Component {
  render() {
    return (
      <FlexContainer titles leveltitles>
        <Paragraph style={style}>Material Parameter Master</Paragraph>
        <AddMaterialParameter/>
      </FlexContainer>
    );
  }
}

