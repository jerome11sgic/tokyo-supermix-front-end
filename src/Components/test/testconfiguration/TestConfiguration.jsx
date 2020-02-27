import React, { Component } from "react";
import { Input, Select } from "antd";

import TextArea from "antd/lib/input/TextArea";
import { FlexContainer } from "../../styledcomponents/container/FlexGrid";
import {
  MasterLevelForm,
  MasterLevelFormTitle
} from "../../styledcomponents/form/MasterLevelForms";
import { TileParagraph } from "../../styledcomponents/typography/typography";

const { Option } = Select;

const children = [
  { id: 0, name: "Peliyagoda" },
  { id: 1, name: "Trincomalee" }
];

function handleChange(value) {
  console.log(`selected ${value}`);
}

export default class TestConfiguration extends Component {
  render() {
    return (
      <FlexContainer stepsarea style={{ marginTop: "45px" }}>
        <MasterLevelForm testconfig>
          <MasterLevelFormTitle
            style={{ width: "100%", color: "white", height: "70px" }}
          >
            <TileParagraph>Test Configuration Details</TileParagraph>
          </MasterLevelFormTitle>
          {/* <Divider style={{marginTop:'-5px'}}/> */}

          <FlexContainer
            borderRadiused
            style={{ justifyContent: "space-around" }}
          >
            {/* Code */}
            <div className='input_wrapper'>
              <label for='code' className='label'>
                Code
              </label>
              <Input
                id='code'
                name='code'
                placeholder='Enter Codes'
                className='input_Field'
              />
            </div>
            {/* First Name */}
            {/* <div className='input_wrapper'>
              <label for='firstname' className='label'>
                PreFix
              </label>
              <Input
                id='firstname'
                name='firstname'
                placeholder='Enter Prefix'
                className='input_Field'
              />
            </div> */}
            {/* Last Name */}
            <div className='input_wrapper'>
              <label for='lastname' className='label'>
                Test Name
              </label>
              <Input
                id='lastname'
                name='lastname'
                placeholder='Enter Test Name'
                className='input_Field'
              />
            </div>

            {/* Plant Multiselect */}
            <div className='input_wrapper'>
              <label className='label'>Plant </label>
              <Select
                mode='multiple'
                style={{ width: 200 }}
                placeholder='Select Plant'
                onChange={handleChange}
              >
                {children.map(post => (
                  <Option value={post.id}>{post.name}</Option>
                ))}
              </Select>
            </div>

            {/* Contact No */}
            <div className='input_wrapper'>
              <label for='contactno' className='label'>
                Material Type
              </label>
              <Select
                showSearch
                className='input_Field'
                style={{ width: 250 }}
                placeholder='Select a Type'
                optionFilterProp='children'
              ></Select>
            </div>
            <div className='input_wrapper'>
              <label for='contactno' className='label'>
                Main Category
              </label>
              <Select
                showSearch
                className='input_Field'
                style={{ width: 250 }}
                placeholder='Select a Category'
                optionFilterProp='children'
              ></Select>
            </div>
            {/* Plant Name */}
            <div className='input_wrapper'>
              <label for='plant' className='label'>
                Sub Category
              </label>
              <Select
                className='input_Field'
                showSearch
                style={{ width: 250 }}
                placeholder='Select a Category'
                optionFilterProp='children'
              ></Select>
            </div>
            {/* Address  */}
            <div className='input_wrapper' style={{ flexBasis: "30%" }}>
              <label for='address' className='label'>
                Description
              </label>
              <TextArea
                className='textarea1'
                style={{ width: 387 }}
                id='address'
                name='address'
                placeholder=''
              />
            </div>
            <div className='input_wrapper' style={{ flexBasis: "30%" }}>
              <label for='address' className='label'>
                Procedure
              </label>
              <TextArea
                className='textarea1'
                style={{ width: 387 }}
                id='address'
                name='address'
                placeholder=''
              />
            </div>
          </FlexContainer>
        </MasterLevelForm>
      </FlexContainer>
    );
  }
}
