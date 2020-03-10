import React, { Component } from "react";

import Paragraph from "antd/lib/typography/Paragraph";

import CustomerAddForm from "../customer/CustomerAddForm";
import { FlexContainer } from "../../../styledcomponents/container/FlexGrid";

const style = {
  fontSize: "medium",
  fontWeight: "600",
  alignSelf: "auto",
  padding: "10px"
};

export default class CustomerMasterTitle extends Component {
  render() {
    return (
      <FlexContainer titles leveltitles>
        <Paragraph style={style}>Customer </Paragraph>
        <CustomerAddForm reload={this.props.reload} />
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
