/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Icon, Popconfirm, Divider } from "antd";
import CustomerMasterTitle from "../titles/CustomerMasterTitle";
import { AntTable } from "../../../styledcomponents/table/AntTabl";
import { connect } from "react-redux";
import { SWITCH_TO_EDIT_MODE } from "../../../../redux/action/master/plantlevel/PlantLevel";

let customers = [
  {
    id: 0,
    name: "Kishanth",
    address: "Jaffna",
    contactno: "0766713231",
    email: "kishanth001@gmail.com"
  }
];

class ManageCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredInfo: null,
      sortedInfo: null,
      searchText: "",
      visible: false,
      size: "small"
    };
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
      //   title: "ID",
      //   dataIndex: "id",
      //   width: "7%",
      //   key: "id",
      //   sorter: (a, b) => a.id - b.id,
      //   sortOrder: sortedInfo.columnKey === "id" && sortedInfo.order
      // },
      // {
      //   title: "Date",
      //   dataIndex: "date",
      //   width: "10%",
      //   key: "id",
      //   sorter: (a, b) => a.id - b.id,
      //   sortOrder: sortedInfo.columnKey === "id" && sortedInfo.order
      // },
      {
        title: "Customer Name",
        dataIndex: "name",
        key: "name",
        width: "16%"
      },
      {
        title: "Contact No",
        dataIndex: "contactno",
        key: "contactno",
        width: "15%"
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        width: "14%"
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
        width: "10%"
      },
      {
        title: "Edit & Delete",
        key: "action",
        width: "7%",
        render: (text, record) => (
          <span>
            <a>
              <Icon
                type="edit"
                onClick={this.props.passEditManageCustomerToModal.bind(
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
        title={() => <CustomerMasterTitle />}
        className="plantManageTable"
        columns={columns}
        dataSource={customers}
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
    passEditManageCustomerToModal: record => {
      //this payload is the data we pass into redux which is in the row which we clicked
      dispatch({ type: SWITCH_TO_EDIT_MODE, payload: record });
      console.log(record);
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCustomer);
