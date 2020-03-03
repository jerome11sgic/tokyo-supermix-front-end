import React, { Component } from "react";

import Paragraph from "antd/lib/typography/Paragraph";

import EmployeeAddForm from "../employee/EmployeeAddForm";
import { FlexContainer } from "../../../styledcomponents/container/FlexGrid";
import Search from "antd/lib/input/Search";

const style = {
  fontSize: "medium",
  fontWeight: "600",
  alignSelf: "auto",
  padding: "10px"
};

export default class EmployeeMasterTitle extends Component {
  getallEmployee = () => {
    this.props.reload();
  };
  render() {
    return (
      <FlexContainer titles leveltitles>
        <Paragraph style={style}>Employee </Paragraph>
        <div style={{ display: "flex" }}>
          <Search
            placeholder='Search Employee'
            onSearch={value => console.log(value)}
            style={{ width: 200, height: 30, marginRight: "50px" }}
          />
          <EmployeeAddForm reload={this.getallEmployee} />
        </div>
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
