/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Icon, Popconfirm, Divider } from "antd";
import SupplierMasterTitle from "../titles/SupplierMasterTitle";
import { AntTable } from "../../../styledcomponents/table/AntTabl";
import { api } from "../../../services/AxiosService";
import { connect } from "react-redux";
import { SWITCH_TO_EDIT_MODE } from "../../../../redux/action/master/plantlevel/PlantLevel";
import Notification from "../../../Constant/Notification";

class ManageSupplier extends Component {
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
    this.getallSupplier();
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

  getallSupplier = () => {
    api("GET", "supermix", "/suppliers", "", "", "").then(res => {
      console.log(res.data);
      this.setState({
        data: res.data.results.Supplier
      });
    });
  };

  onConfirmdelete(id) {
    console.log(id);
    let mesg = "suppliers delete";

    api("DELETE", "supermix", "/supplier", "", "", id).then(res => {
      console.log(res.data);
      this.getallSupplier();
      Notification("success", res.data.message);
    });
    console.log(this.state.id);
  }

  render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};

    const columns = [
      {
        title: "Supplier Name",
        dataIndex: "name",
        key: "supplier_name",
        width: "7%"
      },

      {
        title: "Supplier Category",
        dataIndex: "suppilerCategory",
        key: "supplier_category",
        width: "8%"
      },

      {
        title: "Company",
        dataIndex: "companyName",
        key: "company",
        width: "5%"
      },
      {
        title: "Contact No",
        dataIndex: "phoneNumber",
        key: "contact_no",
        width: "6%"
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        width: "6%"
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
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
                type='edit'
                style={{ fontSize: "1.2em" }}
                onClick={this.props.passSupplireEditRecordtoModal.bind(
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
        title={() => <SupplierMasterTitle reload={this.getallSupplier} />}
        className='plantManageTable'
        columns={columns}
        dataSource={this.state.data}
        onChange={this.handleChange}
        pagination={{ defaultPageSize: 4 }}
        size={this.state.size}
        style={{
          background: "white",
          border: "none",
          borderRadius: "15px",
          marginLeft: "15px",
          marginTop: "20px"
        }}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // if this function dispatches modal will be shown and the data will be drawn :)
    passSupplireEditRecordtoModal: record => {
      //this payload is the data we pass into redux which is in the row which we clicked
      dispatch({ type: SWITCH_TO_EDIT_MODE, payload: record });
      console.log(record);
    }
  };
};

export default connect(null, mapDispatchToProps)(ManageSupplier);
