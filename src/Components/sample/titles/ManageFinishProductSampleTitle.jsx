import React, { Component } from "react";
import { FlexContainer } from "../../styledcomponents/container/FlexGrid";

import { connect } from "react-redux";

import Paragraph from "antd/lib/typography/Paragraph";
import AddFinishProduct from "../finshproduct/AddFinishProduct";
import { PrimaryButton } from "../../styledcomponents/button/button";
const style = {
  fontSize: "medium",
  fontWeight: "600",
  alignSelf: "auto",
  textAlign: "justify",
  padding: "10px",
  height: "25px",
  flexBasis: "650px"
};

class ManageFinishProductSampleTitle extends Component {
  render() {
    return (
      <FlexContainer titles leveltitles>
        <Paragraph style={style}>Manage Material Load</Paragraph>
        <PrimaryButton
          style={{
            background: "#001328",
            color: "white",
            border: "none"
          }}
          href='#/samples/viewfpstatus'
        >
          View Test
        </PrimaryButton>
        <AddFinishProduct />
      </FlexContainer>
    );
  }
}

const mapStateToProps = null;

const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageFinishProductSampleTitle);
