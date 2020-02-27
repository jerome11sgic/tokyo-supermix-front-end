/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Popconfirm, Divider, Icon } from "antd";
import "./styleequipmentmaster.css";
import { AntTable } from "../../../styledcomponents/table/AntTabl";
import EquipmentTitle from "../title/EquipmentTitle";
import Notification from "../../../Constant/Notification";
import { api } from "../../../services/AxiosService";
import { SWITCH_TO_EDIT_MODE } from "../../../../redux/action/master/plantlevel/PlantLevel";
import { connect } from "react-redux";

class ManageNature extends Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    searchText: "",
    visible: false,
    size: "small",
    type: "add",
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

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  componentDidMount() {
    this.getallequpiment();
  }
  getallequpiment = () => {
    api("GET", "supermix", "/equipments", "", "", "").then(res => {
      console.log(res.data);

      this.setState({
        datalist: res.data.results.equipments
      });
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
  onConfirmdelete(id) {
    console.log("ddddd");
    console.log(id);
    console.log("ddddd");
    api("DELETE", "supermix", "/equipment", "", "", id).then(res => {
      console.log(res.data);
      this.getallequpiment();
      Notification("success", res.data.message);
    });
    console.log(this.state.id);
  }

  render() {
    const columns = [
      {
        title: "Equipment Name",
        dataIndex: "name",
        key: "equipment_name",
        width: "10%"
      },

      {
        title: " Description",
        dataIndex: "description",
        key: "description",
        width: "10%"
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
        length
        title={() => <EquipmentTitle reload={this.getallequpiment} />}
        columns={columns}
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

export default connect(null, mapDispatchToProps)(ManageNature);
