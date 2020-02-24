import React, { Component } from "react";
import { Table, Icon, Divider, Popconfirm, Modal } from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import LineChartConfig from "./element/LineChart";

export default class ManageGraph extends Component {
  state = { visible: false };

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

  render() {
    const columns = [
      {
        title: "Code",
        dataIndex: "id",
        width: "10%",
        key: "id"
      },
      {
        title: "Graph Name",
        dataIndex: "name",
        width: "16%",
        key: "id"
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "name",
        width: "16%"
      },
      {
        title: "X axis",
        dataIndex: "x",
        key: "name",
        width: "16%"
      },
      {
        title: "Y axis",
        dataIndex: "y",
        key: "name",
        width: "16%"
      },

      {
        title: "Preview",
        dataIndex: "name",
        key: "name",
        width: "16%",
        render: (text, record) => (
          <Icon
            type='play-circle'
            style={{ color: "green" }}
            onClick={this.showModal}
          />
        )
      },
      {
        title: "Edit & Delete",
        key: "action",
        width: "10%",
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

    const data = [
      {
        key: "1",
        id: "Test001",
        name: "Strength Vs Days",
        type: "Line",
        x: "Force",
        y: "Days"
      }
    ];

    return (
      <div className='tablegraph'>
        <Modal
          title='Preview Graph'
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          style={{ borderRadius: "20px" }}
          mask={true}
          maskClosable='true'
          // okButtonProps={ghost="true"}
        >
          <LineChartConfig />
        </Modal>
        <Table
          className='tablegraphinner'
          columns={columns}
          dataSource={data}
          title={() => (
            <div className='graphtitle'>
              <Paragraph
                style={{
                  fontFamily: "Roboto",
                  color: "white",
                  textAlign: "center",
                  padding: "10px"
                }}
              >
                Manage Graph Configuration{" "}
              </Paragraph>
            </div>
          )}
          //   onChange={this.handleChange}

          size='small'
        />
      </div>
    );
  }
}
