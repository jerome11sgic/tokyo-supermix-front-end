import React, { Component } from "react";

import Paragraph from "antd/lib/typography/Paragraph";

import AddSupplierCategory from "../suppliercategory/AddSupplierCategory";
import { FlexContainer } from "../../../styledcomponents/container/FlexGrid";

const style = {
  fontSize: "medium",
  fontWeight: "600",
  alignSelf: "auto",
  padding: "10px"
};

export default class SupplierCategoryTitle extends Component {
  getallsupplireCategory = () => {
    this.props.reload();
  };
  render() {
    return (
      <FlexContainer titles leveltitles>
        <Paragraph style={style}>Supplier </Paragraph>
        <AddSupplierCategory reload={this.getallsupplireCategory} />
      </FlexContainer>
    );
  }
}
