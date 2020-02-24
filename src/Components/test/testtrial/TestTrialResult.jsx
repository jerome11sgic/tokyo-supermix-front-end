import React, { Component } from "react";
import { Input, Button, DatePicker, Select } from "antd";
import { FlexContainer } from "../../styledcomponents/container/FlexGrid";
import TextArea from "antd/lib/input/TextArea";
import {
  MasterLevelForm,
  MasterLevelFormTitle
} from "../../styledcomponents/form/MasterLevelForms";

import { AntTable } from "../../styledcomponents/table/AntTabl";
import { TestTrialTableTitles } from "./title/TestTrialTableTitles";

import { PrimaryButton } from "../../styledcomponents/button/button";
import { TestResultInput } from "./inputs/TestResultInput";
import Test from "./Test";
import { SmallInput } from "../../styledcomponents/input/CustomInput";
const Option = Select;

const data1 = [
  {
    Parameter: "",
    Unit: "",
    Accepted_Value: ""
  }
];

const data2 = [
  {
    Parameter: "",
    value: "",
    unit: "",
    iteration: ""
  }
];
const data3 = [
  {
    Parameter: "",
    result_value: "",
    unit: "",
    iteration: ""
  }
];

export default class TestTrialResult extends Component {
  state = {
    color: "#001328"
  };
  render() {
    const columns1 = [
      {
        title: <p style={{ color: "black" }}>Parameter</p>,
        dataIndex: "Parameter",
        key: "Parameter"
      },
      {
        title: <p style={{ color: "black" }}>Unit</p>,
        dataIndex: "Unit",
        key: "Unit"
      },
      {
        title: <p style={{ color: "black" }}>Accepted Value</p>,
        dataIndex: "Accepted_Value",
        key: "Accepted_Value"
      }
    ];

    const columns2 = [
      {
        title: <p style={{ color: "black" }}>Parameter</p>,
        dataIndex: "parameter",
        key: "parameter"
      },
      {
        title: <p style={{ color: "black" }}>Value</p>,
        dataIndex: "value",
        key: "value"
      },
      {
        title: <p style={{ color: "black" }}>Unit</p>,
        dataIndex: "unit",
        key: "unit"
      },
      {
        title: <p style={{ color: "black" }}>Iteration</p>,
        dataIndex: "iteration",
        key: "iteration"
      }
    ];

    const columns4 = [
      {
        title: <p style={{ color: "black" }}>Parameter</p>,
        dataIndex: "parameter",
        key: "parameter"
      },

      {
        title: <p style={{ color: "black" }}>Unit</p>,
        dataIndex: "unit",
        key: "unit"
      },
      {
        title: <p style={{ color: "black" }}>Result Value</p>,
        dataIndex: "result_value",
        key: "result_value"
      },
      {
        title: <p style={{ color: "black" }}>Iteration</p>,
        dataIndex: "iteration",
        key: "iteration"
      }
    ];

    return (
      <FlexContainer column style={{ height: "auto", width: "auto" }}>
        <MasterLevelForm
          style={{
            background: "white",
            borderRadius: "15px",
            height: "100px"
          }}
        >
          {/* Code */}
          <div className='input_wrapper'>
            <label for='id' className='label'>
              Test Code
            </label>
            <Input
              id='id'
              name='id'
              placeholder=''
              defaultValue={`T001${this.props.samId}`}
            />
          </div>

          {/* Plant Name */}
          <div className='input_wrapper'>
            <label for='customer_name' className='label'>
              Grade
            </label>
            <Input id='customer_name' name='customer_name' placeholder='' />
          </div>

          {/* Place */}
          <div className='input_wrapper'>
            <label for='address' className='label'>
              Mix Design
            </label>
            <Input id='address' name='address' placeholder='' />
          </div>

          {/* T.P No */}

          <div className='input_wrapper'>
            <label for='address' className='label'>
              Plant
            </label>
            <Input id='address' name='address' placeholder='' />
          </div>
          <div className='input_wrapper'>
            <label for='phoneno' className='label'>
              Date
            </label>
            <DatePicker id='phoneno' name='phoneno' />
          </div>
          <div className='input_wrapper'>
            <PrimaryButton
              key='submit'
              style={{
                background: "#001328",
                color: "white",
                border: "none"
              }}
            >
              Procedure
            </PrimaryButton>
          </div>
        </MasterLevelForm>

        <FlexContainer style={{ height: "auto", marginTop: "20px" }}>
          <FlexContainer normal column style={{ height: "auto" }}>
            <div>
              <MasterLevelForm
                style={{
                  height: "auto",
                  width: "800px",
                  background: "white",
                  paddingRight: "20px",
                  paddingBottom: "15px"
                }}
              >
                <AntTable
                  large
                  emptyTableTestTrial
                  columns={columns1}
                  dataSource={data1}
                  onChange={this.handleChange}
                  pagination={false}
                  //   scroll={{ y: 100 | true }}
                  size='small'
                  title={() => <h4>Material Related Parameter</h4>}
                />

                <AntTable
                  large
                  emptyTableTestTrial
                  columns={columns2}
                  dataSource={data2}
                  onChange={this.handleChange}
                  pagination={false}
                  size='small'
                  title={() => <h4>Additional Parameter With Value</h4>}
                />

                <AntTable
                  large
                  emptyTableTestTrial
                  columns={columns2}
                  dataSource={data2}
                  onChange={this.handleChange}
                  pagination={false}
                  size='small'
                  title={() => <h4>Equipment Related Parameter</h4>}
                />

                <AntTable
                  large
                  emptyTableTestTrial
                  columns={columns4}
                  onChange={this.handleChange}
                  size='small'
                  dataSource={data3}
                  pagination={false}
                  title={() => <h4>Test Related Parameter</h4>}
                />
              </MasterLevelForm>
            </div>
          </FlexContainer>
          <FlexContainer
            style={{
              height: "450px",
              width: "500px",
              background: "white",
              boxShadow: "1px 3px 1px rgba(0,0,0,0.09)",
              borderRadius: "15px"
            }}
          >
            <MasterLevelFormTitle nomargin style={{ width: "660px" }}>
              <p style={{ fontSize: "15px", color: "white" }}>Result:</p>
            </MasterLevelFormTitle>
            <FlexContainer>
              <MasterLevelForm
                style={{
                  marginTop: "-170px",
                  padding: "50px"
                }}
              >
                <div style={{ display: "flex" }}>
                  <h3 style={{ width: "170px" }}>Average Value</h3>
                  <Input
                    id='reviews'
                    name='reviews'
                    style={{ width: "170px" }}
                  />
                </div>
                <div style={{ display: "flex" }}>
                  <h3 style={{ width: "170px" }}>Status</h3>
                  <Input
                    id='reviews'
                    name='reviews'
                    style={{ width: "170px" }}
                  />
                </div>
                <div style={{ display: "flex" }}>
                  <h3 style={{ width: "170px" }}>Comment</h3>
                  <TextArea
                    id='reviews'
                    name='reviews'
                    style={{ width: "170px" }}
                  />
                </div>

                <FlexContainer style={{ padding: "20px" }}>
                  <PrimaryButton type='primary'>Submit </PrimaryButton>
                  <PrimaryButton
                    type='primary'
                    style={{ float: "right", marginLeft: "20px" }}
                  >
                    Proceed
                  </PrimaryButton>
                </FlexContainer>
              </MasterLevelForm>
            </FlexContainer>
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
    );
  }
}
