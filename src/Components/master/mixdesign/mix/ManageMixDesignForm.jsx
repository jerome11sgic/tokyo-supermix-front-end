/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Icon, Popconfirm, Divider, Modal, Table } from "antd";
import { AntTable } from "../../../styledcomponents/table/AntTabl";
import MixDesignTitle from "../titles/MixDesignTitle";
import { api } from "../../../services/AxiosService";
import Notification from "../../../Constant/Notification";
import { SWITCH_TO_EDIT_MODE } from "../../../../redux/action/master/plantlevel/PlantLevel";
import { connect } from "react-redux";

class ManageMixDesignForm extends Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    searchText: "",
    visible: false,
    size: "small",
    datalist: "",
    mixCode: "",
    MixDesignProportionData: ""
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

  showModal = code => {
    this.getMixDesignProportion(code);
    this.setState({
      visible: true,
      mixCode: code
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
  componentDidMount() {
    this.getallMixdesigns();
  }

  onChange(pageNumber) {
    console.log("Page: ", pageNumber);
  }
  getMixDesignProportion = code => {
    api(
      "GET",
      "supermix",
      "/mix-design-proportion/mix-design",
      "",
      "",
      code
    ).then(res => {
      console.log(JSON.stringify(res.data.results.mixDesignProportion));

      this.setState({
        MixDesignProportionData: res.data.results.mixDesignProportion
      });
    });
  };

  getallMixdesigns = () => {
    api("GET", "supermix", "/mix-designs", "", "", "").then(res => {
      console.log(res.data);

      this.setState({
        datalist: res.data.results.mixDesigns
      });
    });
  };
  onConfirmdelete(id) {
    console.log(id);

    api("DELETE", "supermix", "/mix-design", "", "", id).then(res => {
      console.log(res.data);
      this.getallMixdesigns();
      Notification("success", res.data.message);
    });
    console.log(this.state.id);
  }

  deleteProportionData(record) {
    console.log(record);
    console.log(this.state.mixCode);
    api("DELETE", "supermix", "/mix-design-proportion", "", "", record.id).then(
      res => {
        console.log(res.data);
        this.getMixDesignProportion(this.state.mixCode);
        Notification("success", res.data.message);
      }
    );
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
        title: "TargetSlump",
        dataIndex: "targetSlump",
        key: "targetSlump"
      },
      {
        title: "Plant",
        dataIndex: "plantName",
        key: "plantName"
      },
      {
        title: "TargetGrade",
        dataIndex: "targetGrade",
        key: "targetGrade"
      },

      {
        title: "Date",
        dataIndex: "date",
        key: "date"
      },

      {
        title: "WaterCementRatio",
        dataIndex: "waterCementRatio",
        key: "waterCementRatio"
      },
      {
        title: "WaterBinderRatio",
        dataIndex: "waterBinderRatio",
        key: "waterBinderRatio"
      },
      {
        title: "Raw Material",
        dataIndex: "rawmaterial",
        key: "rawmaterial",
        render: (text, record = this.state.datalist) => (
          <a>
            <Icon
              type="form"
              style={{ color: "green" }}
              onClick={this.showModal.bind(this, record.code)}
            />
          </a>
        )
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
                onClick={this.props.passEditMixDesignToModal.bind(this, record)}
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
                  <Icon type="delete" style={{ color: "red" }}></Icon>
                </a>
              </Popconfirm>
            </a>
          </span>
        )
      }
    ];

    const columns1 = [
      {
        title: "MaterialName",
        dataIndex: "rawMaterialName",
        key: "materialName"
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity"
      },
      {
        title: "Unit",
        dataIndex: "unit",
        key: "unitName"
      },
      {
        title: "Edit & Delete",
        key: "action",
        width: "7%",
        render: (text, record = this.state.MixDesignProportionData) => (
          <span>
            {/* <a>
              <Icon
                type="edit"
                // onClick={this.props.passEditManageCategoryToModal.bind(
                //   this,
                //   record
                // )}
              />
            </a>
            <Divider type="vertical" /> */}
            <a>
              <Popconfirm
                title="Are you sure you want to Delete this?"
                icon={
                  <Icon type="question-circle-o" style={{ color: "red" }} />
                }
                onConfirm={this.deleteProportionData.bind(this, record)}
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
          length
          title={() => <MixDesignTitle reload={this.getallMixdesigns} />}
          columns={columns}
          dataSource={this.state.datalist}
          onChange={this.handleChange}
          pagination={{ defaultPageSize: 8 }}
          size={this.state.size}
        />
        <Modal
          title=" RawMaterial Details"
          visible={this.state.visible}
          onOk={this.setJson}
          onCancel={this.handleCancel}
          footer={true}
        >
          <Table
            // showHeader={false}
            // title={() => <MixDesignTitle />}
            columns={columns1}
            dataSource={this.state.MixDesignProportionData}
            pagination={{ defaultPageSize: 8 }}
            // size={this.state.size}
          />
        </Modal>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    // if this function dispatches modal will be shown and the data will be drawn :)
    passEditMixDesignToModal: record => {
      //this payload is the data we pass into redux which is in the row which we clicked
      dispatch({ type: SWITCH_TO_EDIT_MODE, payload: record });
      console.log(record);
    }
  };
};

export default connect(null, mapDispatchToProps)(ManageMixDesignForm);
