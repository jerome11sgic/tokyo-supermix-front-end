/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { FlexContainer } from "../../../styledcomponents/container/FlexGrid";
import TextArea from "antd/lib/input/TextArea";
import { Tag } from "antd";
import { AntTable } from "../../../styledcomponents/table/AntTabl";
import { api } from "../../../services/AxiosService";

const data1 = [];
export default class ParameterTestResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      testId: this.props.match.params.material_testId,
      columns: [
        {
          title: "Average",
          dataIndex: "Average",
          key: "Average"
        }
      ],
      trailParameter: [],
      trailData: [],
      trailColumns: [
        {
          title: "Average",
          dataIndex: "Average",
          key: "Average"
        }
      ],
      noOfTrial: "",
      testName: "",
      date: "",
      material: "",
      tester: "",
      Status: "",
      acceptedMinValue: "",
      acceptedMaxValue: "",
      average: ""
    };
  }

  componentDidMount() {
    this.getMaterialTestByTestId();
  }
  getAcceptedValueByTestId = testId => {
    api("GET", "supermix", "/accepted-value/test", "", "", testId).then(res => {
      console.log(res.data.results);
      this.setState({
        acceptedMinValue: res.data.results.test[0].minValue,
        acceptedMaxValue: res.data.results.test[0].maxValue
      });
    });
  };

  getMaterialTestByTestId = () => {
    api("GET", "supermix", "/material-test", "", "", this.state.testId).then(
      res => {
        console.log(res.data);
        let avg = res.data.results.MaterialTest.average;
        this.setState({
          noOfTrial: res.data.results.MaterialTest.noOfTrial,
          testName: res.data.results.MaterialTest.testName,
          date: res.data.results.MaterialTest.date,
          Status: res.data.results.MaterialTest.status,
          average: Number(avg.toFixed(2))
        });
        this.getMaterialTestTrailByMaterialTestId(
          res.data.results.MaterialTest.code
        );
        this.getAcceptedValueByTestId(res.data.results.MaterialTest.testId);
      }
    );
  };

  getMaterialTestTrailByMaterialTestId = code => {
    api(
      "GET",
      "supermix",
      "/material-test-trial/material-test",
      "",
      "",
      code
    ).then(res => {
      console.log(res.data.results.MaterialTest[0]);
      this.setState({
        material:
          res.data.results.MaterialTest[0].materialTest.incomingSample
            .rawMaterial.name
      });
      const tcol = [];
      const tdata = [];
      let tdataObj = {};
      for (var i = 0; i < res.data.results.MaterialTest.length; i++) {
        tcol.push({
          title: `Trail${i + 1}`,
          dataIndex: `t${i + 1}`,
          key: `t${i + 1}`
        });
      }

      for (var i = 0; i < res.data.results.MaterialTest.length; i++) {
        if (i === 0) {
          tdata.push({
            [`t${i + 1}`]: res.data.results.MaterialTest[i].result
          });
        } else {
          tdata[0] = {
            ...tdata[0],
            ...{ [`t${i + 1}`]: res.data.results.MaterialTest[i].result }
          };
        }
      }
      console.log(tdata);
      this.setState({ trailData: tdata });
      this.setState({ trailColumns: [...this.state.trailColumns, ...tcol] });
    });
  };
  returnTable = () => {
    return (
      <AntTable
        style={{
          width: "94%",
          boxShadow: "0px 0px 0px 0px rgba(0,0,0,0.0)"
        }}
        bordered
        columns={this.state.trailColumns}
        dataSource={this.state.trailData}
        showHeader={true}
        pagination={false}
        footer={() => (
          <h4 style={{ color: "#f25a5a" }}>
            {`  Accepted Range :${this.state.acceptedMinValue} Min - ${this.state.acceptedMaxValue} Max`}
          </h4>
        )}
      />
    );
  };
  render() {
    return (
      <FlexContainer normal>
        <FlexContainer
          column
          normal
          style={{
            background: "white",
            width: "70%",
            height: "350px",
            padding: "10px",
            borderRadius: "5px"
          }}
        >
          <table
            style={{
              border: "0.5px solid rgba(0,0,0,0.25)",
              width: "90%",
              alignSelf: "center",
              borderRadius: "15px"
            }}
          >
            <thead>
              <tr>
                <th>Test Name</th>
                <th>Date</th>
                <th>No of Trial</th>
                <th>Material</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.state.testName}</td>
                <td>{this.state.date}</td>
                <td>{this.state.noOfTrial}</td>
                <td>{this.state.material}</td>
              </tr>
            </tbody>
          </table>

          {this.returnTable()}
        </FlexContainer>
        <FlexContainer column style={{ width: "20%", height: "350px" }}>
          <FlexContainer
            column
            style={{
              background: "white",
              width: "100%",
              padding: "10px",
              borderRadius: "5px"
            }}
          >
            <h4>OverAll average</h4>
            <h1 style={{ fontSize: "30px" }}>{this.state.average}</h1>
          </FlexContainer>
          <FlexContainer
            column
            style={{
              background: "white",
              width: "100%",
              padding: "15px",
              borderRadius: "5px"
            }}
          >
            <div className="input_wrapper">
              <label className="label" htmlFor="comments">
                Comments
              </label>
              <TextArea id="comments" name="comments" />
            </div>
            <div className="input_wrapper">
              <label className="label" htmlFor="status">
                Status
              </label>
              <Tag
                color={this.state.Status === "PASS" ? "green" : "red"}
                style={{
                  height: "40px",
                  fontSize: "18px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center"
                }}
              >
                {this.state.Status}
              </Tag>
            </div>
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
    );
  }
}
