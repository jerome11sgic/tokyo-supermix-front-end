/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Popconfirm, Divider, Icon } from "antd";

import "./styleStatus.css";
import { AntTable } from "../../../styledcomponents/table/AntTabl";
import TestLevelTitle from "../title/TestLevelTitle";
import { connect } from "react-redux";
import { SWITCH_TO_EDIT_MODE } from "../../../../redux/action/master/plantlevel/PlantLevel";
import { api } from "../../../services/AxiosService";
import Notification from "../../../Constant/Notification";

// const data = [{ id: "QC/MA", type: "QC Manager" }];

class ManageTestType extends Component {
  state = {
    visible: false,
    size: "small",
    testTypeList: []
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

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    });
  };

  onChange(pageNumber) {
    console.log("Page: ", pageNumber);
  }

  componentDidMount() {
    this.getAllTestType();
  }

  getAllTestType = () => {
    api("GET", "supermix", "/test-types", "", "", "").then(res => {
      console.log(res.data.results);
      this.setState({
        testTypeList: res.data.results.testTypes
      });
    });
  };

  onConfirmdelete(id) {
    console.log(id);
    let mesg = "pour delete";

    api("DELETE", "supermix", "/test-type", "", "", id).then(res => {
      console.log(res.data);
      this.getAllTestType();
      Notification("success", res.data.message);
    });
  }

  render() {
    const columns = [
      {
        title: "Code",
        dataIndex: "id",
        key: "id"
        // width: "4%",
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type"
        // width: "6%",
      },

      {
        title: "Edit & Delete",
        key: "action",
        width: "17%",
        render: (text, record = this.state.testTypeList) => (
          <span>
            <a>
              <Icon
                type='edit'
                onClick={this.props.passEditTestTypeRecordToModal.bind(
                  this,
                  record
                )}
              />
            </a>
            <Divider type='vertical' />
            <a>
              <Popconfirm
                title='Are you sure you want to Delete this?'
                icon={
                  <Icon type='question-circle-o' style={{ color: "red" }} />
                }
                onConfirm={this.onConfirmdelete.bind(this, record.id)}
              >
                <a href='#'>
                  <Icon type='delete' style={{ color: "red" }}></Icon>
                </a>
              </Popconfirm>
            </a>
          </span>
        )
      }
    ];

    return (
      <AntTable
        length
        title={() => <TestLevelTitle reload={this.getAllTestType} />}
        columns={columns}
        dataSource={this.state.testTypeList}
        onChange={this.handleChange}
        pagination={{ defaultPageSize: 7 }}
        size={this.state.size}
      />
    );
  }
}

const mapStateToProps = state => null;

const mapDispatchToProps = dispatch => {
  return {
    passEditTestTypeRecordToModal: record => {
      //this payload is the data we pass into redux which is in the row which we clicked
      dispatch({ type: SWITCH_TO_EDIT_MODE, payload: record });
      console.log(record);
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageTestType);
