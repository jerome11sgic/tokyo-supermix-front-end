import React, { Component } from "react";
import { Input, Select } from "antd";

import TextArea from "antd/lib/input/TextArea";
import { FlexContainer } from "../../../styledcomponents/container/FlexGrid";
import {
  MasterLevelForm,
  MasterLevelFormTitle
} from "../../../styledcomponents/form/MasterLevelForms";
import { TileParagraph } from "../../../styledcomponents/typography/typography";

const { Option } = Select;

const children = [
  { id: 0, name: "Peliyagoda" },
  { id: 1, name: "Trincomalee" }
];

function handleChange(value) {
  console.log(`selected ${value}`);
}

export default class AddTestName extends Component {
  render() {
    return (
      <FlexContainer stepsarea style={{ marginTop: "45px" }}>
        <div testconfig>
          <MasterLevelFormTitle nomargin>
            <TileParagraph>Add Test</TileParagraph>
          </MasterLevelFormTitle>
          {/* <Divider style={{marginTop:'-5px'}}/> */}

          <MasterLevelForm
            filled
            borderRadiused
            style={{
              justifyContent: "space-around",
              paddingBottom: "70px",
              paddingLeft: "40px",
              paddingRight: "60px",
              paddingTop: "20px",
              borderBottomRightRadius: "15px",
              borderBottomLeftRadius: "15px"
            }}
          >
            {/* Code */}
            <div className='input_wrapper'>
              <label for='test_name' className='label'>
                Test Name
              </label>
              <Input
                id='test_name'
                name='test_name'
                placeholder='Enter Test Name'
              />
            </div>

            {/* Test Type */}
            <div className='input_wrapper'>
              <label for='test_type' className='label'>
                Test Type
              </label>
              <Select
                id='test_type'
                name='test_type'
                placeholder='Select Test Type'
                style={{ width: 170 }}
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

            {/* Description  */}
            <div className='input_wrapper'>
              <label for='description' className='label'>
                Description
              </label>
              <TextArea
                style={{ width: 187 }}
                id='description'
                name='description'
                placeholder=''
              />
            </div>

            {/* Procedure */}
            <div className='input_wrapper'>
              <label for='procedure' className='label'>
                Procedure
              </label>
              <TextArea
                className='textarea1'
                style={{ width: 187 }}
                id='procedure'
                name='procedure'
                placeholder='Enter Procedure'
              />
            </div>
          </MasterLevelForm>
        </div>
      </FlexContainer>
    );
  }
}
