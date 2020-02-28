import React, { Component } from "react";
import { FlexContainer } from "../../styledcomponents/container/FlexGrid";

import { connect } from "react-redux";

import Paragraph from "antd/lib/typography/Paragraph";
import AddIncoming from "../incoming/AddIncoming";
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

class ManageIncomingSampleTitle extends Component {
  render() {
    return (
      <FlexContainer titles leveltitles>
        <Paragraph style={style}> Incoming Sample</Paragraph>
        <PrimaryButton
          style={{
            background: "#001328",
            color: "white",
            border: "none"
          }}
          href="#/samples/viewincomingstatus"
        >
          View Test
        </PrimaryButton>
        <AddIncoming reload={this.props.reload} />
      </FlexContainer>
    );
  }
}

const mapStateToProps = null;

const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageIncomingSampleTitle);
