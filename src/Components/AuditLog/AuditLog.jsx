import React from "react";
import { Button, Icon, DatePicker, Input, Menu, message } from "antd";
import { AntTable } from "../styledcomponents/table/AntTabl";
import "./auditlog.css";
import { FlexContainer } from "../styledcomponents/container/FlexGrid";
import { AuditFormTitle } from "../styledcomponents/form/MasterLevelForms";
const { RangePicker } = DatePicker;
const Search = Input.Search;

class AuditLog extends React.Component {
  state = {
    visible: false,
    visibleEditModal: false
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
  handleMenuClick(e) {
    message.info("Click on menu item.");
    console.log("click", e);
  }
  handleButtonClick(e) {
    message.info("Click on left button.");
    console.log("click left button", e);
  }

  onChange(value, dateString) {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  }

  onOk(value) {
    console.log("onOk: ", value);
  }

  /*
    Author: 
    Last Updated: dd/MM/YYYY
    Note: Please do necessary commenting and follow code standard.
      */
  // onChange(pagination, filters, sorter) {
  //   console.log("params", pagination, filters, sorter);
  // }
  render() {
    const columns = [
      {
        title: "Date/Time",
        dataIndex: "date",
        filters: [
          {
            text: "Joe",
            value: "Joe"
          },
          {
            text: "Jim",
            value: "Jim"
          },
          {
            text: "Submenu",
            value: "Submenu",
            children: [
              {
                text: "Green",
                value: "Green"
              },
              {
                text: "Black",
                value: "Black"
              }
            ]
          }
        ],
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        onFilter: (value, record) => record.name.indexOf(value) === 0,
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ["descend"]
      },
      {
        title: "Author",
        dataIndex: "author"
      },
      {
        title: "Work category",
        dataIndex: "category",
        filters: [
          {
            text: "London",
            value: "London"
          },
          {
            text: "New York",
            value: "New York"
          }
        ],
        filterMultiple: false,
        onFilter: (value, record) => record.address.indexOf(value) === 0,
        sorter: (a, b) => a.address.length - b.address.length,
        sortDirections: ["descend", "ascend"]
      },
      {
        title: "Summary",
        dataIndex: "summary"
      }
    ];
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key='1'>
          <Icon type='line-chart' />
          Log Timeline
        </Menu.Item>
        <Menu.Item key='2'>
          <Icon type='delete' />
          Clear Log
        </Menu.Item>
      </Menu>
    );

    return (
      <div className='auditlog'>
        <AuditFormTitle>Audit Log</AuditFormTitle>
        <FlexContainer style={{ padding: "30px" }}>
          <Button type='primary'>
            {" "}
            <Icon type='export' />
            Export
          </Button>

          <RangePicker
            className='rangepicker'
            showTime={{ format: "HH:mm" }}
            format='YYYY-MM-DD HH:mm'
            placeholder={["Start Time", "End Time"]}
            onChange={this.onChange}
            onOk={this.onOk}
          />
          <Search
            placeholder=' search ......'
            onSearch={value => console.log(value)}
            style={{ width: "auto" }}
            enterButton
          />
        </FlexContainer>

        <AntTable columns={columns} style={{ width: "auto", margin: "1px" }} />
      </div>
    );
  }
}

export default AuditLog;
