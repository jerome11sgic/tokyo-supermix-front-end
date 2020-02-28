/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Popconfirm, Divider, Icon } from "antd";

import { AntTable } from "../../../styledcomponents/table/AntTabl";
import ParameterTitle from "../titles/ParameterTitle";
import { api } from "../../../services/AxiosService";
import { SWITCH_TO_EDIT_MODE } from "../../../../redux/action/master/plantlevel/PlantLevel";
import { connect } from "react-redux";
import Notification from "../../../Constant/Notification";

class ManageParameterMaster extends Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    searchText: "",
    visible: false,
    size: "small",
    data: "",
    id: ""
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
    this.getallParameter();
  }

  getallParameter = () => {
    api("GET", "supermix", "/parameters", "", "", "").then(res => {
      console.log(res.data);
      this.setState({
        data: res.data.results.parameters
      });
    });
  };

  onConfirmdelete(code) {
    console.log(code);
    let mesg = "Parameter delete";

    api("DELETE", "supermix", "/parameter", "", "", code).then(res => {
      console.log(res.data);
      this.getallParameter();
      Notification("success", res.data.message);
    });
    console.log(this.state.id);
  }

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
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
        columnKey: "age"
      }
    });
  };

  onChange(pageNumber) {
    console.log("Page: ", pageNumber);
  }

  render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: " Parameter Name",
        dataIndex: "name",
        key: "name",
        width: "6%"
      },
      {
        title: " Abbrivation",
        dataIndex: "abbreviation",
        key: "abbrivation",
        width: "6%"
      },
      {
        title: "Edit & Delete",
        key: "action",
        width: "7%",
        render: (text, record = this.state.data) => (
          <span>
            <a>
              <Icon
                type="edit"
                style={{ fontSize: "1.2em" }}
                onClick={this.props.passEditPlantRecordtoModal.bind(
                  this,
                  record
                )}
              />
            </a>
            <Divider type="vertical" />
            <a>
              <Popconfirm
                title="Are you sure you want to Delete this?"
                icon={
                  <Icon type="question-circle-o" style={{ color: "red" }} />
                }
                onConfirm={this.onConfirmdelete.bind(this, record.id)}
              >
                <a href="#">
                  <Icon
                    type="delete"
                    style={{ color: "red", fontSize: "1.2em" }}
                  />
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
        title={() => <ParameterTitle reload={this.getallParameter} />}
        columns={columns}
        onChange={this.handleChange}
        dataSource={this.state.data}
        pagination={{ defaultPageSize: 7 }}
        size={this.state.size}
      />
    );
  }
}

const mapStateToProps = state => null;

const mapDispatchToProps = dispatch => {
  return {
    // if this function dispatches modal will be shown and the data will be drawn :)
    passEditPlantRecordtoModal: record => {
      //this payload is the data we pass into redux which is in the row which we clicked
      dispatch({ type: SWITCH_TO_EDIT_MODE, payload: record });
      console.log(record);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageParameterMaster);
