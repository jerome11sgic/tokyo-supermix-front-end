import React, { Component } from "react";
import { FlexContainer } from "../../../styledcomponents/container/FlexGrid";

import Paragraph from "antd/lib/typography/Paragraph";
import AddProjectForm from "../project/AddProjectForm";

const style = {
  fontSize: "medium",
  fontWeight: "600",
  alignSelf: "auto",
  padding: "10px"
};

export default class ManageProjectMasterTitle extends Component {
  render() {
    return (
      <FlexContainer titles leveltitles>
        <Paragraph style={style}>Project </Paragraph>
        <AddProjectForm />
      </FlexContainer>
    );
  }
}
