/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Popconfirm, Divider, Icon } from "antd";
import ManagePourMasterTitle from "../title/ManagePourMasterTitle";
import { AntTable } from "../../../styledcomponents/table/AntTabl";
import { connect } from "react-redux";
import { SWITCH_TO_EDIT_MODE } from "../../../../redux/action/master/plantlevel/PlantLevel";
import { api } from "../../../services/AxiosService";
import Notification from "../../../Constant/Notification";
const data = [];

class ManagePour extends Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    searchText: "",
    visible: false,
    size: "small",
    poursList: []
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
    this.getAllPour();
  }

  getAllPour = () => {
    api("GET", "supermix", "/pours", "", "", "").then(res => {
      console.log(res.data.results);
      this.setState({
        poursList: res.data.results.Pour
      });
    });
  };

  onConfirmdelete(id) {
    console.log(id);
    let mesg = "pour delete";

    api("DELETE", "supermix", "/pour", "", "", id).then(res => {
      console.log(res.data);
      this.getAllPour();
      Notification("success", res.data.message);
    });
    console.log(this.state.id);
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
        columnKey: "code"
      }
    });
  };

  onChange(pageNumber) {
    console.log("Page: ", pageNumber);
  }

  render() {
    const columns = [
      // {
      //   title: "Code",
      //   dataIndex: "id",
      //   key: "id"
      // },
      {
        title: "Pour Name",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Project",
        dataIndex: "projectName",
        key: "projectName"
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description"
      },

      {
        title: "Edit & Delete",
        key: "action",
        width: "7%",
        render: (text, record = this.state.poursList) => (
          <span>
            <a>
              <Icon
                type="edit"
                onClick={this.props.passEditPourRecordToModal.bind(
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
        maxlength
        title={() => <ManagePourMasterTitle reload={this.getAllPour} />}
        columns={columns}
        dataSource={this.state.poursList}
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
    passEditPourRecordToModal: record => {
      //this payload is the data we pass into redux which is in the row which we clicked
      dispatch({ type: SWITCH_TO_EDIT_MODE, payload: record });
      console.log(record);
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePour);
