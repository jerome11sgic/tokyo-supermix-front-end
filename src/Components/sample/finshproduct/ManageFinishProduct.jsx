/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Popconfirm, Divider, Icon } from "antd";

import { AntTable } from "../../styledcomponents/table/AntTabl";
import ManageFinishProductSampleTitle from "../titles/ManageFinishProductSampleTitle";
import { api } from "../../services/AxiosService";
import { connect } from "react-redux";
import { SWITCH_TO_EDIT_MODE } from "../../../redux/action/master/plantlevel/PlantLevel";

class ManageFinishProduct extends Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    searchText: "",
    visible: false,
    size: "small"
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
    this.getallfinishproduct();
  }

  getallfinishproduct = () => {
    api("GET", "supermix", "/finish-products", "", "", "").then(res => {
      console.log(res.data.results.processSamples);
      this.setState({
        dataList: res.data.results.processSamples
      });
    });
  };
  onConfirmdelete(code) {
    console.log("delete");
    console.log(code);
    let mesg = "equipmentplant delete";

    api("DELETE", "supermix", "/finish-product", "", "", code).then(res => {
      console.log(res.data);
      this.getallfinishproduct();
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
        dataIndex: "mixdesign",
        key: "mixdesign",

        filteredValue: filteredInfo.name || null,
        onFilter: (value, record) => record.name.includes(value),
        sorter: (a, b) => a.user - b.user,
        sortOrder: sortedInfo.columnKey === "user" && sortedInfo.order
      },
      {
        title: "Project",
        dataIndex: "project",
        key: "project",

        filteredValue: filteredInfo.name || null,
        onFilter: (value, record) => record.name.includes(value),
        sorter: (a, b) => a.user - b.user,
        sortOrder: sortedInfo.columnKey === "user" && sortedInfo.order
      },
      {
        title: "Pour",
        dataIndex: "Pour",
        key: "pour",

        filteredValue: filteredInfo.name || null,
        onFilter: (value, record) => record.name.includes(value),
        sorter: (a, b) => a.user - b.user,
        sortOrder: sortedInfo.columnKey === "user" && sortedInfo.order
      },
      {
        title: " Date",
        dataIndex: "date",
        key: "date",

        filteredValue: filteredInfo.name || null,
        onFilter: (value, record) => record.name.includes(value),
        sorter: (a, b) => a.user - b.user,
        sortOrder: sortedInfo.columnKey === "user" && sortedInfo.order
      },

      {
        title: "Edit & Delete",
        key: "action",
        width: "7%",
        render: (text, record = this.state.datalist) => (
          <span>
            <a>
              <Icon
                type='edit'
                style={{ fontSize: "1.2em" }}
                onClick={this.props.passEditincomingRecordToModal.bind(
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
      <div>
        <AntTable
          maxlength
          nomargin
          title={() => (
            <ManageFinishProductSampleTitle reload={this.getallfinishproduct} />
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
const mapStateToProps = state => null;

const mapDispatchToProps = dispatch => {
  return {
    passEditincomingRecordToModal: record => {
      //this payload is the data we pass into redux which is in the row which we clicked
      dispatch({ type: SWITCH_TO_EDIT_MODE, payload: record });
      console.log(record);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageFinishProduct);
