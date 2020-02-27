import React, { Component } from "react";
import {
  MasterLevelForm,
  MasterLevelFormTitle
} from "../../styledcomponents/form/MasterLevelForms";
import { Input, DatePicker, Select } from "antd";
import { PrimaryButton } from "../../styledcomponents/button/button";
import { SmallInput } from "../../styledcomponents/input/CustomInput";
import { FlexContainer } from "../../styledcomponents/container/FlexGrid";
import Test from "./Test";

const Option = Select;

export default class QualityParameter extends Component {
  render() {
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
              Test
            </label>
            <Input id='id' name='id' placeholder='' defaultValue={`T001`} />
          </div>

          {/* Plant Name */}
          <div className='input_wrapper'>
            <label for='customer_name' className='label'>
              Incoming Sample
            </label>
            <Input id='customer_name' name='customer_name' placeholder='' />
          </div>

          {/* Place */}
          <div className='input_wrapper'>
            <label for='address' className='label'>
              Material
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

        <FlexContainer style={{ height: "300px", marginTop: "20px" }}>
          <FlexContainer normal column style={{ height: "auto" }}>
            <div>
              <MasterLevelFormTitle nomargin>
                <p style={{ fontSize: "15px", color: "white" }}>
                  Material Relate Parameter:
                </p>
              </MasterLevelFormTitle>
              <MasterLevelForm
                style={{
                  height: "auto",
                  width: "auto",
                  background: "white",
                  borderBottomRightRadius: "15px",
                  borderBottomLeftRadius: "15px",
                  paddingBottom: "15px",
                  overflowY: "scroll"
                }}
              >
                {/* Code */}
                <div className='input_wrapper'>
                  <label for='id' className='label'>
                    Moisture:
                  </label>
                  <SmallInput id='id' name='id' placeholder='' />
                </div>

                {/* Plant Name */}
                <div className='input_wrapper'>
                  <label for='customer_name' className='label'>
                    Unit:
                  </label>
                  <Select
                    id='customer_name'
                    size='small'
                    name='customer_name'
                    style={{ width: "120px" }}
                    placeholder=''
                  >
                    <Option value='Main Category 1'>N</Option>
                    <Option value='Main Category 2'>g</Option>
                  </Select>
                </div>

                <div className='input_wrapper'>
                  {/* <PrimaryButton
                    key='submit'
                    size='small'
                    style={{
                      background: "#001328",
                      color: "white",
                      border: "none"
                    }}
                  >
                    Find
                  </PrimaryButton> */}
                </div>
              </MasterLevelForm>
            </div>
            <div>
              <MasterLevelFormTitle nomargin style={{ width: "650px" }}>
                <p style={{ fontSize: "15px", color: "white" }}>
                  Equipment Parameter:
                </p>
              </MasterLevelFormTitle>
              <MasterLevelForm
                style={{
                  height: "auto",
                  width: "auto",
                  background: "white",
                  borderBottomRightRadius: "15px",
                  borderBottomLeftRadius: "15px",
                  paddingBottom: "15px",
                  overflowY: "scroll"
                }}
              >
                {/* Code */}
                <div className='input_wrapper'>
                  <label for='id' className='label'>
                    Weight of Pan:
                  </label>
                  <SmallInput id='id' name='id' placeholder='' />
                </div>

                {/* Plant Name */}
                <div className='input_wrapper'>
                  <label for='customer_name' className='label'>
                    Unit:
                  </label>

                  <Select
                    id='customer_name'
                    name='customer_name'
                    style={{ width: "120px" }}
                    size='small'
                    placeholder=''
                  >
                    <Option value='Main Category 1'>N</Option>
                    <Option value='Main Category 2'>g</Option>
                  </Select>
                </div>

                <div className='input_wrapper' style={{ marginTop: "40px" }}>
                  {/* <PrimaryButton
                    key='submit'
                    size='small'
                    style={{
                      background: "#001328",
                      color: "white",
                      border: "none"
                    }}
                  >
                    Find
                  </PrimaryButton> */}
                </div>
              </MasterLevelForm>
            </div>
          </FlexContainer>
          <FlexContainer
            style={{
              height: "auto",
              width: "660px",
              background: "white",
              boxShadow: "1px 3px 1px rgba(0,0,0,0.09)",
              borderRadius: "15px"
            }}
          >
            <MasterLevelFormTitle nomargin style={{ width: "660px" }}>
              <p style={{ fontSize: "15px", color: "white" }}>
                Additional Parameter:
              </p>
            </MasterLevelFormTitle>
            <div>
              <Test />
              <MasterLevelForm style={{ marginTop: "-10px" }}>
                <div className='input_wrapper'>
                  <label for='id' className='label'>
                    Test Results
                  </label>
                  <Input id='id' name='id' placeholder='' />
                </div>

                <div className='input_wrapper'>
                  <label for='customer_name' className='label'>
                    Unit
                  </label>
                  <Select
                    id='customer_name'
                    name='customer_name'
                    style={{ width: "120px" }}
                    placeholder=''
                  >
                    <Option value='Main Category 1'>Main Category 1</Option>
                    <Option value='Main Category 2'>Main Category 2</Option>
                  </Select>
                </div>

                <div
                  className='input_wrapper'
                  style={{
                    marginLeft: "150px"
                  }}
                >
                  <label></label>
                  <PrimaryButton
                    style={{
                      background: "#001328",
                      color: "white",
                      border: "none"
                    }}
                  >
                    Submit
                  </PrimaryButton>
                </div>
              </MasterLevelForm>
            </div>
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
    );
  }
}
