import React, { Component } from "react";
import { FlexContainer } from "../../../styledcomponents/container/FlexGrid";

import Paragraph from "antd/lib/typography/Paragraph";
import AddCalibrationForm from "../calibration/AddCalibrationForm";

const style = {
  fontSize: "medium",
  fontWeight: "600",
  alignSelf: "auto",
  padding: "10px"
};

export default class CalibrationTitle extends Component {
  render() {
    return (
      <FlexContainer titles leveltitles>
        <Paragraph style={style}>Equipment Calibration Master</Paragraph>
        <AddCalibrationForm reload={this.props.reload} />
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
