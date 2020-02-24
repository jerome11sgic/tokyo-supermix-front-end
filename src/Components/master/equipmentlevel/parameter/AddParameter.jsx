import React, { Component } from 'react';
import { Form, Input, Select, DatePicker } from "antd";
import { PrimaryButton } from "../../../styledcomponents/button/button";
import "./styleParameter.css";

export default class AddParameter extends Component {
    render() {
        return (
            <div className="addparameterFormWrapper">
        <Form className="addparameterForm" title="Add Equipment Parameter">
          <div className="addparameterFormHeadingContainer">
            <p
              style={{ marginTop: "10px", marginLeft: "15px", color: "white" }}
            >
              Add Equipment Parameter
            </p>
            {/* <Divider style={{marginTop:'-5px'}}/> */}
          </div>
          <div className="addparameterFormInnerWrapper">
            {/* Code */}
            <div className="input_wrapper">
              <label for="code" className="label">
              Code
              </label>
              <Input id="code" name="code" placeholder="Code" />
            </div>

            {/* Plant Name */}
            <div className="input_wrapper">
              <label for="equipment_name" className="label">
              Equipment
              </label>
              <Select  
                className="inputfield" 
                id="equipment_name" 
                name="equipment_name" 
                placeholder="Equipment name"
                // style={{ width: "195px" }}
               />
            </div>

            {/* Place */}
            <div className="input_wrapper">
              <label for="parameter" className="label">
              Parameter
              </label>
              <Input id="parameter" name="parameter" placeholder="Parameter" />
            </div>

            {/* T.P No */}
            <div className="input_wrapper">
              <label for="unit" className="label">
              Unit
              </label>
              <Select
                className="input_field"
                id="unit"
                name="unit"
                placeholder="Unit"
                style={{ width: "195px" }}
              />
            </div>

            {/* Description  */}
            <div className="input_wrapper">
              <label for="location" className="label">
              Location
              </label>
              <Select id="location" name="location" placeholder="location"  style={{ width: "195px" }} />
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
        )
    }
}
