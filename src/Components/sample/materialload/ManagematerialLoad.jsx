/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Popconfirm, Divider, Icon } from "antd";
import { api } from "../../services/AxiosService";
import { AntTable } from "../../styledcomponents/table/AntTabl";
import ManageMaterialLoadSampleTitle from "../titles/ManageMaterialLoadSample";
import { SWITCH_TO_EDIT_MODE } from "../../../redux/action/master/plantlevel/PlantLevel";
import { connect } from "react-redux";

const data = [];

class ManageMaterialLoad extends Component {
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
    this.getallProcessSampleLoad();
  }

  getallProcessSampleLoad = () => {
    api("GET", "supermix", "/process-sample-load", "", "", "").then(res => {
      console.log(res.data.results.processSampleLoad);
      this.setState({
        dataList: res.data.results.processSampleLoad
      });
    });
  };
  onConfirmdelete(id) {
    console.log(id);
    let mesg = "employee delete";

    api("DELETE", "supermix", "/process-sample-load", "", "", id).then(res => {
      console.log(res.data);
      this.getallProcessSampleLoad();
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
        title: "Code",
        dataIndex: "code",
        key: "code"
      },
      {
        title: "Incoming Sample",
        dataIndex: "incomingSample",
        key: "incomingSample"
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity"
      },
      {
        title: "Measurement",
        dataIndex: "measurement",
        key: "measurement"
      },

      {
        title: "Date",
        dataIndex: "date",
        key: "date"
      },
      {
        title: "Expiry Date",
        dataIndex: "expiryDate",
        key: "expiryDate"
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
            <ManageMaterialLoadSampleTitle
              reload={this.getallProcessSampleLoad}
            />
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
    passEditQCStaffRecordToModal: record => {
      //this payload is the data we pass into redux which is in the row which we clicked
      dispatch({ type: SWITCH_TO_EDIT_MODE, payload: record });
      console.log(record);
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageMaterialLoad);
