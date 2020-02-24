import React, { Component } from "react";
import { Form, Input, Select, DatePicker } from "antd";
import { PrimaryButton } from "../../../styledcomponents/button/button";
import TextArea from "antd/lib/input/TextArea";
import "./styleProcess.css";

export default class AddProcessSample extends Component {
  render() {
    return (
      <div className="addprocessFormWrapper">
        <Form className="addprocessForm" title="Add Equipment Parameter">
          <div className="addprocessFormHeadingContainer">
            <p
              style={{ marginTop: "10px", marginLeft: "15px", color: "white" }}
            >
              Add Process Sample
            </p>
            {/* <Divider style={{marginTop:'-5px'}}/> */}
          </div>
          <div className="addprocessFormInnerWrapper">
            {/* Code */}
            <div className="input_wrapper">
              <label for="code" className="label">
                Code:
              </label>
              <Input
                className="inputProcessfield"
                id="code"
                name="code"
                placeholder="Enter Code"
              />
            </div>

            {/* Plant Name */}
            <div className="input_wrapper">
              <label for="process_name" className="label">
                Name:
              </label>
              <Input
                className="inputProcessfield"
                id="process_name"
                name="process_name"
                placeholder="Enter Name"
              />
            </div>

            {/* Place */}
            <div className="input_wrapper">
              <label for="raw_material" className="label">
                Raw Material
              </label>
              <Select
                className="inputProcessfield"
                id="raw_material"
                name="raw_material"
                placeholder=" Enter Raw Material"
                style={{ width: "250px" }}
              />
            </div>

            {/* T.P No */}
            <div className="input_wrapper">
              <label for="plant" className="label">
                Plant
              </label>
              <Select
                className="inputProcessfield"
                id="plant"
                name="plant"
                placeholder="plant "
                style={{ width: "250px" }}
              />
            </div>

            {/* Description  */}

            <div className="input_wrapper">
              <label for="description" className="label">
                Description
              </label>
              <TextArea
                id="description"
                name="description"
                placeholder="Description"
                style={{ width: "410px" }}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                flexWrap: "wrap",
                alignContent: "right",
                marginLeft: "450px"
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
