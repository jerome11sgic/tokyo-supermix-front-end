import React, { Component } from "react";
import { Input, Modal, Icon, Button, Form } from "antd";

import "./styleequipmentmaster.css";
import { PrimaryButton } from "../../../styledcomponents/button/button";
import {
  MasterLevelFormTitle,
  MasterLevelForm
} from "../../../styledcomponents/form/MasterLevelForms";
import TextArea from "antd/lib/input/TextArea";
import { api } from "../../../services/AxiosService";
import Notification from "../../../Constant/Notification";
import HandelError from "../../../Constant/HandleError";
import { connect } from "react-redux";
import { DISABLE_EDIT_MODE } from "../../../../redux/action/master/plantlevel/PlantLevel";

const error = {
  color: "red",
  fontSize: "12px",
  width: "160px",
  height: "0.2px"
};

class AddEquipment extends Component {
  state = {
    loading: false,
    visible: false,
    formValid: false,
    errorCount: 0,
    errormgs: "",
    errors: {
      name: ""
      // description: ""
    },
    equipment_code: "",
    equipment_name: "",
    equipment_description: "",
    type: ""
  };
  showModal = () => {
    this.setState({
      visible: true,
      errors: {
        name: ""
      },
      equipment_name: ""
    });
  };

  // validate when submit
  validateForm = errors => {
    let valid;
    Object.values(errors).forEach(
      val => val.length > 0 && (valid = false),
      (valid = true)
    );
    return valid;
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.visible,
      equipment_code: nextProps.editPlantData.id,
      equipment_name: nextProps.editPlantData.name,
      equipment_description: nextProps.editPlantData.description,
      type: nextProps.type
    });
  }

  countErrors = errors => {
    let count = 0;
    Object.values(errors).forEach(val => val.length > 0 && (count = count + 1));
    return count;
  };

  handleCancel = () => {
    if (this.state.type === "edit") {
      this.props.setEquipmentVisibility();
    }
    this.setState({
      visible: false,
      errors: {
        name: ""
      },
      equipment_name: "",
      equipment_description: "",
      equipment_code: "",
      errormgs: "",
      type: ""
    });
  };

  handleChange = (event, field) => {
    this.setState({ [field]: event.target.value });
    this.setState({ errormgs: "" });
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    // console.log(name + " is \t" + value);
    switch (name) {
      case "equipment_name":
        errors.name =
          value.length === 0
            ? "Name can't be empty"
            : value.length < 3
            ? "Name \n must be 3 characters long!"
            : "";
        break;
      case "equipment_description":
        errors.description =
          value.length === 0
            ? "Description can't be empty"
            : value.length < 3
            ? "Description must be 3 characters long!"
            : "";
        break;

      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.equipment_name.length === 0) {
      this.setState({
        errors: {
          name: "Name can't be empty"
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      this.state.equipment_name.length === 0 &&
      this.state.errors.name.length === 0
    ) {
      this.setState({
        errors: {
          name: this.state.errors.name || "Name can't be empty"
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (this.state.errors.name.length === 0) {
      console.log("form is valid");
      // const data = {
      //   equipment_name: this.state.equipment_name,
      //   equipment_description: this.state.equipment_description
      // };
      // console.log(data);

      // this.setState({
      //   loading: true,
      //   errors: {
      //     name: ""
      //   },
      //   equipment_name: "",
      //   equipment_description: ""
      // });
      setTimeout(() => {
        this.setState({ loading: false, visible: false });
      }, 1500);
    }

    if (this.state.type === "edit") {
      console.log("edit part");
      const data = {
        id: this.state.equipment_code,
        name: this.state.equipment_name,
        description: this.state.equipment_description
      };

      api("PUT", "supermix", "/equipment", "", data, "").then(
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
          this.setState({
            errormgs: error.validationFailures[0]
          });
          console.log("DEBUG34: ", error);
          console.log(HandelError(error.validationFailures[0]));
        }
      );
    } else {
      let data = {
        name: this.state.equipment_name,
        description: this.state.equipment_description
      };
      api("POST", "supermix", "/equipment", "", data, "").then(
        res => {
          console.log(res.data);

          Notification("success", res.data.message);
          this.props.reload();
          this.setState({ loading: true });
          this.setState({
            equipment_name: "",
            equipment_description: "",
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
    }
  };

  render() {
    const { visible, loading, errors } = this.state;

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
          Add Equipment
        </PrimaryButton>
        <Modal
          width="480px"
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
                  ? " Edit Equipments"
                  : " Add Equipments"}
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
            {/* <Icon type="close-circle" onClick={this.handleCancel} style={{marginLeft:'300px',marginTop:'-65px',color:'white'}}/> */}

            {/* Code */}
            {this.state.type === "edit" ? (
              <div className="input_wrapper">
                <label for="code" className="label">
                  Code:
                </label>
                <Input
                  id="code"
                  name="code"
                  // placeholder='Enter the Code '
                  value={this.state.equipment_code}
                  disabled
                />
              </div>
            ) : (
              ""
            )}

            {/* User Role */}
            <div className="input_wrapper">
              <label for="equipment_name" className="label">
                Equipment Name:
              </label>

              <Input
                id="equipment_name"
                name="equipment_name"
                placeholder="Enter Equipment Name"
                value={this.state.equipment_name}
                onChange={this.handleChange}
              />
              {errors.name.length > 0 && <div style={error}>{errors.name}</div>}
              {this.state.errormgs.message == "name" ? (
                <div style={error}>{HandelError(this.state.errormgs)}</div>
              ) : (
                ""
              )}
              <div style={{ height: "12.5px" }}></div>
            </div>

            <div className="input_wrapper">
              <label for="equipment_description" className="label">
                Description:
              </label>
              <TextArea
                id="equipment_description"
                name="equipment_description"
                placeholder="Enter Description "
                style={{ width: "180px" }}
                value={this.state.equipment_description}
                onChange={this.handleChange}
              />
              {/* {errors.description.length > 0 && (
                <div style={error}>{errors.description}</div>
              )} */}
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
    setEquipmentVisibility: () => {
      dispatch({ type: DISABLE_EDIT_MODE });
      console.log("edit modal closed");
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEquipment);
