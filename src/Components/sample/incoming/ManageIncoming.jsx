/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Icon, Popconfirm, Divider, Modal } from "antd";
import "./styleIncoming.css";
import { AntTable } from "../../styledcomponents/table/AntTabl";
import { MasterLevelFormTitle } from "../../styledcomponents/form/MasterLevelForms";
import DeliveryReport from "./deliveryreport/DeliveryReport";
import ManageIncomingSampleTitle from "../titles/ManageIncomingSampleTitle";
import { PrimaryButton } from "../../styledcomponents/button/button";

const data = [
  {
    code: "1",
    suppliername: "John",
    rawmaterial: "aggregate",
    delivereddate: "1/2/2020",
    vehicleno: "56463521"
  }
];

export default class ManageIncoming extends Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    searchText: "",
    deliveryreport: false,
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
      deliveryreport: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      deliveryreport: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      deliveryreport: false
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
        title: " Code",
        dataIndex: "code",

        key: "code",
        sorter: (a, b) => a.id - b.id,
        sortOrder: sortedInfo.columnKey === "id" && sortedInfo.order
      },
      {
        title: "Supplier Name",
        dataIndex: "suppliername",

        key: "suppliername",
        sorter: (a, b) => a.id - b.id,
        sortOrder: sortedInfo.columnKey === "id" && sortedInfo.order
      },
      {
        title: "Raw Material",
        dataIndex: "rawmaterial",
        key: "rawmaterial",

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
        title: "Delivered Date",
        dataIndex: "delivereddate",
        key: "delivereddate",

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
        title: "Delivery Report",
        dataIndex: "deliveryreport",
        key: "deliveryreport",

        render: (text, record) => (
          <Icon
            type='carry-out'
            style={{ color: "green" }}
            onClick={this.showModal}
          />
        )
      },
      {
        title: "Vechical No",
        dataIndex: "vehicleno",
        key: "vehicleno"
      },

      {
        title: "Edit & Delete",
        key: "action",

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
      <div>
        <AntTable
          maxlength
          nomargin
          columns={columns}
          dataSource={data}
          onChange={this.handleChange}
          size={this.state.size}
          title={() => <ManageIncomingSampleTitle />}
        />
        <Modal
          width='500px'
          visible={this.state.deliveryreport}
          onOk={this.handleOk}
          okType={"default"}
          onCancel={this.handleCancel}
          closable={false}
          style={{ borderRadius: "20px" }}
          title={
            <MasterLevelFormTitle>
              <p
                style={{
                  color: "white"
                }}
              >
                Delivery Report
              </p>
              <Icon
                type='close-circle'
                onClick={this.handleCancel}
                style={{
                  color: "white"
                }}
              />
            </MasterLevelFormTitle>
          }
          footer={<PrimaryButton type='primary'>hellow</PrimaryButton>}
        >
          <DeliveryReport />
        </Modal>
      </div>
    );
  }
}
