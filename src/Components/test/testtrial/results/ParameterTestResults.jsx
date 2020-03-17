/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { FlexContainer } from "../../../styledcomponents/container/FlexGrid";
import TextArea from "antd/lib/input/TextArea";
import { Tag } from "antd";
import { AntTable } from "../../../styledcomponents/table/AntTabl";

export default class ParameterTestResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tsd: {
        testName: "75 Micron",
        date: "17/03/2020",
        noOfTrial: "3",
        material: "Sand"
      },
      tester: "Marque",
      trials: [
        {
          test001tr01: {
            parameter: {
              wb: "50",
              lbs: "20"
            },
            average: "14.8"
          }
        },
        {
          test001tr02: {
            parameter: {
              wb: "20",
              lbs: "70"
            },
            average: "44.18"
          }
        }
      ],
      columns: [
        {
          title: "Parameters",
          dataIndex: "parameters",
          key: "parameters"
        }
      ]
    };
  }

  componentWillMount() {
    // loop no of trial column
    for (let i = 0; i < this.state.trials.length; i++) {
      console.log(this.state.trials[i]);
      this.state.columns.push({
        title: `Trial ${i + 1}`,
        dataIndex: `trial${i + 1}`,
        key: `trial${i + 1}`
      });
    }
  }

  render() {
    const { tsd, tester, trials, columns } = this.state;
    console.log(trials);
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
                <td>{tsd.testName}</td>
                <td>{tsd.date}</td>
                <td>{tsd.noOfTrial}</td>
                <td>{tsd.material}</td>
              </tr>
            </tbody>
          </table>
          <AntTable
            style={{
              width: "94%",
              boxShadow: "0px 0px 0px 0px rgba(0,0,0,0.0)"
            }}
            bordered
            columns={columns}
            dataSource={trials}
            showHeader={true}
            pagination={false}
            footer={() => <h4>Accepted Value : (30.5)</h4>}
          />
          <h4>OverAll average : (32.1)</h4>
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
            <h4>Tester</h4>
            <h5>{tester}</h5>
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
            <div className='input_wrapper'>
              <label className='label' htmlFor='comments'>
                Comments
              </label>
              <TextArea id='comments' name='comments' />
            </div>
            <div className='input_wrapper'>
              <label className='label' htmlFor='status'>
                Status
              </label>
              <Tag
                color='gold'
                style={{
                  height: "40px",
                  fontSize: "18px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center"
                }}
              >
                Success
              </Tag>
            </div>
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
    );
  }
}
