/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Popconfirm, Divider, Icon } from "antd";
import ManageProjectMasterTitle from "../title/ManageProjectMasterTitle";
import { AntTable } from "../../../styledcomponents/table/AntTabl";
import { api } from "../../../services/AxiosService";
import { SWITCH_TO_EDIT_MODE } from "../../../../redux/action/master/plantlevel/PlantLevel";
import { connect } from "react-redux";
import Notification from "../../../Constant/Notification";

const data = [];

class ManageProject extends Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    searchText: "",
    visible: false,
    size: "small",
    projectsList: []
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
    this.getAllProject();
  }

  getAllProject = () => {
    api("GET", "supermix", "/projects", "", "", "").then(res => {
      console.log(res.data.results);
      this.setState({
        projectsList: res.data.results.projects
      });
    });
  };

  onConfirmdelete(code) {
    console.log(code);
    let mesg = "project delete";

    api("DELETE", "supermix", "/project", "", "", code).then(res => {
      console.log(res.data);
      this.getAllProject();
      Notification("success", res.data.message);
    });
    console.log(this.state.code);
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
      /* 
  code: "pr01"
  name: "yifuf"
  contactNumber: "12456494"
  contactPerson: "uhguhfuf"
  startDate: "2020-02-20"
  customerId: 1
  plantCode: "p01"
  plantName: "jaffna"
  customerName: "kiri"
  */
      {
        title: "Code",
        dataIndex: "code",
        key: "code"
        // width: "3%",
      },
      {
        title: "Project Name",
        dataIndex: "name",
        key: "name"
        // width: "6.5%",
      },

      {
        title: "Start Date",
        dataIndex: "startDate",
        key: "startDate"
        // width: "6%",
      },

      {
        title: "Customer",
        dataIndex: "customerName",
        key: "customerName"
        // width: "5%",
      },
      {
        title: "Contact Person",
        dataIndex: "contactPerson",
        key: "contactPerson"
        // width: "7%",
      },
      {
        title: "Contact Number",
        dataIndex: "contactNumber",
        key: "contactNumber"
        // width: "8%",
      },
      {
        title: "Plant",
        dataIndex: "plantName",
        key: "plantName"
        // width: "4%",
      },
      {
        title: "Edit & Delete",
        key: "action",

        render: (text, record = this.state.projectsList) => (
          <span>
            <a>
              <Icon
                type='edit'
                onClick={this.props.passEditProjectRecordToModal.bind(
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
                onConfirm={this.onConfirmdelete.bind(this, record.code)}
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
        maxlength
        title={() => <ManageProjectMasterTitle />}
        columns={columns}
        dataSource={this.state.projectsList}
        onChange={this.handleChange}
        pagination={{ defaultPageSize: 3 }}
        size={this.state.size}
      />
    );
  }
}

const mapStateToProps = state => null;

const mapDispatchToProps = dispatch => {
  return {
    passEditProjectRecordToModal: record => {
      //this payload is the data we pass into redux which is in the row which we clicked
      dispatch({ type: SWITCH_TO_EDIT_MODE, payload: record });
      console.log(record);
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageProject);
