/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Icon, Popconfirm, Modal, Button } from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import { AntTable } from "../../styledcomponents/table/AntTabl";
import { FlexContainer } from "../../styledcomponents/container/FlexGrid";
import { api } from "../../services/AxiosService";
import Notification from "../../Constant/Notification";
import { PrimaryButton } from "../../styledcomponents/button/button";

export default class ManageTestConfiguration extends Component {
  state = {
    size: "small",
    testsList: [],
    visible: false,
    testParameters: [],
    filteredParameters: []
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

  componentDidMount() {
    this.getAllTests();
    this.getAllTestParameters();
  }

  getAllTests = () => {
    api("GET", "supermix", "/tests", "", "", "").then(res => {
      console.log(res.data.results);
      this.setState({
        testsList: res.data.results.test
      });
    });
  };
  getAllTestParameters = () => {
    api("GET", "supermix", "/test-parameters", "", "", "").then(res => {
      console.log(res.data.results);
      this.setState({
        testParameters: res.data.results.testparameters
      });
    });
  };

  onConfirmdelete(id) {
    console.log(id);

    api("DELETE", "supermix", "/test", "", "", id).then(res => {
      console.log(res.data);
      this.getAllTests();
      Notification("success", res.data.message);
    });
  }

  showTestParams = id => {
    const { testParameters, testsList, filteredParameters } = this.state;
    this.setState({
      visible: true
    });
    console.log(testParameters.length);
    for (let i = 0; i < testParameters.length; i++) {
      if (testParameters[i].test.id === id) {
        console.log(testParameters[i]);
        console.log("hit");
        filteredParameters.push({
          parameter: testParameters[i].parameter.name,
          abbreviation: testParameters[i].parameter.abbreviation,
          unit: testParameters[i].unit.unit
        });
      }
    }
    console.log(filteredParameters);
  };

  handleModalCancel = () => {
    this.setState({
      visible: false,
      filteredParameters: []
    });
  };
  render() {
    const parameterColumns = [
      {
        title: "Parameter",
        dataIndex: "parameter"
      },
      {
        title: "Abbreviation",
        dataIndex: "abbreviation"
      },
      {
        title: "Unit",
        dataIndex: "unit"
      }
    ];

    const columns = [
      {
        title: "Test Name",
        dataIndex: "name",
        key: "name"
        // width: "16%"
      },
      {
        title: "Test Type",
        dataIndex: "testType.type",
        key: "testType.type"
        // width: "16%"
      },
      {
        title: "Equation",
        dataIndex: "equation.formula",
        key: "equation.formula"
        // width: "16%"
      },
      {
        title: "Test Parameters",
        key: "testParams",
        render: (text, record) => (
          <Icon
            type='form'
            style={{ color: "green" }}
            onClick={this.showTestParams.bind(this, record.id)}
          />
        )
        // width: "16%"
      },
      {
        title: "Edit & Delete",
        key: "action",
        width: "12%",
        render: (text, record) => (
          <span>
            <a>
              <Popconfirm
                title='Are you sure you want to Delete this?'
                icon={
                  <Icon type='question-circle-o' style={{ color: "red" }} />
                }
                onConfirm={this.onConfirmdelete.bind(this, record.id)}
              >
                <Icon type='delete' style={{ color: "red" }}></Icon>
              </Popconfirm>
            </a>
          </span>
        )
      }
    ];
    return (
      <FlexContainer stepsarea>
        <AntTable
          style={{ width: "1200px" }}
          title={() => (
            <div
              style={{
                background: "#001328",
                width: "auto",
                height: "40px",
                marginTop: "-25px",
                borderRadius: "10px"
              }}
            >
              <Paragraph
                style={{
                  fontFamily: "Roboto",
                  color: "white",
                  textAlign: "center",
                  padding: "10px"
                }}
              >
                Manage Test Configuration{" "}
              </Paragraph>
            </div>
          )}
          columns={columns}
          onChange={this.handleChange}
          size={this.state.size}
          dataSource={this.state.testsList}
        />

        {/* Pop up to View Test Parameters */}
        <Modal
          title='Test Parameters'
          visible={this.state.visible}
          onCancel={this.handleModalCancel}
          footer={[
            <PrimaryButton
              type={"ghost"}
              key='submit'
              onClick={this.handleModalCancel}
              style={{ background: "#001328", color: "white", border: "none" }}
            >
              Close
            </PrimaryButton>
          ]}
        >
          <AntTable
            style={{
              width: "450px",
              boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
              border: "none"
            }}
            columns={parameterColumns}
            size={this.state.size}
            dataSource={this.state.filteredParameters}
            bordered={false}
          />
        </Modal>
      </FlexContainer>
    );
  }
}
