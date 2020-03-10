/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Icon, Popconfirm, Divider } from "antd";
import { AntTable } from "../../styledcomponents/table/AntTabl";
import ManageProcessSampleTitle from "../titles/ManageProcessSampleTitle";
import { api } from "../../services/AxiosService";
import { SWITCH_TO_EDIT_MODE } from "../../../redux/action/master/plantlevel/PlantLevel";
import { connect } from "react-redux";
import Notification from "../../Constant/Notification";
class ManageProcessSample extends Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    searchText: "",
    visible: false,
    size: "small",
    dataList: []
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
        columnKey: "age"
      }
    });
  };

  onChange(pageNumber) {
    console.log("Page: ", pageNumber);
  }

  componentDidMount() {
    this.getallProcessSample();
  }

  getallProcessSample = () => {
    api("GET", "supermix", "/process-samples", "", "", "").then(res => {
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

    api("DELETE", "supermix", "/process-sample", "", "", code).then(res => {
      console.log(res.data);
      this.getallProcessSample();
      Notification("success", res.data.message);
    });
    console.log(this.state.id);
  }

  render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    //     code: "PRSS02"
    // quantity: 20
    // unitId: 9
    // unit: "g"
    // rawMaterialId: 5
    // rawMaterialName: "Cement"
    const columns = [
      {
        title: " Code",
        dataIndex: "code",
        width: "8%",
        key: "code",
        sorter: (a, b) => a.id - b.id,
        sortOrder: sortedInfo.columnKey === "id" && sortedInfo.order
      },
      {
        title: "Incoming Sample",
        dataIndex: "incomingSample.code",
        width: "12%",
        key: "incomingSample.code",
        sorter: (a, b) => a.id - b.id,
        sortOrder: sortedInfo.columnKey === "id" && sortedInfo.order
      },
      {
        title: "Material",
        dataIndex: "rawMaterialName",
        key: "rawMaterialName",
        width: "12%",

        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
        width: "12%",
        filters: [
          { text: "Vechical1", value: "Vechical1" },
          { text: "Vechical2", value: " Vechical2" },
          { text: "Vechical3", value: "Vechical3" },
          { text: "Vechical4", value: "Vechical4" }
        ],
        filteredValue: filteredInfo.role || null,
        onFilter: (value, record) => record.role.includes(value),
        sorter: (a, b) => a.role.length - b.role.length,
        sortOrder: sortedInfo.columnKey === "role" && sortedInfo.order
      },

      {
        title: "Unit",
        dataIndex: "unit",
        width: "12%",
        key: "unit",
        sorter: (a, b) => a.id - b.id,
        sortOrder: sortedInfo.columnKey === "id" && sortedInfo.order
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
      <AntTable
        title={() => (
          <ManageProcessSampleTitle reload={this.getallProcessSample} />
        )}
        length
        nomargin
        dataSource={this.state.dataList}
        columns={columns}
        onChange={this.handleChange}
        size={this.state.size}
      />
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
)(ManageProcessSample);
