import React, { Component } from "react";
import { Checkbox } from "antd";
import { AntTable } from "../../../styledcomponents/table/AntTabl";
import { TestTitle } from "../titles/TestTitle";

const equipmentParameterColumns = [
  {
    title: "",
    dataIndex: "equipmentParameterId",
    key: "equipmentParameterId"
  },
  {
    title: "",
    dataIndex: "equipmentParameterName",
    key: "equipmentParameterName"
  },
  {
    title: "",
    dataIndex: "equipmentParameterCheck",
    key: "equipmentParameterCheck",
    render: text => <Checkbox />
  }
];

const equipmentParameterData = [
  {
    equipmentParameterName: "Moisture",
    equipmentParameterCheck: "checked"
  }
];
export default class EquipmentParameterTable extends Component {
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
          dataSource={equipmentParameterData}
          bordered={false}
          columns={equipmentParameterColumns}
          title={() => TestTitle("Equipment Parameter")}
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
