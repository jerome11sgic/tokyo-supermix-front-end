import React, { Component } from "react";
import { FlexContainer } from "../../../styledcomponents/container/FlexGrid";

import Paragraph from "antd/lib/typography/Paragraph";
import AddEquipment from "../equipment/AddEquipment";

const style = {
  fontSize: "medium",
  fontWeight: "600",
  alignSelf: "auto",
  padding: "10px"
};

export default class EquipmentTitle extends Component {
  getallequpiment = () => {
    this.props.reload();
  };
  render() {
    return (
      <FlexContainer titles leveltitles>
        <Paragraph style={style}>Equipment </Paragraph>
        <AddEquipment reload={this.getallequpiment} />
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
