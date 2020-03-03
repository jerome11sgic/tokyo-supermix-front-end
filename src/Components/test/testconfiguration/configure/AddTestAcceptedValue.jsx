import React, { Component } from "react";
import { Input, Select, Switch } from "antd";

import TextArea from "antd/lib/input/TextArea";
import { FlexContainer } from "../../../styledcomponents/container/FlexGrid";
import {
  MasterLevelForm,
  MasterLevelFormTitle
} from "../../../styledcomponents/form/MasterLevelForms";
import { TileParagraph } from "../../../styledcomponents/typography/typography";
import { PrimaryButton } from "../../../styledcomponents/button/button";

const { Option } = Select;

export default class AddTestAcceptedValue extends Component {
  constructor(props) {
    super(props);

    this.state = {
      switchVal: false
    };
  }

  handleChange(value) {
    console.log(`selected ${value}`);
  }

  onChange(checked) {
    console.log(`switch to ${checked}`);
    if (checked === true) {
      console.log("true");
      this.setState({
        switchVal: true
      });
    }
    if (checked === false) {
      console.log("false");
      this.setState({
        switchVal: false
      });
    }
  }

  render() {
    const { switchVal } = this.state;
    return (
      <FlexContainer stepsarea style={{ marginTop: "40px" }}>
        <div testconfig>
          <MasterLevelFormTitle nomargin>
            <TileParagraph>Accepted Value</TileParagraph>
          </MasterLevelFormTitle>
          {/* <Divider style={{marginTop:'-5px'}}/> */}

          <MasterLevelForm
            filled
            borderRadiused
            style={{
              justifyContent: "space-around",
              paddingBottom: "20px",
              paddingLeft: "40px",
              paddingRight: "60px",
              paddingTop: "10px",
              borderBottomRightRadius: "15px",
              borderBottomLeftRadius: "15px",
              width: "570px"
            }}
          >
            {/* Parameter */}
            <div className='input_wrapper'>
              <label for='test_name' className='label'>
                Parameter
              </label>
              <Select
                id='parameter'
                name='parameter'
                placeholder='Select Parameter'
                style={{ width: 170 }}
              />
              <div style={{ height: "6px" }}></div>
            </div>

            {/* Unit */}
            <div className='input_wrapper'>
              <label for='unit' className='label'>
                Unit
              </label>
              <Select
                id='unit'
                name='unit'
                placeholder='Select Unit'
                style={{ width: 170 }}
              />
              <div style={{ height: "6px" }}></div>
            </div>

            <FlexContainer home>
              <div className='input_wrapper'>
                <PrimaryButton type='ghost'>Between</PrimaryButton>
                <div style={{ height: "12px" }}></div>
              </div>
              {/* Maximum  */}
              <div className='input_wrapper'>
                <Input
                  id='maximum'
                  name='maximum'
                  placeholder='Maximum'
                  style={{ width: 90 }}
                />
                <div style={{ height: "12px" }}></div>
              </div>

              <div className='input_wrapper'>
                <PrimaryButton type='ghost'>To</PrimaryButton>
                <div style={{ height: "12px" }}></div>
              </div>

              {/* Minimum  */}
              <div className='input_wrapper'>
                <Input
                  id='minimum'
                  name='minimum'
                  placeholder='Minimum'
                  style={{ width: 90 }}
                />
                <div style={{ height: "12px" }}></div>
              </div>
            </FlexContainer>
            <FlexContainer home>
              {/* Material */}
              <div className='input_wrapper'>
                <label for='material_switch' className='label'>
                  Material
                </label>
                <Switch
                  onChange={checked => this.onChange(checked)}
                  value={switchVal}
                />
                <div style={{ height: "12px" }}></div>
              </div>

              {/* Sub Category */}
              <div className='input_wrapper'>
                <label for='subCategory' className='label'>
                  Sub Category
                </label>
                <Select
                  id='subCategory'
                  name='subCategory'
                  placeholder='Select Sub Category'
                  style={{ width: 170 }}
                />
                <div style={{ height: "6px" }}></div>
              </div>

              {/* Material */}
              <div className='input_wrapper'>
                <label for='material' className='label'>
                  Material
                </label>
                <Select
                  id='material'
                  name='material'
                  placeholder='Select Material'
                  style={{ width: 160 }}
                />
                <div style={{ height: "6px" }}></div>
              </div>
            </FlexContainer>
            {switchVal === true ? (
              <FlexContainer home>
                <div className='input_wrapper'>
                  <PrimaryButton type='ghost'>Between</PrimaryButton>
                  <div style={{ height: "12px" }}></div>
                </div>
                {/* Maximum  */}
                <div className='input_wrapper'>
                  <Input
                    id='maximum'
                    name='maximum'
                    placeholder='Maximum'
                    style={{ width: 90 }}
                  />
                  <div style={{ height: "12px" }}></div>
                </div>

                <div className='input_wrapper'>
                  <PrimaryButton type='ghost'>To</PrimaryButton>
                  <div style={{ height: "12px" }}></div>
                </div>

                {/* Minimum  */}
                <div className='input_wrapper'>
                  <Input
                    id='minimum'
                    name='minimum'
                    placeholder='Minimum'
                    style={{ width: 90 }}
                  />
                  <div style={{ height: "12px" }}></div>
                </div>
              </FlexContainer>
            ) : switchVal === false ? (
              ""
            ) : (
              ""
            )}
          </MasterLevelForm>
        </div>
      </FlexContainer>
    );
  }
}
