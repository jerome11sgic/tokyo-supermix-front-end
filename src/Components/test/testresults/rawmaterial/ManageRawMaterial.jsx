/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Popconfirm, Divider, Icon, Modal } from "antd";

import { AntTable } from "../../../styledcomponents/table/AntTabl";
import RawMaterialTitle from "../titles/RawMaterialTitle";
import { api } from "../../../services/AxiosService";
import { FlexContainer } from "../../../styledcomponents/container/FlexGrid";
import { PrimaryButton } from "../../../styledcomponents/button/button";

export default class ManageRawMaterial extends Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    searchText: "",
    visible: false,
    size: "small",
    materialTests: [],
    filteredTestTrials: []
  };

  //  get all plant API
  getAllMaterialTestTrials = () => {
    api("GET", "supermix", "/material-tests", "", "", "").then(res => {
      console.log(res.data.results.materialTests);
      this.setState({
        materialTests: res.data.results.materialTests
      });
    });
  };

  componentDidMount() {
    this.getAllMaterialTestTrials();
  }

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

  showTestTrials = code => {
    const { filteredTestTrials } = this.state;
    console.log(code);

    api("GET", "supermix", "/material-test-trials", "", "", "").then(res => {
      console.log(res.data.results);

      console.log(res.data.results.materialTestTrial.length);
      for (let j = 0; j < res.data.results.materialTestTrial.length; j++) {
        if (code === res.data.results.materialTestTrial[j].materialTest.code) {
          console.log("hit");
          console.log(res.data.results.materialTestTrial[j].materialTest.code);
          filteredTestTrials.push({
            code: res.data.results.materialTestTrial[j].code,
            trialNo: res.data.results.materialTestTrial[j].trialNo,
            result: res.data.results.materialTestTrial[j].result
          });
          console.log(filteredTestTrials);
        }
      }
      this.setState({
        visible: true
      });
    });
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
    this.state.filteredTestTrials.splice(
      0,
      this.state.filteredTestTrials.length
    );
    console.log(this.state.filteredTestTrials);
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
    this.state.filteredTestTrials.splice(
      0,
      this.state.filteredTestTrials.length
    );
    console.log(this.state.filteredTestTrials);
  };

  handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    });
  };

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null
    });
  };

  setAgeSort = () => {
    this.setState({
      sortedInfo: {
        order: "descend",
        columnKey: "code"
      }
    });
  };

  onChange(pageNumber) {
    console.log("Page: ", pageNumber);
  }

  render() {
    const columns = [
      {
        title: "Code",
        dataIndex: "code",
        key: "code"
      },
      {
        title: "Date",
        dataIndex: "date",
        key: "date"
      },
      {
        title: "No of Trial",
        dataIndex: "noOfTrial",
        key: "noOfTrial"
      },
      {
        title: "Average",
        dataIndex: "average",
        key: "average"
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status"
      },

      {
        title: "Test Level",
        dataIndex: "testLevel",
        key: "testLevel"
      },
      {
        title: "Incoming Sample",
        dataIndex: "incomingSampleCode",
        key: "incomingSampleCode"
      },
      {
        title: "Test Name",
        dataIndex: "testName",
        key: "testName"
      },
      {
        title: "Material State",
        dataIndex: "materialState",
        key: "materialState"
      },
      {
        title: "Trials",
        key: "trials",
        render: (text, record = this.state.materialTests) => (
          <Icon
            type="container"
            style={{ color: "green" }}
            onClick={this.showTestTrials.bind(this, record.code)}
          />
        )
      },
      {
        title: "Edit & Delete",
        key: "action",
        width: "10%",
        render: (text, record) => (
          <span>
            <a>
              <Icon type="edit" />
            </a>
            <Divider type="vertical" />
            <a>
              <Popconfirm
                title="Are you sure you want to Delete this?"
                icon={
                  <Icon type="question-circle-o" style={{ color: "red" }} />
                }
              >
                <a href="#">
                  <Icon type="delete"></Icon>
                </a>
              </Popconfirm>
            </a>
          </span>
        )
      }
    ];

    return (
      <div>
        <AntTable
          title={() => <RawMaterialTitle />}
          maxlength
          nomargin
          columns={columns}
          dataSource={this.state.materialTests}
          onChange={this.handleChange}
          pagination={{ defaultPageSize: 10 }}
          size={this.state.size}
        />
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={[
            <PrimaryButton
              type={"ghost"}
              key='submit'
              onClick={this.handleCancel}
              style={{ background: "#001328", color: "white", border: "none" }}
            >
              Close
            </PrimaryButton>
          ]}
        >
          {this.state.filteredTestTrials.map((post, index) => (
            <FlexContainer>
              <p>
                <b>Trial Code : </b>
                {post.code}
              </p>
              <p>
                <b>Trial No : </b>
                {post.trialNo}
              </p>
              <p>
                <b>result: </b>
                {post.result}
              </p>
            </FlexContainer>
          ))}
        </Modal>
      </div>
    );
  }
}
