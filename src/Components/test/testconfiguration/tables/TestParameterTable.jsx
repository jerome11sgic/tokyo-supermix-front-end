import React, { Component } from "react";
import { Checkbox } from "antd";
import { AntTable } from "../../../styledcomponents/table/AntTabl";
import { TestTitle } from "../titles/TestTitle";

const testParameterColumns = [
  {
    title: "",
    dataIndex: "testParameterId",
    key: "testParameterId"
  },
  {
    title: "",
    dataIndex: "testParameterName",
    key: "testParameterName"
  },
  {
    title: "",
    dataIndex: "testParameterCheck",
    key: "testParameterCheck",
    render: text => <Checkbox />
  }
];

const testParameterData = [
  {
    testParameterName: "Moisture",
    testParameterCheck: "checked"
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
      <div>
        <AntTable
          dataSource={testParameterData}
          size={this.state.size}
          bordered={false}
          columns={testParameterColumns}
          title={() => TestTitle("Test Parameter")}
          showHeader={false}
          style={{
            width: "400px",
            height: "200px",
            background: "white"
          }}
          pagination={false}
        />
      </div>
    );
  }
}
