import React, { Component } from "react";
import { FlexContainer } from "../../../styledcomponents/container/FlexGrid";

import Paragraph from "antd/lib/typography/Paragraph";
import MaterialMasterAddForm from "../materialMaster/MaterialMasterAddForm";

const style = {
  fontSize: "medium",
  fontWeight: "600",
  alignSelf: "auto",
  padding: "10px"
};

export default class MaterialMasterTitle extends Component {
  render() {
    return (
      <FlexContainer titles leveltitles>
        <Paragraph style={style}>Materials</Paragraph>
        <MaterialMasterAddForm reload={this.props.reload} />
      </FlexContainer>
    );
  }
}

// const mapStateToProps = state => {};

// const mapDispatchToProps = dispatch => {
//   return {
//     showAddEmployeeDrawer: () => {
//       dispatch({ type: OPEN_ADD_NEW_EMPLOYEE_DRAWER });
//       console.log("add new employee click dispatched");
//     }
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(EmployeeMasterTitle);
