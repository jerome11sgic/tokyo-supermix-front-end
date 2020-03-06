/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Icon, Popconfirm, Divider, Modal, Table } from "antd";
import { AntTable } from "../../../styledcomponents/table/AntTabl";
import MixDesignTitle from "../titles/MixDesignTitle";
import { api } from "../../../services/AxiosService";

export default class ManageMixDesignForm extends Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    searchText: "",
    visible: false,
    size: "small",
    datalist: "",
    mixCode: ""
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
    console.log(code);
  };

  getallMixdesigns = () => {
    api("GET", "supermix", "/mix-designs", "", "", "").then(res => {
      console.log(res.data);

      this.setState({
        datalist: res.data.results.mixDesigns
      });
    });
  };

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
        dataIndex: "targetStrength",
        key: "targetStrength"
      },
      {
        title: "Plant",
        dataIndex: "plantName",
        key: "plantName"
      },
      {
        title: "Grade",
        dataIndex: "grade",
        key: "grade"
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
              type="edit"
              onClick={this.showModal.bind(this, record.code)}
            />
          </a>
        )
      },

      {
        title: "Edit & Delete",
        key: "action",
        width: "7%",
        render: (text, record) => (
          <span>
            <a>
              <Icon type="edit" />
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
                  <Icon type="delete"></Icon>
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
        dataIndex: "materialName",
        key: "materialName"
      },
      {
        title: "Category",
        dataIndex: "category",
        key: "category"
      },
      {
        title: "SubCategory",
        dataIndex: "subCategoryName",
        key: "subCategoryName"
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity"
      },
      {
        title: "Unit",
        dataIndex: "unitName",
        key: "unitName"
      }
    ];

    return (
      <div>
        <AntTable
          length
          title={() => <MixDesignTitle />}
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
            showHeader={false}
            // title={() => <MixDesignTitle />}
            columns={columns1}
            // dataSource={this.state.datalist}
            pagination={{ defaultPageSize: 8 }}
            // size={this.state.size}
          />
        </Modal>
      </div>
    );
  }
}
