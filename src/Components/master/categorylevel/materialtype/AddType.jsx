import React, { Component } from "react";
import { Input, Modal, Icon, Button, Form } from "antd";

import "./styleType.css";
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

const error = {
  color: "red",
  fontSize: "12px",
  width: "160px",
  height: "0.3px"
};

class AddType extends Component {
  state = {
    loading: false,
    visible: false,
    formValid: false,
    errorCount: 0,
    errors: {
      // code: "",
      name: ""
    },
    // input fields
    category_code: "",
    category_name: "",
    type: "add",
    errormgs: ""
  };
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  validateForm = errors => {
    let valid;
    Object.values(errors).forEach(
      val => val.length > 0 && (valid = false),
      (valid = true)
    );
    return valid;
  };

  countErrors = errors => {
    let count = 0;
    Object.values(errors).forEach(val => val.length > 0 && (count = count + 1));
    return count;
  };

  handleCancel = () => {
    if (this.state.type === "edit") {
      this.props.setCategoryVisibility();
    }
    this.setState({
      visible: false,
      errors: {
        name: ""
      },
      // input fields
      category_code: "",
      category_name: "",
      type: "",
      errormgs: ""
    });
  };
  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.visible,
      category_code: nextProps.editPlantData.id,
      category_name: nextProps.editPlantData.name,

      type: nextProps.type
    });
  }

  handleChange = (event, field) => {
    this.setState({ [field]: event.target.value });
    this.setState({ errormgs: "" });
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    // console.log(name + " is \t" + value);
    switch (name) {
      case "category_name":
        errors.name =
          value.length === 0
            ? "Name can't be empty"
            : value.length < 3
            ? "Name \n must be 3 characters long!"
            : "";
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (
      this.state.errors.name.length === 0 &&
      this.state.category_name.length === 0
    ) {
      this.setState({
        errors: {
          name: "Name can't be empty"
        }
      });
    }

    if (this.state.type === "add") {
      console.log("add part");
      let data = {
        name: this.state.category_name
      };

      api("POST", "supermix", "/material-category", "", data, "").then(
        res => {
          console.log(res.data);

          Notification("success", res.data.message);
          this.props.reload();
          this.setState({ loading: true });
          this.setState({
            category_name: "",

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
    } else {
      const data = {
        id: this.state.category_code,
        name: this.state.category_name
      };
      api("PUT", "supermix", "/material-category", "", data, "").then(
        res => {
          console.log(res.data);

          Notification("success", res.data.message);
          this.props.reload();
          this.setState({ loading: true });
          this.setState({
            category_code: "",
            category_name: "",
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
          console.log(HandelError(error.validationFailures[0]));
        }
      );
    }

    console.log("form is valid");
  };

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
          Add Material Category
        </PrimaryButton>
        <Modal
          width="350px"
          visible={visible}
          closable={false}
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
                  ? "Edit Material Category"
                  : "Add Material Category"}
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
            {this.state.type === "edit" ? (
              <div className="input_wrapper">
                <label for="category_code" className="label">
                  Code:
                </label>
                <Input
                  id="category_code"
                  name="category_code"
                  value={this.state.category_code}
                  disabled
                />
              </div>
            ) : (
              ""
            )}

            {/* Category Name */}
            <div className="input_wrapper">
              <label for="category_name" className="label">
                Name:
              </label>

              <Input
                id="category_name"
                name="category_name"
                placeholder="Enter Category Name "
                value={this.state.category_name}
                onChange={this.handleChange}
              />
              {errors.name.length > 0 && <div style={error}>{errors.name}</div>}
              {this.state.errormgs.message == "name" ? (
                <div style={error}>{HandelError(this.state.errormgs)}</div>
              ) : (
                ""
              )}
              <div style={{ height: "12px" }} />
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
    setCategoryVisibility: () => {
      dispatch({ type: DISABLE_EDIT_MODE });
      console.log("edit modal closed");
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddType);
