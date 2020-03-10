import React, { Component } from "react";

import Paragraph from "antd/lib/typography/Paragraph";

import SupplierAddForm from "../supplier/SupplierAddForm";
import { FlexContainer } from "../../../styledcomponents/container/FlexGrid";
import { Input } from "antd";
import theme from "../../../../theme";
const { Search } = Input;

const style = {
  fontSize: "medium",
  fontWeight: "600",
  alignSelf: "auto",
  padding: "10px"
};

export default class SupplierMasterTitle extends Component {
  getallSupplier = () => {
    this.props.reload();
  };
  render() {
    return (
      <FlexContainer titles leveltitles>
        <Paragraph style={style}>Supplier </Paragraph>
        <div style={{ display: "flex" }}>
          <Search
            placeholder="Search Supplier"
            onSearch={value => console.log(value)}
            style={{ width: 200, height: 30, marginRight: "50px" }}
          />
          <SupplierAddForm reload={this.getallSupplier} />
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
