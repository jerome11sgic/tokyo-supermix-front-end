import React, { Component } from "react";
import { Checkbox, Select } from "antd";
import { AntTable } from "../../../styledcomponents/table/AntTabl";

import { FlexContainer } from "../../../styledcomponents/container/FlexGrid";
import {
  MasterLevelForm,
  MasterLevelFormTitle
} from "../../../styledcomponents/form/MasterLevelForms";
import { TileParagraph } from "../../../styledcomponents/typography/typography";

function handleChange(value) {
  console.log(`selected ${value}`);
}

const testParameterColumns = [
  {
    title: "Parameter",
    dataIndex: "parameterName",
    key: "parameterName"
  },
  {
    title: "Abbreviation",
    dataIndex: "parameterAbbr",
    key: "parameterAbbr"
  },
  {
    title: "Relevant",
    dataIndex: "testParameterCheck",
    key: "testParameterCheck",
    render: text => <Checkbox />
  }
];

const testParameterData = [
  {
    parameterName: "Cement",
    parameterAbbr: "A"
  },
  {
    parameterName: "Sand",
    parameterAbbr: "B"
  }
];
export default class AddTestParameter extends Component {
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
      <FlexContainer stepsarea style={{ marginTop: "45px" }}>
        <div testconfig>
          <MasterLevelFormTitle nomargin>
            <TileParagraph>Add Test Parameter</TileParagraph>
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
            <FlexContainer>
              <FlexContainer column>
                <h3>Select Parameters</h3>
                <AntTable
                  dataSource={testParameterData}
                  size={this.state.size}
                  bordered={false}
                  columns={testParameterColumns}
                  //   title={() => TestTitle("Select Parameter")}
                  showHeader={true}
                  style={{
                    width: "600px",
                    background: "white",
                    justifyContent: "center",
                    boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)"
                  }}
                  pagination={{ defaultPageSize: 4 }}
                />
              </FlexContainer>
              <FlexContainer column style={{ height: "180px" }}>
                {/* Test  */}
                {/* <div className='input_wrapper'>
                  <label for='test_type' className='label'>
                    Test Name
                  </label>
                  <Select
                    id='test_name'
                    name='test_name'
                    placeholder='Select Test Name'
                    style={{ width: 170 }}
                  />
                </div> */}

                {/*  Unit */}
                {/* <div className='input_wrapper'>
                  <label className='label'>Unit </label>
                  <Select
                    id='unit'
                    name='unit'
                    style={{ width: 170 }}
                    placeholder='Select Unit'
                    onChange={handleChange}
                  ></Select>
                </div> */}
              </FlexContainer>
            </FlexContainer>
          </MasterLevelForm>
        </div>
      </FlexContainer>
    );
  }
}
