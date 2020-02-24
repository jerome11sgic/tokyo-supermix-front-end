/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { AntTable } from "../../styledcomponents/table/AntTabl";
import history from "../../../Components/Constant/history";
import { Divider, Button, Icon, Popconfirm } from "antd";
import { PrimaryButton } from "../../styledcomponents/button/button";
import { FlexContainer } from "../../styledcomponents/container/FlexGrid";
const columns = [
  {
    title: "Sample Code",
    dataIndex: "samplecode",
    key: "samplecode",
    width: "15%"
  },
  {
    title: "Sample Type",
    dataIndex: "sampletype",
    key: "sampletype",
    width: "15%"
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: "15%"
  },
  {
    title: "Raw Materials",
    dataIndex: "rawmaterial",
    key: "sampletype",
    width: "15%"
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    width: "15%"
  },
  {
    title: "Test",
    dataIndex: "test",
    key: "test",
    width: "15%",
    render: record => <Button onClick={e => testConfig(e, record)}>test</Button>
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
            icon={<Icon type='question-circle-o' style={{ color: "red" }} />}
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

function testConfig(record, e) {
  history.push(`/matrialtest/${record.samplecode}`);

  console.log(record);
  console.log(e);
}

export function MaterialsType(data) {
  return (
    <FlexContainer
      normal
      style={{ width: "50%", marginLeft: "20px", marginBottom: "-10px" }}
    >
      {data.map((post, index) => {
        return (
          <PrimaryButton
            type='primary'
            style={{ background: "#001328", color: "white", border: "none" }}
            key={index}
          >
            {post.typeName}
          </PrimaryButton>
        );
      })}
    </FlexContainer>
  );
}

export function ManageTest(data, title) {
  return (
    <AntTable
      title={() => (
        <div style={{ height: "20px" }}>
          <p style={styleObj}>{title}</p>
        </div>
      )}
      columns={columns}
      dataSource={data}
      style={{ background: "white", width: "1300px", marginTop: "-10px" }}
      size='small'
      onRow={(record, rowIndex) => {
        return {
          // onClick: event => {testConfig(record)}, // click row
          onDoubleClick: event => {
            testConfig(record);
          } // double click row
          // onContextMenu: event => {}, // right button click row
          // onMouseEnter: event => {}, // mouse enter row
          // onMouseLeave: event => {}, // mouse leave row
        };
      }}
    />
  );
}
const styleObj = {
  fontSize: 20,
  color: "black",
  fontFamily: "Arial",
  paddingTop: "-30px"
};

const styleDiv = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: " spacebetween"
};
