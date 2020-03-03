/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Popconfirm, Divider, Icon } from "antd";
import ManageMainCategoryMasterTitle from "../titles/ManageMainCategoryMasterTitle";
import { AntTable } from "../../../styledcomponents/table/AntTabl";
import { api } from "../../../services/AxiosService";
import Notification from "../../../Constant/Notification";
import { SWITCH_TO_EDIT_MODE } from "../../../../redux/action/master/plantlevel/PlantLevel";
import { connect } from "react-redux";

// const datalist = [];
class ManageMainCategory extends Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    searchText: "",
    visible: false,
    size: "small",
    datalist: ""
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
  componentDidMount() {
    this.getallsubcategory();
  }
  handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    });
  };
  getallsubcategory = () => {
    api("GET", "supermix", "/material-sub-categories", "", "", "").then(res => {
      console.log(res.data);

      // res.data.results.Supplier.map((post, index) => {
      //   console.log(post);
      //   datalist.push({
      //     id: post.id,
      //     name: post.name,
      //     companyName: post.companyName,
      //     address: post.address,
      //     phoneNumber: post.phoneNumber,
      //     email: post.email,
      //     supplierCategoryId: post.supplierCategory.id,
      //     category: post.supplierCategory.category,
      //     description: post.supplierCategory
      //   });
      //   console.log(datalist);
      // });
      // console.log(datalist);
      this.setState({
        datalist: res.data.results.materialSubCategories
      });
    });
  };

  onConfirmdelete(id) {
    console.log(id);
    let mesg = "suppliers delete";

    api("DELETE", "supermix", "/material-sub-category", "", "", id).then(
      res => {
        console.log(res.data);
        this.getallsubcategory();
        Notification("success", res.data.message);
      }
    );
    console.log(this.state.id);
  }

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
        columnKey: "code"
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
        title: "Sub Category",
        dataIndex: "name",
        key: "subCategory",
        width: "10%"
      },
      {
        title: "Material Category",
        dataIndex: "materialCategoryName",
        key: "materialCategory",
        width: "10%"
      },
      {
        title: "Edit & Delete",
        key: "action",
        width: "7%",
        render: (text, record = this.state.datalist) => (
          <span>
            <a>
              <Icon
                type='edit'
                onClick={this.props.passEditSubManageCategoryToModal.bind(
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
      <div>
        <AntTable
          title={() => (
            <ManageMainCategoryMasterTitle reload={this.getallsubcategory} />
          )}
          columns={columns}
          dataSource={this.state.datalist}
          onChange={this.handleChange}
          pagination={{ defaultPageSize: 8 }}
          size={this.state.size}
        />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    // if this function dispatches modal will be shown and the data will be drawn :)
    passEditSubManageCategoryToModal: record => {
      //this payload is the data we pass into redux which is in the row which we clicked
      dispatch({ type: SWITCH_TO_EDIT_MODE, payload: record });
      console.log(record);
    }
  };
};

export default connect(null, mapDispatchToProps)(ManageMainCategory);
