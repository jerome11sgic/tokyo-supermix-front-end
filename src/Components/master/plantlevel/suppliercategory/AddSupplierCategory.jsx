import React, { Component } from "react";
import { Input, Modal, Icon, Button, Form } from "antd";
import TextArea from "antd/lib/input/TextArea";

import { PrimaryButton } from "../../../styledcomponents/button/button";
import {
  MasterLevelFormTitle,
  MasterLevelForm
} from "../../../styledcomponents/form/MasterLevelForms";
import { connect } from "react-redux";
import { api } from "../../../services/AxiosService";
import Notification from "../../../Constant/Notification";
import HandelError from "../../../Constant/HandleError";
import { DISABLE_EDIT_MODE } from "../../../../redux/action/master/plantlevel/PlantLevel";

const error = {
  color: "red",
  fontSize: "12px",
  width: "160px",
  height: "2px"
};

class AddSupplierCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValid: false,
      errorCount: null,
      errors: {
        category: "",
        description: ""
      },
      loading: false,
      visible: false,
      supllierCategory_code: "",
      supplier_category: "",
      supplierCategory_description: "",
      errormgs: "",
      type: "add"
    };
  }
  showModal = () => {
    this.setState({
      visible: true,
      supplier_category: "",
      supplierCategory_description: ""
    });
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

  handleCancel = () => {
    if (this.state.type === "edit") {
      this.props.setSupplierCategoryVisiblity();
    }

    this.setState({
      visible: false,
      errors: {
        category: "",
        description: ""
      },
      errormgs: "",
      supplier_category: "",
      supplierCategory_description: "",
      type: ""
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleChange = (event, field) => {
    this.setState({ [field]: event.target.value });
    this.setState({ errormgs: "" });
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    console.log(name + " is \t" + value);
    switch (name) {
      case "supplier_category":
        errors.category =
          value.length === 0
            ? "Category can't be empty"
            : value.length < 6
            ? "Category \n must be 6 characters long!"
            : value.length > 20
            ? "Category \n must not be exceeded than 20 characters"
            : "";
        break;
      case "supplierCategory_description":
        errors.description =
          value.length === 0
            ? "Description can't be empty"
            : value.length < 6
            ? "Description must be 6 characters long!"
            : "";
        break;

      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    // check for whole empty fields
    if (
      this.state.supplier_category.length === 0 &&
      this.state.supplierCategory_description.length === 0
    ) {
      this.setState({
        errors: {
          category: "Category can't be empty",
          description: "Description can't be empty"
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    }
    // code
    // else if (this.state.errors.code.length === 0) {
    //   this.setState({
    //     errors: {
    //       category: this.state.errors.category || "Category can't be empty",
    //       description:
    //         this.state.errors.description || "Description can't be empty"
    //     },
    //     formValid: this.validateForm(this.state.errors),
    //     errorCount: this.countErrors(this.state.errors)
    //   });
    // }
    //category
    else if (
      this.state.supplier_category === 0 &&
      this.state.errors.category.length === 0
    ) {
      this.setState({
        errors: {
          category: this.state.errors.category || "Category can't be empty",
          description:
            this.state.errors.description || "Description can't be empty"
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    }
    //description
    else if (
      this.state.supplierCategory_description.length === 0 &&
      this.state.errors.description.length === 0
    ) {
      this.setState({
        errors: {
          category: this.state.errors.category || "Category can't be empty",
          description:
            this.state.errors.description || "Description can't be empty"
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    }
    // api request section if no errors occured
    else if (
      this.state.errors.category.length === 0 &&
      this.state.errors.description.length === 0
    ) {
      this.setState({ formValid: this.validateForm(this.state.errors) });
      this.setState({ errorCount: this.countErrors(this.state.errors) });
      console.log(this.state.supplierCategory_description);
      const data = {
        // code: this.state.supllierCategory_code,
        category: this.state.supplier_category,
        description: this.state.supplierCategory_description
      };
      if (this.state.type === "add") {
        const data = {
          category: this.state.supplier_category,
          description: this.state.supplierCategory_description
        };
        api("POST", "supermix", "/supplier-category", "", data, "").then(
          res => {
            console.log(res.data);
            if (res.data.status === "VALIDATION_FAILURE") {
              console.log("add");
              this.responeserror(res.data.results.name.message);
            } else {
              Notification("success", res.data.message);
              this.props.reload();
              this.setState({ loading: true });
              this.setState({
                supllierCategory_code: "",
                supplier_category: "",
                supplierCategory_description: "",

                errormgs: ""
              });
              setTimeout(() => {
                this.setState({ loading: false, visible: false });
              }, 3000);
            }
          },
          error => {
            this.setState({
              errormgs: error.validationFailures[0]
            });
            console.log("DEBUG34: ", error);
            console.log(HandelError(error.validationFailures[0]));
          }
        );
      } else {
        const data = {
          id: this.state.supllierCategory_code,
          category: this.state.supplier_category,
          description: this.state.supplierCategory_description
        };
        api("PUT", "supermix", "/supplier-category", "", data, "").then(res => {
          console.log(res.data);
          if (res.data.status === "VALIDATION_FAILURE") {
            console.log("update");
            this.responeserror(res.data.results.name.message);
          } else {
            Notification("success", res.data.message);
            this.props.reload();
            this.setState({ loading: true });
            this.setState({
              supllierCategory_code: "",
              supplier_category: "",
              supplierCategory_description: "",
              errormgs: ""
            });
            setTimeout(() => {
              this.setState({ loading: false, visible: false });
            }, 3000);
          }
        });
      }

      console.log(data);
      console.log("form is valid");
    }
  };
  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.visible,
      supllierCategory_code: nextProps.editPlantData.id,
      supplier_category: nextProps.editPlantData.category,
      supplierCategory_description: nextProps.editPlantData.description,

      type: nextProps.type
    });
  }

  componentDidMount() {
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
            width: "120px",
            marginLeft: "-10px"
          }}
        >
          Add Category
        </PrimaryButton>
        <Modal
          width="300px"
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
              {this.state.type === "edit" ? "Edit" : "Save"}
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
                  ? "Edit Supplier Category"
                  : "Add Supplier Category"}
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
            <div className="input_wrapper">
              <label for="supllierCategory_code" className="label">
                Code:
              </label>

              <Input
                id="supllierCategory_code"
                name="supllierCategory_code"
                onChange={this.handleChange}
                value={this.state.supllierCategory_code}
                disabled
              />
              {/* {errors.code.length > 0 && <div style={error}>{errors.code}</div>} */}
              <div style={{ height: "12px" }}></div>
            </div>

            {/* category*/}
            <div className="input_wrapper">
              <label for="supplier_category" className="label">
                Category:
              </label>

              <Input
                id="supplier_category"
                name="supplier_category"
                placeholder="Enter Supplier Category Type"
                onChange={this.handleChange}
                value={this.state.supplier_category}
              />
              {errors.category.length > 0 && (
                <div style={error}>{errors.category}</div>
              )}
              {this.state.errormgs.message == "category" ? (
                <div style={error}>{HandelError(this.state.errormgs)}</div>
              ) : (
                ""
              )}
              <div style={{ height: "12px" }}></div>
            </div>

            {/* Description */}
            <div className="input_wrapper">
              <label for="supplierCategory_description" className="label">
                Description:
              </label>
              <TextArea
                id="supplierCategory_description"
                name="supplierCategory_description"
                placeholder="Enter the Description"
                onChange={this.handleChange}
                style={{ width: "180px" }}
                value={this.state.supplierCategory_description}
              />
              {errors.description.length > 0 && (
                <div style={error}>{errors.description}</div>
              )}

              <div style={{ height: "12px" }}></div>
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
    // setting visible to false if we close the modal .. and all state data will be deleted if this function is dispatched
    setSupplierCategoryVisiblity: () => {
      dispatch({ type: DISABLE_EDIT_MODE });
      console.log("edit modal closed");
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddSupplierCategory);
