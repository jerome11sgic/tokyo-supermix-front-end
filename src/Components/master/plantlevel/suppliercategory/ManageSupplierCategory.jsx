/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Popconfirm, Divider, Icon } from "antd";
import SupplierCategoryTitle from "../titles/SupplierCategoryTitle";
import { AntTable } from "../../../styledcomponents/table/AntTabl";
import { api } from "../../../services/AxiosService";
import { SWITCH_TO_EDIT_MODE } from "../../../../redux/action/master/plantlevel/PlantLevel";
import { connect } from "react-redux";
import Notification from "../../../Constant/Notification";

const data = [];

class ManageSupplierCategory extends Component {
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
    this.getallsupplireCategory();
  }

  getallsupplireCategory = () => {
    api("GET", "supermix", "/supplier-categories", "", "", "").then(res => {
      console.log(res.data);
      let a = "supplier - category";

      this.setState({
        datalist: res.data.results.supplierCategory
      });
    });
  };

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
  onConfirmdelete(id) {
    console.log(id);
    let mesg = "plant delete";

    api("DELETE", "supermix", "/supplier-category", "", "", id).then(res => {
      console.log(res.data);
      this.getallsupplireCategory();
      Notification("success", res.data.message);
    });
    console.log(this.state.id);
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
      //   width: "4%"
      // },

      {
        title: "Category Type",
        dataIndex: "category",
        key: "category",
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
        render: (text, record = this.state.datalist) => (
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
                title="Are you sure you want to Delete this Supplier Category?"
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
        title={() => (
          <SupplierCategoryTitle reload={this.getallsupplireCategory} />
        )}
        columns={columns}
        dataSource={this.state.datalist}
        onChange={this.handleChange}
        pagination={{ defaultPageSize: 8 }}
        size={this.state.size}
      />
    );
  }
}

const mapStateToProps = state => {};

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

export default connect(null, mapDispatchToProps)(ManageSupplierCategory);
