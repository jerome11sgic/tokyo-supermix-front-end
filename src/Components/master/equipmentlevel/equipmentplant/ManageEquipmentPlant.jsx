/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Popconfirm, Divider, Icon } from "antd";

import { AntTable } from "../../../styledcomponents/table/AntTabl";
import EquipmentPlantTitle from "../title/EquipmentPlantTitle";
import { SWITCH_TO_EDIT_MODE } from "../../../../redux/action/master/plantlevel/PlantLevel";
import { connect } from "react-redux";
import { api } from "../../../services/AxiosService";

class ManageEquipmentPlant extends Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    searchText: "",
    visible: false,
    size: "small",
    type: "add",
    data: ""
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
    this.getallEquipmentPlant();
  }

  //get all
  getallEquipmentPlant = () => {
    api("GET", "supermix", "/plantequipment", "", "", "").then(res => {
      console.log(res);
      // this.setState({
      //   data: res.data.results
      // });
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

  onChange(pageNumber) {
    console.log("Page: ", pageNumber);
  }

  render() {
    const columns = [
      {
        title: "Serial No",
        dataIndex: "serialNo",
        key: "serialNo"
        // width: "4%",
      },
      {
        title: "Equipment",
        dataIndex: "equipment",
        key: "equipment"
        // width: "6%",
      },

      {
        title: "Plant",
        dataIndex: "plant",
        key: "plant"
        // width: "6%",
      },
      {
        title: "Brand Name",
        dataIndex: "brandName",
        key: "brandName"
        // width: "6%",
      },
      {
        title: "Model Name",
        dataIndex: "modelName",
        key: "modelName"
        // width: "6%",
      },
      {
        title: "Edit & Delete",
        key: "action",
        width: "12%",
        render: (text, record) => (
          <span>
            <a>
              <Icon
                type='edit'
                onClick={this.props.passEditEquipmentPlantRecordtoModal.bind(
                  this,
                  record
                )}
              />
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
        title={() => <EquipmentPlantTitle reload={this.getallEquipmentPlant} />}
        columns={columns}
        // dataSource={data}
        dataSource={this.state.data}
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
    // if this function dispatches modal will be shown and the data will be drawn :)
    passEditEquipmentPlantRecordtoModal: record => {
      //this payload is the data we pass into redux which is in the row which we clicked
      dispatch({ type: SWITCH_TO_EDIT_MODE, payload: record });
      console.log(record);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageEquipmentPlant);
