import React, { Component } from "react";
import { Checkbox } from "antd";
import { AntTable } from "../../../styledcomponents/table/AntTabl";
import { TestTitle } from "../titles/TestTitle";
import {
  ADD_PARAMETERS,
  POP_PARAMETERS
} from "../../../../redux/action/testconfiguration/TestConfiguration";
import { connect } from "react-redux";
import theme from "../../../../theme";

class TestParameterTable extends Component {
  state = {
    size: "small",
    testParameterData: [
      {
        testId: 1,
        testName: "Moisture",
        parameterName: "Cement",
        unitName: "A"
      },
      {
        testId: 2,
        testName: "Concrete Test",
        parameterName: "Concrete",
        unitName: "B"
      }
    ]
  };
  componentWillMount() {
    if (window.screen.width > 1900) {
      console.log("hooray");
      this.setState({
        size: "large"
      });
    } else if (window.screen.width < 1440) {
      this.setState({
        size: "small"
      });
    }
  }
  render() {
    const testParameterColumns = [
      {
        title: "Test Name",
        dataIndex: "testName",
        key: "testName"
      },
      {
        title: "Parameter",
        dataIndex: "parameterName",
        key: "parameterName"
      },
      {
        title: "Unit",
        dataIndex: "unitName",
        key: "unitName"
      },
      {
        title: "Relevant",
        dataIndex: "action",
        key: "action",
        render: (text, record = this.state.testParameterData) => <Checkbox />
      }
    ];
    return (
      <AntTable
        dataSource={this.state.testParameterData}
        size={this.state.size}
        bordered={false}
        columns={testParameterColumns}
        title={() => (
          <div
            style={{
              background: theme.colors.primary,
              color: "white",
              height: "40px",
              fontSize: "16px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              margin: "-10px",
              borderTopLeftRadius: "15px",
              borderTopRightRadius: "15px"
            }}
          >
            Test Parameter
          </div>
        )}
        showHeader={true}
        pagination={{ defaultPageSize: 6 }}
        style={{
          height: "auto",
          width: "50%"
        }}
      />
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     textBody:
//       state.testConfigurationReducers.equationConfigurationReducer.textBody
//   };
// };

const mapDispatchToProps = dispatch => {
  return {
    // selectParameters: (record, event) => {
    //   console.log(event.target.checked);
    //   if (event.target.checked === true) {
    //     dispatch({ type: ADD_PARAMETERS, payload: record.unitName });
    //     console.log("record pushed " + record.unitName);
    //   }
    //   if (event.target.checked === false) {
    //     dispatch({ type: POP_PARAMETERS, payload: record.unitName });
    //     console.log("record spliced " + record.unitName);
    //   }
    // }
  };
};
export default connect(null, mapDispatchToProps)(TestParameterTable);
