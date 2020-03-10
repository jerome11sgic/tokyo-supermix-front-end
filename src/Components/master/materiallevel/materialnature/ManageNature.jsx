/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Table, Popconfirm, Divider, Icon } from "antd";
import NatureTitle from "../titles/MaterialNatureTitle";
import { AntTable } from "../../../styledcomponents/table/AntTabl";
import { SWITCH_TO_EDIT_MODE } from "../../../../redux/action/master/plantlevel/PlantLevel";
import { connect } from "react-redux";
import { api } from "../../../services/AxiosService";
import Notification from "../../../Constant/Notification";

class ManageNature extends Component {
  state = {
    visible: false,
    size: "small",
    type: "add",
    data: []
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

  onChange(pageNumber) {
    console.log("Page: ", pageNumber);
  }

  componentDidMount() {
    this.getallMaterialStates();
  }

  //get all
  getallMaterialStates = () => {
    console.log("api");
    api("GET", "supermix", "/material-states", "", "", "").then(res => {
      console.log(res);
      this.setState({
        data: res.data.results.materialState
      });
    });
  };

  //delete
  onConfirmdelete(code) {
    console.log("delete");
    console.log(code);
    let mesg = "equipmentplant delete";

    api("DELETE", "supermix", "/material-state", "", "", code).then(res => {
      console.log(res.data);
      this.getallMaterialStates();
      Notification("success", res.data.message);
    });
    console.log(this.state.id);
  }
  render() {
    const columns = [
      {
        width: "3%"
      },
      {
        title: "Material State",
        dataIndex: "materialState",
        key: "materialState",
        width: "8%"
      },
      {
        title: "Edit & Delete",
        key: "action",
        width: "6%",
        render: (text, record = this.state.data) => (
          <span>
            <a>
              <Icon
                type="edit"
                onClick={this.props.passEditMaterialStateRecordtoModal.bind(
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
        title={() => <NatureTitle reload={this.getallMaterialStates} />}
        columns={columns}
        dataSource={this.state.data}
        onChange={this.handleChange}
        pagination={{ defaultPageSize: 8 }}
        size={this.state.size}
      />
    );
  }
}

const mapStateToProps = state => null;

const mapDispatchToProps = dispatch => {
  return {
    // if this function dispatches modal will be shown and the data will be drawn :)
    passEditMaterialStateRecordtoModal: record => {
      //this payload is the data we pass into redux which is in the row which we clicked
      dispatch({ type: SWITCH_TO_EDIT_MODE, payload: record });
      console.log(record);
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageNature);
