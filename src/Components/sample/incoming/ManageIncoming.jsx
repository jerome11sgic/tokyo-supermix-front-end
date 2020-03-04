/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Icon, Popconfirm, Divider, Modal } from "antd";
import "./styleIncoming.css";
import { AntTable } from "../../styledcomponents/table/AntTabl";
import { MasterLevelFormTitle } from "../../styledcomponents/form/MasterLevelForms";
import DeliveryReport from "./deliveryreport/DeliveryReport";
import ManageIncomingSampleTitle from "../titles/ManageIncomingSampleTitle";
import { PrimaryButton } from "../../styledcomponents/button/button";

// const data = [
//   {
//     code: "1",
//     suppliername: "John",
//     rawmaterial: "aggregate",
//     delivereddate: "1/2/2020",
//     vehicleno: "56463521"
//   }
// ];

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
        title: "Date",
        dataIndex: "date",

        key: "date",
        sorter: (a, b) => a.id - b.id,
        sortOrder: sortedInfo.columnKey === "id" && sortedInfo.order
      },
      {
        title: "Vechicle No",
        dataIndex: "vechicleNo",
        key: "vechicleNo"
      },
      {
        title: "Material ",
        dataIndex: "materialId",
        key: "materialId"
      },
      {
        title: "Plant",
        dataIndex: "plant",
        key: "plant"

        // render: (text, record) => (
        //   <Icon
        //     type='carry-out'
        //     style={{ color: "green" }}
        //     onClick={this.showModal}
        //   />
        // )
      },
      {
        title: "Suppleir ",
        dataIndex: "supplierId",
        key: "supplierId"
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status"
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
          // dataSource={data}
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
