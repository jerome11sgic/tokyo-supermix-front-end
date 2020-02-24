/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Popconfirm, Divider, Icon } from "antd";
import UserRoleMasterTitle from "../titles/UserRoleMasterTitle";
import { AntTable } from "../../../styledcomponents/table/AntTabl";
import { api } from "../../../services/AxiosService";
import Notification from "../../../Constant/Notification";
import { SWITCH_TO_EDIT_MODE } from "../../../../redux/action/master/plantlevel/PlantLevel";
import { connect } from "react-redux";

const data = [];

class ManageUserRoles extends Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    searchText: "",
    visible: false,
    size: "small",
    listData: ""
    // listData: {

    // }
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
    this.getalldesignation();
  }

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

  getalldesignation = () => {
    api("GET", "supermix", "/designations", "", "", "").then(res => {
      console.log(res.data);
      this.setState({
        listData: res.data.results.designations
      });
    });
  };

  onConfirmdelete(id) {
    console.log(id);
    let mesg = "plant delete";

    api("DELETE", "supermix", "/designation", "", "", id).then(res => {
      console.log(res.data);
      this.getalldesignation();
      Notification("success", res.data.message);
    });
    console.log(this.state.id);
  }

  onChange(pageNumber) {
    console.log("Page: ", pageNumber);
  }

  render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      // {
      //   title: "Code",
      //   dataIndex: "id",
      //   key: "code",
      //   width: "4%",

      //   filteredValue: filteredInfo.name || null,
      //   onFilter: (value, record) => record.name.includes(value),
      //   sorter: (a, b) => a.code - b.code,
      //   sortOrder: sortedInfo.columnKey === "code" && sortedInfo.order
      // },
      {
        title: "Designation",
        dataIndex: "name",
        key: "designation",
        width: "10%"
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        width: "12%"
      },
      {
        title: "Edit & Delete",
        key: "action",
        width: "7%",
        render: (text, record = this.state.listData) => (
          <span>
            <a>
              <Icon
                type="edit"
                style={{ fontSize: "1.2em" }}
                onClick={this.props.passEditDesignationRecordToModal.bind(
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
        className="userRolesManageTable"
        title={() => <UserRoleMasterTitle reload={this.getalldesignation} />}
        columns={columns}
        dataSource={this.state.listData}
        onChange={this.handleChange}
        pagination={{ defaultPageSize: 8 }}
        size={this.state.size}
      />
    );
  }
}

const mapStateToProps = state => {
  // return {
  //   visible: state.plantLevelReducers.EditPlantReducer.visible,
  //   type: state.plantLevelReducers.EditPlantReducer.type,
  //   editPlantData: state.plantLevelReducers.EditPlantReducer.editPlantData
  // };
};

const mapDispatchToProps = dispatch => {
  return {
    // if this function dispatches modal will be shown and the data will be drawn :)
    passEditDesignationRecordToModal: record => {
      //this payload is the data we pass into redux which is in the row which we clicked
      dispatch({ type: SWITCH_TO_EDIT_MODE, payload: record });
      console.log(record);
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageUserRoles);
