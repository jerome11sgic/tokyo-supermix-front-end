/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Icon, Popconfirm, Divider } from "antd";
import EmployeeMasterTitle from "../titles/EmployeeMasterTitle";
import { AntTable } from "../../../styledcomponents/table/AntTabl";
import { api } from "../../../services/AxiosService";
import Notification from "../../../Constant/Notification";
import { connect } from "react-redux";
import { SWITCH_TO_EDIT_MODE } from "../../../../redux/action/master/plantlevel/PlantLevel";
// const Search = Input.Search;

const list = [
  {
    firstName: "shkdbfgj",
    lastName: "hbffdg",
    plantName: "trinco",
    designationName: "sfdrr",
    address: "trinco",
    phoneNumber: "56468",
    username: "kasejtrrs",
    email: "kidadfsbg@sdvs.asdf"
  }
];

class ManageQCStaff extends Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    searchText: "",
    visible: false,
    size: "small",
    data: ""
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
    this.getallEmployee();
  }

  getallEmployee = () => {
    api("GET", "supermix", "/employees", "", "", "").then(res => {
      console.log(res.data);
      this.setState({
        data: res.data.results.employees
      });
    });
  };

  onConfirmdelete(id) {
    console.log(id);
    let mesg = "employee delete";

    api("DELETE", "supermix", "/employee", "", "", id).then(res => {
      console.log(res.data);
      this.getallEmployee();
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
      // {
      //   title: "Code",
      //   dataIndex: "code",
      //   key: "id",
      //   width: "4%"
      // },
      {
        title: "First Name",
        dataIndex: "firstName",
        key: "firstName",
        width: "6%"
      },
      {
        title: "Last Name",
        dataIndex: "lastName",
        key: "lastName",
        width: "6%"
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        width: "6%"
      },
      {
        title: "Plant",
        dataIndex: "plantName",
        key: "role",
        width: "6%"
      },
      {
        title: "Designation",
        dataIndex: "designationName",
        key: "email",
        width: "6%"
      },
      {
        title: "Phone Number",
        dataIndex: "phoneNumber",
        key: "phoneNumber",
        width: "6%"
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
        width: "7%"
      },

      // {
      //   title: "address",
      //   dataIndex: "phoneNumber",
      //   key: "detalis",
      //   width: "7%",
      //   render: () => (
      //     <a onClick={this.showModal}>
      //       <Icon type="solution" />
      //     </a>
      //   )
      // },
      {
        title: "Edit & Delete",
        key: "action",
        width: "7%",
        render: (text, record = this.state.data) => (
          <span>
            <a>
              <Icon
                type='edit'
                style={{ fontSize: "1.2em" }}
                onClick={this.props.passEditQCStaffRecordToModal.bind(
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
                  <Icon
                    type='delete'
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
        maxlength
        title={() => <EmployeeMasterTitle reload={this.getallEmployee} />}
        className='plantManageTable'
        columns={columns}
        dataSource={this.state.data}
        onChange={this.handleChange}
        pagination={{ defaultPageSize: 4 }}
        size={this.state.size}
      />
    );
  }
}

const mapStateToProps = state => null;

const mapDispatchToProps = dispatch => {
  return {
    passEditQCStaffRecordToModal: record => {
      //this payload is the data we pass into redux which is in the row which we clicked
      dispatch({ type: SWITCH_TO_EDIT_MODE, payload: record });
      console.log(record);
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageQCStaff);
