import React, { Component } from "react";
import { Checkbox } from "antd";
import { AntTable } from "../../../styledcomponents/table/AntTabl";
import { TestTitle } from "../titles/TestTitle";

const additionalParameterColumns = [
  {
    title: "",
    dataIndex: "additionalParameterId",
    key: "additionalParameterId"
  },
  {
    title: "",
    dataIndex: "additionalParameterName",
    key: "additionalParameterName"
  },
  {
    title: "",
    dataIndex: "additionalParameterCheck",
    key: "additionalParameterCheck",
    render: text => <Checkbox />
  }
];

const additionalParameterData = [
  {
    additionalParameterName: "Moisture",
    additionalParameterCheck: "checked"
  }
];
export default class AdditionalParameterTable extends Component {
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
          size={this.state.size}
          dataSource={additionalParameterData}
          bordered={false}
          columns={additionalParameterColumns}
          title={() => TestTitle("Additional Parameter")}
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
