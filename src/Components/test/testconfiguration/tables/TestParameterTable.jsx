import React, { Component } from "react";
import { Checkbox } from "antd";
import { AntTable } from "../../../styledcomponents/table/AntTabl";
import { TestTitle } from "../titles/TestTitle";

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
    dataIndex: "relevant",
    key: "relevant",
    render: text => <Checkbox />
  }
];

const testParameterData = [
  {
    testName: "Moisture",
    parameterName: "Cement",
    unitName: "A"
  },
  {
    testName: "Concrete Test",
    parameterName: "Concrete",
    unitName: "B"
  }
];
export default class TestParameterTable extends Component {
  state = {
    size: "small"
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
    return (
      <AntTable
        maxlength
        dataSource={testParameterData}
        size={this.state.size}
        bordered={false}
        columns={testParameterColumns}
        // title={() => <h3 style={{ height: "10px" }}>Test Parameter</h3>}
        showHeader={true}
        pagination={{ defaultPageSize: 6 }}
        style={{
          height: "200px"
        }}
      />
    );
  }
}
