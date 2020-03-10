/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Popconfirm, Divider, Icon } from "antd";

import { AntTable } from "../../styledcomponents/table/AntTabl";
import ManageFinishProductSampleTitle from "../titles/ManageFinishProductSampleTitle";
import Notification from "../../Constant/Notification";
import { api } from "../../services/AxiosService";
import { SWITCH_TO_EDIT_MODE } from "../../../redux/action/master/plantlevel/PlantLevel";
import { connect } from "react-redux";

class ManageFinishProduct extends Component {
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
  componentDidMount() {
    this.getallfinshProduct();
  }

  getallfinshProduct = () => {
    api("GET", "supermix", "/finish-products", "", "", "").then(res => {
      console.log(res.data.results.FinishProducts);

      this.setState({
        datalist: res.data.results.FinishProducts
      });
    });
  };
  onConfirmdelete(id) {
    console.log("ddddd");
    console.log(id);

    api("DELETE", "supermix", "/finish-product", "", "", id).then(res => {
      console.log(res.data);
      this.getallfinshProduct();
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
        title: "Mix Design",
        dataIndex: "mixDesignCode",
        key: "mixdesign"
      },
      {
        title: "Project",
        dataIndex: "projectName",
        key: "project"
      },
      {
        title: "Pour",
        dataIndex: "pourName",
        key: "pour"
      },
      {
        title: " Date",
        dataIndex: "date",
        key: "date"
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
                onClick={this.props.passEditFinishProductToModal.bind(
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
      <div>
        <AntTable
          maxlength
          nomargin
          title={() => (
            <ManageFinishProductSampleTitle reload={this.getallfinshProduct} />
          )}
          columns={columns}
          dataSource={this.state.datalist}
          onChange={this.handleChange}
          pagination={{ defaultPageSize: 3 }}
          size={this.state.size}
        />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    // if this function dispatches modal will be shown and the data will be drawn :)
    passEditFinishProductToModal: record => {
      //this payload is the data we pass into redux which is in the row which we clicked
      dispatch({ type: SWITCH_TO_EDIT_MODE, payload: record });
      console.log(record);
    }
  };
};

export default connect(null, mapDispatchToProps)(ManageFinishProduct);
