/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Icon, Popconfirm, Divider } from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import { AntTable } from "../../styledcomponents/table/AntTabl";
import { FlexContainer } from "../../styledcomponents/container/FlexGrid";

export default class ManageTestConfiguration extends Component {
  state = {
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
  render() {
    const columns = [
      {
        title: <p style={{ color: "black" }}>Test Code</p>,
        dataIndex: "id",
        // width: "10%",
        key: "id"
      },
      {
        title: <p style={{ color: "black" }}>Category</p>,
        dataIndex: "date",
        // width: "16%",
        key: "id"
      },
      {
        title: <p style={{ color: "black" }}>Material </p>,
        dataIndex: "name",
        key: "name"
        // width: "16%"
      },

      {
        title: <p style={{ color: "black" }}>Test Name </p>,
        dataIndex: "name",
        key: "name"
        // width: "16%"
      },
      {
        title: <p style={{ color: "black" }}>Test Parameter </p>,
        dataIndex: "name",
        key: "name"
        // width: "16%"
      },
      {
        title: <p style={{ color: "black" }}>Equation </p>,
        dataIndex: "name",
        key: "name"
        // width: "16%"
      },
      {
        title: "Edit & Delete",
        key: "action",
        width: "12%",
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
      <FlexContainer stepsarea>
        <AntTable
          style={{ width: "1200px" }}
          title={() => (
            <div
              style={{
                background: "#001328",
                width: "auto",
                height: "40px",
                marginTop: "-25px",
                borderRadius: "10px"
              }}
            >
              <Paragraph
                style={{
                  fontFamily: "Roboto",
                  color: "white",
                  textAlign: "center",
                  padding: "10px"
                }}
              >
                Manage Test Configuration{" "}
              </Paragraph>
            </div>
          )}
          columns={columns}
          onChange={this.handleChange}
          size={this.state.size}
        />
      </FlexContainer>
    );
  }
}
