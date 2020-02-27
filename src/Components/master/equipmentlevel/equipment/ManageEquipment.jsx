/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Popconfirm, Divider, Icon } from "antd";
import "./styleequipmentmaster.css";

import { AntTable } from "../../../styledcomponents/table/AntTabl";
import EquipmentTitle from "../title/EquipmentTitle";
import { SWITCH_TO_EDIT_MODE } from "../../../../redux/action/master/plantlevel/PlantLevel";
import { connect } from "react-redux";

const eq = [
  {
    equipmentName: "Pan",
    description: "lorem ipsum"
  }
];

class ManageNature extends Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    searchText: "",
    visible: false,
    size: "small",
    type: "add"
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

  onChange(pageNumber) {
    console.log("Page: ", pageNumber);
  }

  render() {
    const columns = [
      // {
      //   title: "Code",
      //   dataIndex: "code",
      //   key: "code"
      //   // width: "4%",
      // },
      {
        title: "Equipment Name",
        dataIndex: "equipmentName",
        key: "equipmentName"
        // width: "6%",
      },

      {
        title: " Description",
        dataIndex: "description",
        key: "description"
        // width: "6%",
      },

      {
        title: "Edit & Delete",
        key: "action",
        width: "12%",
        render: (text, record) => (
          <span>
            <a>
              <Icon type='edit' style={{ color: "red" }} />
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
        title={() => <EquipmentTitle />}
        columns={columns}
        dataSource={eq}
        onChange={this.handleChange}
        pagination={{ defaultPageSize: 3 }}
        size={this.state.size}
      />
    );
  }
}

const mapStateToProps = state => null;

const mapDispatchToProps = dispatch => {
  return {
    setEmployeeVisibility: () => {
      dispatch({ type: SWITCH_TO_EDIT_MODE });
      console.log("edit modal opened");
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageNature);
