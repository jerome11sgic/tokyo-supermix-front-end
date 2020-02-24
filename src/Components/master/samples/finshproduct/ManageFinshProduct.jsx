import React, { Component } from 'react';
import { Table, Icon, Popconfirm, Divider } from "antd";
import "./styleFinsh.css";


export default class ManageFinshProduct extends Component {
    state = {
        filteredInfo: null,
        sortedInfo: null,
        searchText: "",
        visible: false
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
            title: " Code",
            dataIndex: "id",
            width: "6%",
            key: "id",
            sorter: (a, b) => a.id - b.id,
            sortOrder: sortedInfo.columnKey === "id" && sortedInfo.order
          },
          {
            title: " Customer Name",
            dataIndex: "date",
            width: "10%",
            key: "id",
            sorter: (a, b) => a.id - b.id,
            sortOrder: sortedInfo.columnKey === "id" && sortedInfo.order
          },
          {
            title: " Product Code",
            dataIndex: "name",
            key: "name",
            width: "10%",
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
            title: " Date/Time",
            dataIndex: "role",
            key: "role",
            width: "10%",
           
          },
          {
            title: "Sample Size",
            dataIndex: "role",
            key: "role",
            width: "8%",
           
          },
          {
            title: "Work Order No",
            dataIndex: "detalis",
            key: "detalis",
            width: "10%",
           
          },
          {
            title: "Grade",
            dataIndex: "role",
            key: "role",
            width: "8%",
           
          },
          {
            title: "Plant",
            dataIndex: "detalis",
            key: "detalis",
            width: "10%",
           
          },
          ,
          {
            title: "Trail Status",
            dataIndex: "detalis",
            key: "detalis",
            width: "10%",
            render: () => (
              <a onClick={this.showModal} href="no url">
                <Icon type="solution" />
              </a>
            )
          },
          
          {
            title: "Action",
            key: "action",
            width: "8%",
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
        return (
            <div className="finshTableWrapper">
            <Table
              columns={columns}
              onChange={this.handleChange}
              size="small"
              className="finshTable"
            />
          </div>
        )
    }
}
