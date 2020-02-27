/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Popconfirm, Divider, Icon } from "antd";

import CalibrationTitle from "../title/CalibrationTitle";
import { AntTable } from "../../../styledcomponents/table/AntTabl";
import Notification from "../../../Constant/Notification";
import { api } from "../../../services/AxiosService";
import { SWITCH_TO_EDIT_MODE } from "../../../../redux/action/master/plantlevel/PlantLevel";
import { connect } from "react-redux";

class ManageCalibration extends Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    searchText: "",
    visible: false,
    size: "small",
    datalist: ""
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
    console.log("ffhfhhfh");
    this.getallplantCalibration();
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

  getallplantCalibration() {
    api("GET", "supermix", "/plant-equipment-calibrations", "", "", "").then(
      res => {
        console.log(res.data);

        this.setState({
          datalist: res.data.results.equipmentPlantCalibrations
        });
      }
    );
  }
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
  onConfirmdelete(id) {
    console.log("ddddd");
    console.log(id);
    console.log("ddddd");
    api("DELETE", "supermix", "/plant-equipment-calibration", "", "", id).then(
      res => {
        console.log(res.data);
        this.getallplantCalibration();
        Notification("success", res.data.message);
      }
    );
    console.log(this.state.id);
  }

  render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: "Code",
        dataIndex: "code",
        key: "code"
      },

      {
        title: "Equipment Name",
        dataIndex: "plantEquipmentEquipmentName",
        key: "calibrated_date"
      },

      {
        title: "Calibrated Date",
        dataIndex: "calibratedDate",
        key: "calibrated_date"
      },

      {
        title: "Due Date",
        dataIndex: "dueDate",
        key: "due_date"
      },
      {
        title: "Calibrated By",
        dataIndex: "userUsername",
        key: "calibrated_by"
      },
      {
        title: "Company",
        dataIndex: "supplierName",
        key: "company"
      },
      {
        title: "Tester",
        dataIndex: "userUsername",
        key: "tester"
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description"
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "description"
      },
      {
        title: "Edit & Delete",
        key: "action",
        width: "7%",
        render: (text, record = this.state.datalist) => (
          <span>
            <a>
              <Icon
                type="edit"
                onClick={this.props.passEditManageCategoryToModal.bind(
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
                  <Icon type="delete" style={{ color: "red" }}></Icon>
                </a>
              </Popconfirm>
            </a>
          </span>
        )
      }
    ];

    return (
      <AntTable
        title={() => <CalibrationTitle />}
        columns={columns}
        maxlength
        dataSource={this.state.datalist}
        onChange={this.handleChange}
        pagination={{ defaultPageSize: 8 }}
        size={this.state.size}
      />
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    // if this function dispatches modal will be shown and the data will be drawn :)
    passEditManageCategoryToModal: record => {
      //this payload is the data we pass into redux which is in the row which we clicked
      dispatch({ type: SWITCH_TO_EDIT_MODE, payload: record });
      console.log(record);
    }
  };
};

export default connect(null, mapDispatchToProps)(ManageCalibration);
