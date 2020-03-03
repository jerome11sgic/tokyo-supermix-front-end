/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Icon, Popconfirm, Divider } from "antd";
import { AntTable } from "../../../styledcomponents/table/AntTabl";
import MixDesignTitle from "../titles/MixDesignTitle";
import { api } from "../../../services/AxiosService";

export default class ManageMixDesignNew extends Component {
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

  componentDidMount() {
    this.getAllMixDesign();
  }

  getAllMixDesign = () => {
    api("GET", "supermix", "/mix-design", "", "", "").then(res => {
      console.log(res.data.results);
      this.setState({
        projectsList: res.data.results.projects
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

  render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: "Code",
        dataIndex: "code",
        key: "id",

        filters: [
          { text: "Joe", value: "Joe" },
          { text: "Jim", value: "Jim" }
        ],
        filteredValue: filteredInfo.name || null,
        onFilter: (value, record) => record.name.includes(value),
        sorter: (a, b) => a.id - b.id,
        sortOrder: sortedInfo.columnKey === "id" && sortedInfo.order
      },
      {
        title: "Product Name",
        dataIndex: "productName",
        key: "name",

        filters: [
          { text: "Joe", value: "Joe" },
          { text: "Jim", value: "Jim" }
        ],
        filteredValue: filteredInfo.name || null,
        onFilter: (value, record) => record.name.includes(value),
        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order
      },
      {
        title: "Plant",
        dataIndex: "plant",
        key: "plant",

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
        title: "Grade",
        dataIndex: "grade",
        key: "grade",

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
        title: "Date",
        dataIndex: "date",
        key: "date",

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
        title: "Raw Material",
        dataIndex: "rawmaterial",
        key: "rawmaterial",

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
        title: "Edit & Delete",
        key: "action",
        width: "7%",
        render: (text, record) => (
          <span>
            <a>
              <Icon type='edit' />
            </a>
            <Divider type='vertical' />
            <a>
              <Popconfirm
                title='Are you sure you want to Delete this?'
                icon={
                  <Icon type='question-circle-o' style={{ color: "red" }} />
                }
              >
                <a href='#'>
                  <Icon type='delete'></Icon>
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
        title={() => <MixDesignTitle />}
        columns={columns}
        onChange={this.handleChange}
        pagination={{ defaultPageSize: 3 }}
        size={this.state.size}
      />
    );
  }
}
