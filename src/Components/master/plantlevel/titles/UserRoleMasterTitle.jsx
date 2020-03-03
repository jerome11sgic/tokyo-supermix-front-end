import React, { Component } from "react";

import Paragraph from "antd/lib/typography/Paragraph";

import UserRoleAddForm from "../userrole/UserRoleAddForm";
import { FlexContainer } from "../../../styledcomponents/container/FlexGrid";

const style = {
  fontSize: "medium",
  fontWeight: "600",
  alignSelf: "auto",
  padding: "10px"
};

export default class UserRoleMasterTitle extends Component {
  getalldesignation = () => {
    this.props.reload();
  };
  render() {
    return (
      <FlexContainer titles leveltitles>
        <Paragraph style={style}>Designation </Paragraph>
        <UserRoleAddForm reloadrole={this.getalldesignation} />
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
