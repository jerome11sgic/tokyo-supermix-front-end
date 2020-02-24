import React, { Component } from "react";
import { Form, Input, Select } from "antd";
import { PrimaryButton } from "../../../styledcomponents/button/button";
import "./stylegraph.css";
const { Option } = Select;

export default class AddGraph extends Component {
  render() {
    return (
      <div className="addFormOuterDiv">
        <Form className="addgraphform" title="Add Graph">
          <div className="headingAddGraph">
            <p
              style={{ marginTop: "10px", marginLeft: "15px", color: "white" }}
            >
              Add Graph
            </p>
            {/* <Divider style={{marginTop:'-5px'}}/> */}
          </div>

          <div className="innerAddGraphContainer">
            <div className="innerAddGraphFormContainer">
              {/* Code */}
              <div className="input_wrapper">
                <label for="code" className="label">
                  Code:
                </label>
                <Input
                  className="input"
                  id="code"
                  name="code"
                  placeholder="Enter Code "
                />
              </div>

              {/* unit Name */}
              <div className="input_wrapper">
                <label for="Unit_name" className="label">
                  Graph Name:
                </label>
                <Input
                  className="input"
                  id="Unit_name"
                  name="unit_name"
                  placeholder="Enter Graph Name"
                />
              </div>

              {/* Unit */}
              <div className="input_wrapper">
                <label for="unit" className="label">
                  Graph Type
                </label>
                {/* <Input className="input" id="unit" name="unit" placeholder="" /> */}
                <Select
                  className="ant-select-selection"
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Select Graph Type"
                >
                  <Option value="QC Manager">Line Chart</Option>

                  <Option value="QC Technician">Pie Chart</Option>
                  <Option value="Plant manager">Ring Chart</Option>
                </Select>
              </div>

              <div className="input_wrapper">
                <label for="unit" className="label">
                  X axis
                </label>
                <Select
                  className="input"
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Select X Parameter"
                >
                  <Option value="QC Manager">Weight</Option>
                  <Option value="QC Technician">Force</Option>
                  <Option value="Plant manager">Mositure</Option>
                  <Option value="Plant manager">Strength</Option>
                  <Option value="Plant manager">Gravity</Option>
                </Select>
              </div>
              <div className="input_wrapper">
                <label for="unit" className="label">
                  Y axis
                </label>
                <Select
                  className="input"
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Select Y Parameter"
                >
                  <Option value="QC Manager">Weight</Option>
                  <Option value="QC Technician">Force</Option>
                  <Option value="Plant manager">Temperature</Option>
                </Select>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                flexWrap: "wrap",
                padding: "10px"
                // marginTop: "-20px"
              }}
            >
              <PrimaryButton
                type=""
                style={{
                  marginTop: "30px",
                  marginRight: "20px",
                  background: "#001328",
                  color: "white"
                }}
              >
                Submit
              </PrimaryButton>
              <PrimaryButton style={{ marginTop: "30px" }}>Clear</PrimaryButton>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}
