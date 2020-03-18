import React, { Component } from "react";
import { Input, Modal, Icon, Select, Button, Form } from "antd";

import "./style.css";
import { PrimaryButton } from "../../../styledcomponents/button/button";
import {
  MasterLevelFormTitle,
  MasterLevelForm
} from "../../../styledcomponents/form/MasterLevelForms";
import { api } from "../../../services/AxiosService";
import Notification from "../../../Constant/Notification";
import HandelError from "../../../Constant/HandleError";
import { connect } from "react-redux";
import { DISABLE_EDIT_MODE } from "../../../../redux/action/master/plantlevel/PlantLevel";

const Option = Select;

const error = {
  color: "red",
  fontSize: "12px",
  width: "160px",
  height: "2px"
};

class AddMainCategoryForm extends Component {
  state = {
    loading: false,
    visible: false,
    formValid: false,
    errorCount: null,
    errors: {
      sub_category: "",
      category: ""
    },
    loading: false,
    visible: false,
    subcategory_code: "",
    subcategory_name: "",
    material_category: "",
    errormgs: "",
    type: ""
  };

  validateForm = errors => {
    let valid;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
  };

  countErrors = errors => {
    let count = 0;
    Object.values(errors).forEach(val => val.length > 0 && (count = count + 1));
    return count;
  };
  getallCategory = () => {
    api("GET", "supermix", "/material-categories", "", "", "").then(res => {
      console.log(res.data);

      if (res.data.results.materialCategories.length > 0) {
        console.log("kkkkkkkkkk");
        let categ = res.data.results.materialCategories.map((post, index) => {
          return (
            <Option value={post.id} key={index}>
              {post.name}
            </Option>
          );
        });
        this.setState({
          categ
        });
      }
    });
  };

  handleChange = (event, field) => {
    this.setState({ [field]: event.target.value });
    this.setState({ errormgs: "" });
    event.preventDefault();
    const { name, value } = event.target;
    console.log(value);
    let errors = this.state.errors;
    console.log(name + " is \t" + value);
    switch (name) {
      case "subcategory_name":
        errors.sub_category =
          value.length === 0
            ? "Category can't be empty"
            : value.length < 1
            ? "Category \n must be 6 characters long!"
            : value.length > 20
            ? "Category \n must not be exceeded than 20 characters"
            : "";
        break;
      case "material_category":
        errors.category =
          value.length === 0
            ? "subcategory name can't be empty"
            : value.length < 6
            ? "subcategory name must be 3 characters long!"
            : "";
        break;

      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    if (this.state.type === "edit") {
      this.props.setSubCategoryVisibility();
    }

    this.setState({
      errors: {
        sub_category: "",
        category: ""
      },
      loading: false,
      visible: false,
      subcategory_code: "",
      subcategory_name: "",
      material_category: "",
      errormgs: "",
      type: ""
    });
  };
  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.visible,
      subcategory_code: nextProps.editPlantData.id,
      subcategory_name: nextProps.editPlantData.name,
      material_category: nextProps.editPlantData.materialCategoryId,
      material_category_edit: nextProps.editPlantData.materialCategoryName,
      type: nextProps.type
    });
  }

  handleSelect = value => {
    console.log(value);
    // handle select for  plant

    this.setState({
      material_category: value,
      material_category_edit: value
    });

    if (value.length !== 0) {
      this.setState({
        errors: {
          sub_category: this.state.errors.sub_category,
          category: ""
        }
      });
    } else {
      this.setState({
        errors: {
          sub_category: this.state.sub_category,
          category: "Category can't be empty"
        }
      });
    }
  };
  handleSubmit = event => {
    event.preventDefault();
    // check for whole empty fields
    if (
      this.state.subcategory_name.length === 0 &&
      this.state.material_category.length === 0
    ) {
      this.setState({
        errors: {
          category: "Category can't be empty",
          sub_category: "subcategory name can't be empty"
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      this.state.subcategory_name === 0 &&
      this.state.errors.sub_category.length === 0
    ) {
      this.setState({
        errors: {
          category: this.state.errors.category || "Category can't be empty",
          sub_category:
            this.state.errors.sub_category || "subcategory name can't be empty"
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    }
    //description

    if (this.state.type === "edit") {
      const data = {
        id: this.state.subcategory_code,
        name: this.state.subcategory_name,
        materialCategoryId: 1
      };
      api("PUT", "supermix", "/material-sub-category", "", data, "").then(
        res => {
          console.log(res.data);

          Notification("success", res.data.message);
          this.props.reload();
          this.setState({ loading: true });
          this.setState({
            subcategory_code: "",
            subcategory_name: "",
            material_category: "",
            errormgs: ""
          });
          setTimeout(() => {
            this.setState({ loading: false, visible: false });
          }, 3000);
        },
        error => {
          this.setState({
            errormgs: error.validationFailures[0]
          });
          console.log("DEBUG34: ", error);
          console.log(HandelError(error.validationFailures[0]));
        }
      );
      console.log(data);
    } else {
      const data = {
        name: this.state.subcategory_name,
        materialCategoryId: this.state.material_category
      };
      console.log(data);
      api("POST", "supermix", "/material-sub-category", "", data, "").then(
        res => {
          console.log(res.data);

          Notification("success", res.data.message);
          this.props.reload();
          this.setState({ loading: true });
          this.setState({
            subcategory_code: "",
            subcategory_name: "",
            material_category: "",
            errormgs: ""
          });
          setTimeout(() => {
            this.setState({ loading: false, visible: false });
          }, 3000);
        },
        error => {
          // this.setState({
          //   errormgs: error.validationFailures[0]
          // });
          console.log("DEBUG34: ", error);
          // console.log(HandelError(error.validationFailures[0]));
        }
      );

      console.log(data);
    }

    // console.log(data);
    console.log("form is valid");
  };

  componentDidMount() {
    this.getallCategory();
    console.log(this.props.screen);
  }
  render() {
    const { visible, loading } = this.state;
    const { errors } = this.state;
    return (
      <div>
        <PrimaryButton
          onClick={this.showModal}
          style={{
            background: "#001328",
            color: "white",
            border: "none",
            width: "auto",
            marginLeft: "-10px"
          }}
        >
          Add Material Sub Category
        </PrimaryButton>
        <Modal
          width="350px"
          visible={visible}
          closable={false}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <PrimaryButton
              key="submit"
              loading={loading}
              onClick={e => this.handleSubmit(e)}
              style={{ background: "#001328", color: "white", border: "none" }}
            >
              Save
            </PrimaryButton>
          ]}
          title={
            <MasterLevelFormTitle>
              <p
                style={{
                  color: "white"
                }}
              >
                {this.state.type === "edit"
                  ? " Edit Material Sub Category"
                  : " Add Material Sub Category"}
              </p>
              <Icon
                type="close-circle"
                onClick={this.handleCancel}
                style={{
                  color: "white"
                }}
              />
            </MasterLevelFormTitle>
          }
        >
          <MasterLevelForm>
            {/* Code */}
            {/* {this.state.type === "edit" ? (
              <div className="input_wrapper">
                <label for="code" className="label">
                  Code:
                </label>

                <Input id="code" name="subcategory_code"  disabled />
              </div>
            ) : (
              ""
            )} */}

            {/* Sub Category Name */}
            <div className="input_wrapper">
              <label for="subcategory_name" className="label">
                Name:
              </label>

              <Input
                id="subcategory_name"
                name="subcategory_name"
                placeholder="Enter Sub Category"
                value={this.state.subcategory_name}
                onChange={this.handleChange}
              />
              {this.state.errormgs.message == "name" ? (
                <div style={error}>{HandelError(this.state.errormgs)}</div>
              ) : (
                ""
              )}
              {errors.sub_category.length > 0 && (
                <div style={error}>{errors.sub_category}</div>
              )}
            </div>
            {/* User Role */}
            <div className="input_wrapper">
              <label for="material_category" className="label">
                Material Category:
              </label>

              <Select
                showSearch
                style={{ width: 180 }}
                placeholder="Select Material Category"
                id="material_category"
                name="material_category"
                onChange={this.handleSelect}
                value={this.state.material_category_edit}
                style={{ width: "180px" }}
              >
                {this.state.categ}
              </Select>
            </div>
          </MasterLevelForm>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  //getting the global redux state to get the data from the EditPlantReducer.js
  return {
    visible: state.plantLevelReducers.EditPlantReducer.visible,
    type: state.plantLevelReducers.EditPlantReducer.type,
    editPlantData: state.plantLevelReducers.EditPlantReducer.editPlantData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSubCategoryVisibility: () => {
      dispatch({ type: DISABLE_EDIT_MODE });
      console.log("edit modal closed");
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMainCategoryForm);
