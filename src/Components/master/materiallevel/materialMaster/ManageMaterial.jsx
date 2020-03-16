/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Table, Icon, Popconfirm, Divider } from "antd";
import MaterialMasterTitle from "../titles/MaterialMasterTitle";
import { AntTable } from "../../../styledcomponents/table/AntTabl";
import { SWITCH_TO_EDIT_MODE } from "../../../../redux/action/master/plantlevel/PlantLevel";
import { connect } from "react-redux";
import { api } from "../../../services/AxiosService";
import Notification from "../../../Constant/Notification";

// const Search = Input.Search;
const data = [
  {
    code: 1,
    materialName: "Sand",
    materialCategory: "Aggregate",
    subCategory: "Fine"
  }
];

class ManageMaterial extends Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    searchText: "",
    visible: false,
    size: "small",
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
    this.getallMaterial();
  }

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

  //get all
  getallMaterial = () => {
    console.log("api");
    const datalist = [];
    api("GET", "supermix", "/raw-materials", "", "", "").then(res => {
      console.log(res);
      res.data.results.rawMaterial.map((post, index) => {
        console.log(post);
        datalist.push({
          id: post.id,
          name: post.name,
          nature: post.nature,
          materialCategory: post.materialSubCategory.materialCategoryName,
          subCategory: post.materialSubCategory.name,
          subCategory_Id: post.materialSubCategory.id
        });
        console.log(datalist);
      });
      this.setState({
        datalist
      });
    });
  };

  //delete
  onConfirmdelete(code) {
    console.log("delete");
    console.log(code);
    let mesg = "equipmentplant delete";

    api("DELETE", "supermix", "/raw-material", "", "", code).then(res => {
      console.log(res.data);
      this.getallMaterial();
      Notification("success", res.data.message);
    });
    console.log(this.state.id);
  }

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

  onChange(pageNumber) {
    console.log("Page: ", pageNumber);
  }

  render() {
    const columns = [
      // {
      //   title: "Code",
      //   dataIndex: "code",
      //   key: "code"
      //   // width: "5%",
      // },
      {
        title: "Material Name",
        dataIndex: "name",
        key: "materialName"
        // width: "6%",
      },
      {
        title: "Material Category",
        dataIndex: "materialCategory",
        key: "materialCategory"
        // width: "7%",
      },
      {
        title: "Sub Category",
        dataIndex: "subCategory",
        key: "subCategory"
        // width: "7%",
      },
      {
        title: "Nature",
        dataIndex: "nature",
        key: "subCategory"
        // width: "7%",
      },
      {
        title: "Edit & Delete",
        key: "action",
        width: "10%",
        render: (text, record = this.state.datalist) => (
          <span>
            <a>
              <Icon
                type='edit'
                onClick={this.props.passEditMaterialRecordtoModal.bind(
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
                onConfirm={this.onConfirmdelete.bind(this, record.id)}
              >
                <a href='#'>
                  <Icon type='delete' style={{ color: "red" }}></Icon>
                </a>
              </Popconfirm>
            </a>
          </span>
        )
      }
    ];

    return (
      <AntTable
        title={() => <MaterialMasterTitle reload={this.getallMaterial} />}
        maxlength
        columns={columns}
        dataSource={this.state.datalist}
        onChange={this.handleChange}
        pagination={{ defaultPageSize: 8 }}
        size={this.state.size}
      />
    );
  }
}

const mapStateToProps = state => null;

const mapDispatchToProps = dispatch => {
  return {
    // if this function dispatches modal will be shown and the data will be drawn :)
    passEditMaterialRecordtoModal: record => {
      //this payload is the data we pass into redux which is in the row which we clicked
      dispatch({ type: SWITCH_TO_EDIT_MODE, payload: record });
      console.log(record);
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageMaterial);
