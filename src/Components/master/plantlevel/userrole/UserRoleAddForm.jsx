import React, { Component } from "react";
import { Input, Modal, Icon, Button } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { api } from "../../../services/AxiosService";
import Notification from "../../../Constant/Notification";
import HandelError from "../../../Constant/HandleError";
import { PrimaryButton } from "../../../styledcomponents/button/button";
import {
  MasterLevelFormTitle,
  MasterLevelForm
} from "../../../styledcomponents/form/MasterLevelForms";
import { connect } from "react-redux";
import { DISABLE_EDIT_MODE } from "../../../../redux/action/master/plantlevel/PlantLevel";

const error = {
  color: "red",
  fontSize: "12px",
  width: "160px",
  height: "2px"
};

class UserRoleAddForm extends Component {
  state = {
    formValid: false,
    errorCount: null,
    errors: {
      designation: "",
      description: ""
    },
    loading: false,
    visible: false,
    designation_code: "",
    designation_name: "",
    designation_description: "",
    errormgs: "",
    type: ""
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

  showModal = () => {
    this.setState({
      visible: true,
      designation_name: "",
      designation_description: ""
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
      case "designation_name":
        errors.designation =
          value.length === 0
            ? "Designation can't be empty"
            : value.length < 1
            ? "Designation \n must be one characters long!"
            : value.replace(/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/, "")
            ? "Desigination allow only letters"
            : "";
        break;
      case "designation_description":
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

  handleCancel = () => {
    if (this.state.type === "edit") {
      // we call the redux function to dispatch and delete all the global redux state to close the modal
      this.props.setDesignationVisiblity();
    }
    this.setState({
      visible: false,
      formValid: false,
      designation_name: "",
      designation_description: "",
      errors: {
        designation: "",
        description: ""
      },
      errormgs: ""
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (
      this.state.designation_name.length === 0 &&
      this.state.designation_description.length === 0
    ) {
      this.setState({
        errors: {
          designation: "Designation can't be empty",
          description: "Description can't be empty"
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    }
    // else if (
    //   this.state.designation_code.length === 0 &&
    //   this.state.errors.code.length === 0
    // ) {
    //   this.setState({
    //     errors: {
    //       designation: this.state.errors.designation,
    //       description: this.state.errors.description
    //     },
    //     formValid: this.validateForm(this.state.errors),
    //     errorCount: this.countErrors(this.state.errors)
    //   });
    // }
    else if (
      this.state.designation_name.length === 0 &&
      this.state.errors.designation.length === 0
    ) {
      this.setState({
        errors: {
          designation:
            this.state.errors.designation || "Designation can't be empty",
          description: this.state.errors.description
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      this.state.designation_description.length === 0 &&
      this.state.errors.description.length === 0
    ) {
      this.setState({
        errors: {
          designation: this.state.errors.designation,
          description:
            this.state.errors.description || "Description can't be empty"
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      this.state.errors.designation.length === 0 &&
      this.state.errors.description.length === 0
    ) {
      this.setState({ formValid: this.validateForm(this.state.errors) });
      this.setState({ errorCount: this.countErrors(this.state.errors) });
      console.log(this.state.designation_name);
      const data = {
        // i: this.state.designation_code,
        name: this.state.designation_name,
        description: this.state.designation_description
      };
      if (this.state.type === "edit") {
        const data = {
          id: this.state.designation_code,
          name: this.state.designation_name,
          description: this.state.designation_description
        };
        console.log(data);
        api("PUT", "supermix", "/designation", "", data, "").then(
          res => {
            console.log(res.data);

            if (res.data.status === "VALIDATION_FAILURE") {
              console.log("update");
              this.responeserror(res.data.results.name.message);
            } else {
              Notification("success", res.data.message);
              this.props.reloadrole();
              this.setState({ loading: true });
              this.setState({
                designation_code: "",
                designation_name: "",
                designation_description: "",
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
          name: this.state.designation_name,
          description: this.state.designation_description
        };
        console.log(data);
        api("POST", "supermix", "/designation", "", data, "")
          .then(
            res => {
              console.log(this.state.type);
              console.log(res.data);
              if (res.data.status === "VALIDATION_FAILURE") {
                console.log("jjjj");
                this.responeserror(res.data.results.name.message);
              } else {
                Notification("success", res.data.message);
                this.props.reloadrole();
                // this.props.reload();
                this.setState({ loading: true });
                this.setState({
                  designation_code: "",
                  designation_name: "",
                  designation_description: "",
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
          )
          .catch(error => {
            console.log(error);
          });
      }

      console.log(data);
      console.log("form is valid");
    }
  };
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.editPlantData);
    this.setState({
      visible: nextProps.visible,
      designation_code: nextProps.editPlantData.id,
      designation_name: nextProps.editPlantData.name,
      designation_description: nextProps.editPlantData.description,
      type: nextProps.type
    });
  }

  componentDidMount() {
    console.log(this.props.screen);
  }
  render() {
    const { visible, loading } = this.state;
    const { errors } = this.state;
    console.log(this.props.type);

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
          Add Designation
        </PrimaryButton>
        <Modal
          width='400px'
          visible={visible}
          closable={false}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key='back' onClick={this.handleCancel}>
              Cancel
            </Button>,
            <PrimaryButton
              key='submit'
              loading={loading}
              onClick={this.handleSubmit}
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
                  ? "Edit Designation"
                  : "Add Designation"}
              </p>
              <Icon
                type='close-circle'
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
            {/* <div className="input_wrapper">
              <label for="designation_code" className="label">
                Code:
              </label>

              <Input
                id="designation_code"
                name="designation_code"
                placeholder="Enter the Code "
                onChange={this.handleChange}
                value={this.state.designation_code}
                disabled
              />

              <div style={{ height: "12px" }}></div>
            </div> */}

            {/* User Role */}
            <div className='input_wrapper'>
              <label for='designation_name' className='label'>
                Desigination:
              </label>

              <Input
                id='designation_name'
                name='designation_name'
                placeholder='Enter the Desigination'
                onChange={this.handleChange}
                value={this.state.designation_name}
              />
              {errors.designation.length > 0 && (
                <div style={error}>{errors.designation}</div>
              )}
              {this.state.errormgs.message === "Designation Name" ? (
                <div style={error}>{HandelError(this.state.errormgs)}</div>
              ) : (
                ""
              )}
              <div style={{ height: "12px" }}></div>
            </div>
            <div className='input_wrapper'>
              <label
                for='designation_description'
                className='label'
                style={{ width: "180px" }}
              >
                Description:
              </label>
              <TextArea
                id='designation_description'
                name='designation_description'
                placeholder='Enter the Description'
                onChange={this.handleChange}
                value={this.state.designation_description}
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
// const mapDispatchToProps = dispatch => null;

const mapDispatchToProps = dispatch => {
  return {
    // setting visible to false if we close the modal .. and all state data will be deleted if this function is dispatched
    setDesignationVisiblity: () => {
      dispatch({ type: DISABLE_EDIT_MODE });
      console.log("edit modal closed");
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserRoleAddForm);
