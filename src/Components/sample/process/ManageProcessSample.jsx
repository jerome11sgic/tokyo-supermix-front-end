import React, { Component } from "react";
import { Icon, Popconfirm, Divider } from "antd";
import { AntTable } from "../../styledcomponents/table/AntTabl";
import ManageProcessSampleTitle from "../titles/ManageProcessSampleTitle";
import { api } from "../../services/AxiosService";
import { SWITCH_TO_EDIT_MODE } from "../../../redux/action/master/plantlevel/PlantLevel";
import { connect } from "react-redux";

class ManageProcessSample extends Component {
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
      console.log(res.data);
      this.setState({
        data: res.data.results.processSamples
      });
    });
  };

  onConfirmdelete(id) {
    console.log(id);
    let mesg = "process Sample delete";

    api("DELETE", "supermix", "/process-samples", "", "", id).then(res => {
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
    const columns = [
      {
        title: " Code",
        dataIndex: "code",
        width: "8%",
        key: "code"
      },
      // {
      //   title: "Incoming Sample",
      //   dataIndex: "incomingSampleCode",
      //   width: "12%",
      //   key: "incomingSampleCode"
      // },
      {
        title: "  Incoming Sample",
        dataIndex: "rawMaterialId",
        key: "material",
        width: "12%"
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
        width: "12%"
      },

      {
        title: "Unit",
        dataIndex: "unit",
        width: "12%",
        key: "unit"
      },

      {
        title: "Edit & Delete",
        key: "action",
        width: "10%",
        render: (text, record = this.state.data) => (
          <span>
            <a>
              <Icon
                type="edit"
                style={{ fontSize: "1.2em" }}
                onClick={this.props.passEditProcessSampleRecordToModal.bind(
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
                onConfirm={this.onConfirmdelete.bind(this, record.code)}
              >
                <a href="#">
                  <Icon type="delete"></Icon>
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
        dataSource={this.state.data}
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
    passEditProcessSampleRecordToModal: record => {
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
