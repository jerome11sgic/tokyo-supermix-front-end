import React, { Component } from "react";
import { FlexContainer } from "../../styledcomponents/container/FlexGrid";
import { TestResultInput } from "./inputs/TestResultInput";
import TextArea from "antd/lib/input/TextArea";
import { PrimaryButton } from "../../styledcomponents/button/button";
import { AntTable } from "../../styledcomponents/table/AntTabl";
import { MasterLevelForm } from "../../styledcomponents/form/MasterLevelForms";
import { Input } from "antd";
const data = [
  {
    testcode: "10",
    testname: "sieve",
    sample: "sample",
    material: "sand",
    plant: "peliyagoda",
    testeddate: "20/01/2020",
    testedlevel: "plantlevel",
    materialparameter: "param01",
    testresult: "pass",
    testedby: "noname",
    status: "finished",
    comments: "no comments"
  }
];

const columns = [
  {
    title: "Test Id ",
    dataIndex: "testId",
    key: "testId "
  },
  {
    title: "Tested Date & Time",
    dataIndex: "date&time",
    key: "date&time"
  },
  {
    title: "Accepted Value",
    dataIndex: "acceptedValue",
    key: "acceptedValue"
  },
  {
    title: "Test Result Value",
    dataIndex: "resultValue",
    key: "resultValue"
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status"
  },
  {
    title: "Tested By ",
    dataIndex: "testedBy",
    key: "testedBy"
  },
  {
    title: "Comments",
    dataIndex: "comments",
    key: "comments"
  }
];
export default class TestResults extends Component {
  componentDidMount() {
    console.log(data);
  }

  render() {
    return (
      <FlexContainer style={{ width: "auto" }}>
        {/* Column 01 */}
        <FlexContainer
          column
          style={{
            width: "auto",
            background: "white",
            padding: "50px",
            textAlign: "justify"
          }}
        >
          {TestResultInput("Sample Id", "sample_id", data[0].testcode)}
          {TestResultInput("supplier", "supplier", data[0].testname)}
          {TestResultInput("Test Name", "test_name", data[0].sample)}
          {TestResultInput("Material", "material", data[0].material)}
          {TestResultInput("Plant", "plant", data[0].plant)}
          {/* {TestResultInput("Tested Date", "tested_date", data[0].testeddate)}
          {TestResultInput("Test Level", "test_level", data[0].testedlevel)} */}
          {/* {TestResultInput(
            "Material Parameter",
            "material_parameter",
            data[0].materialparameter
          )}
          {TestResultInput("Test Result", "test_result", data[0].testresult)}
          {TestResultInput("Tested By", "tested_by", data[0].testedby)}
          {TestResultInput("Status", "status", data[0].status)}
          {TestResultInput("Comments", "comments", data[0].comments)} */}
        </FlexContainer>
        {/* Column 02 */}
        <FlexContainer
          row
          normal
          style={{ background: "white", width: "65%", padding: "50px" }}
        >
          <FlexContainer normal>
            <AntTable
              normal
              emptyTableTestTrial
              columns={columns}
              // dataSource={data2}
              onChange={this.handleChange}
              pagination={false}
              size='small'
              // title={() => <h4>Equipment Related Parameter</h4>}
            />
          </FlexContainer>
        </FlexContainer>

        <FlexContainer
          row
          style={{
            background: "white",
            width: "auto",
            padding: "15px",
            textAlign: "left",
            marginTop: "20px"
          }}
        >
          <div className='input_wrapper'>
            <label for='designation_description' className='lable'>
              Comments
            </label>
            <TextArea
              id='designation_description'
              name='designation_description'
              placeholder='Enter your comments'
              style={{ width: "350px", height: "100px" }}
            />
          </div>
        </FlexContainer>
      </FlexContainer>
    );
  }
}
