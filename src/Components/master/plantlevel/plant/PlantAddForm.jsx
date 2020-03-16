import React, { Component } from "react";
import { Input, Modal, Button, Icon } from "antd";
import { api } from "../../../services/AxiosService";
import { PrimaryButton } from "../../../styledcomponents/button/button";
import {
  MasterLevelForm,
  MasterLevelFormTitle
} from "../../../styledcomponents/form/MasterLevelForms";
import Notificationfuc from "../../../Constant/Notification";
import HandelError from "../../../Constant/HandleError";
import { connect } from "react-redux";
import { DISABLE_EDIT_MODE } from "../../../../redux/action/master/plantlevel/PlantLevel";

// function onChange(date, dateString) {
//   console.log(date, dateString);
// }

const error = {
  color: "red",
  fontSize: "12px",
  width: "160px",
  height: "2px"
};

class PlantAddForm extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props.editPlantData)
    this.state = {
      formValid: false,
      errorCount: 0,
      errors: {
        code: "",
        plant: "",
        address: "",
        phoneNumber: ""
      },
      loading: false,
      visible: false,
      plant_code: "",
      plant_name: "",
      plant_address: "",
      plant_contactno: "",
      errormgs: "",
      type: "add"
    };
  }

  validateForm = errors => {
    let valid;
    Object.values(errors).forEach(
      val => val.length > 1 && (valid = false),
      (valid = true)
    );
    // this.setState({
    //   formValid: valid
    // })
    console.log(valid);

    return valid;
  };

  countErrors = errors => {
    let count = 0;
    Object.values(errors).forEach(val => val.length > 0 && (count = count + 1));

    // this.setState({
    //   errorCount: count
    // })
    console.log(count);

    return count;
  };

  handleChange = (event, field) => {
    this.setState({ [field]: event.target.value });
    this.setState({ errormgs: "" });
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    // console.log(name + " is \t" + value);
    switch (name) {
      case "plant_code":
        errors.code =
          value.length === 0
            ? "Code can't be empty"
            : value.length < 1
            ? "Code must be one characters long!"
            : "";
        break;
      case "plant_name":
        errors.plant =
          value.length === 0
            ? "Plant Name can't be empty"
            : value.length < 3
            ? "Plant Name \n must be 3 characters long!"
            : value.replace(/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/, "")
            ? "Plant Name allow only letters"
            : "";
        break;
      case "plant_address":
        errors.address =
          value.length === 0
            ? "Address can't be empty"
            : value.length < 3
            ? "Address must be 3 characters long!"
            : "";
        break;
      case "plant_contactno":
        errors.phoneNumber = isNaN(value)
          ? `Contact Number must be a number`
          : value.length === 0
          ? "Contact Number can't be empty"
          : value.length < 9
          ? `Contact Number must be 10 characters long!`
          : "";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (
      this.state.plant_code.length === 0 &&
      this.state.plant_name.length === 0 &&
      this.state.plant_address.length === 0 &&
      this.state.plant_contactno.length === 0
    ) {
      this.setState({
        errors: {
          code: "Code can't be empty",
          plant: "Plant Name can't be empty",
          address: "Address can't be empty",
          phoneNumber: "Phone Number can't be empty"
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      this.state.plant_code.length === 0 &&
      this.state.errors.code.length === 0
    ) {
      this.setState({
        errors: {
          code: this.state.errors.code || "Code can't be empty",
          plant: this.state.errors.plant,
          address: this.state.errors.address,
          phoneNumber: this.state.errors.phoneNumber
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      this.state.plant_name.length === 0 &&
      this.state.errors.plant.length === 0
    ) {
      this.setState({
        errors: {
          code: this.state.errors.code,
          plant: this.state.errors.plant || "Plant Name can't be empty",
          address: this.state.errors.address,
          phoneNumber: this.state.errors.phoneNumber
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      this.state.plant_address.length === 0 &&
      this.state.errors.address.length === 0
    ) {
      this.setState({
        errors: {
          code: this.state.errors.code,
          plant: this.state.errors.plant,
          address: this.state.errors.address || "Addres can't be empty",
          phoneNumber: this.state.errors.phoneNumber
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      this.state.plant_contactno.length === 0 &&
      this.state.errors.phoneNumber.length === 0
    ) {
      this.setState({
        errors: {
          code: this.state.errors.code,
          plant: this.state.errors.plant,
          address: this.state.errors.address,
          phoneNumber:
            this.state.errors.phoneNumber || "Phone Number can't be empty"
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      this.state.errors.code.length === 0 &&
      this.state.errors.plant.length === 0 &&
      this.state.errors.address.length === 0 &&
      this.state.errors.phoneNumber.length === 0
    ) {
      console.log(this.state.errors);
      this.setState({ formValid: this.validateForm(this.state.errors) });
      this.setState({ errorCount: this.countErrors(this.state.errors) });
      console.log(this.state.formValid);
      console.log(this.state.errorCount);

      const data = {
        code: this.state.plant_code,
        name: this.state.plant_name,
        address: this.state.plant_address,
        phoneNumber: this.state.plant_contactno
      };
      if (this.state.type === "add") {
        api("POST", "supermix", "/plant", "", data, "")
          .then(
            res => {
              console.log(res.data);
              if (res.data.status === "VALIDATION_FAILURE") {
                console.log("add");
                this.responeserror(res.data.results.name.message);
              } else {
                Notificationfuc("success", res.data.message);
                this.props.reload();
                this.setState({ loading: true });
                this.setState({
                  plant_code: "",
                  plant_name: "",
                  plant_address: "",
                  plant_contactno: "",
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
            this.setState({
              // errormgs: "Plant Name Exist"
            });
            console.log(error);
          });
      } else {
        const data = {
          code: this.state.plant_code,
          name: this.state.plant_name,
          address: this.state.plant_address,
          phoneNumber: this.state.plant_contactno
        };
        api("PUT", "supermix", "/plant", "", data, "")
          .then(
            res => {
              console.log(res.data);

              if (res.data.status == "VALIDATION_FAILURE") {
                console.log("update");
                this.responeserror(res.data.results.name.message);
              } else {
                Notificationfuc("success", res.data.message);
                this.props.reload();
                this.setState({ loading: true });
                this.setState({
                  plant_code: "",
                  plant_name: "",
                  plant_address: "",
                  plant_contactno: "",
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
            // this.setState({
            //   errormgs: "Plant Name Exist"
            // });
            // console.log(error.response.data);
          });
      }
      console.log(data);
      console.log("form is valid");
    }
  };

  showModal = () => {
    this.setState({
      visible: true,
      plant_code: "",
      plant_name: "",
      plant_address: "",
      plant_contactno: ""
    });
  };

  responeserror(error) {
    console.log(error);
    this.setState({
      errormgs: `${error} is exist`
    });
  }

  //cancelling or closing the modal
  handleCancel = () => {
    if (this.state.type === "edit") {
      // we call the redux function to dispatch and delete all the global redux state to close the modal
      this.props.setPlantVisiblity();
    }

    this.setState({
      visible: false,
      formValid: false,
      errors: {
        code: "",
        plant: "",
        address: "",
        phoneNumber: ""
      },
      plant_code: "",
      plant_name: "",
      plant_address: "",
      plant_contactno: "",
      errormgs: ""
    });
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.visible,
      plant_code: nextProps.editPlantData.code,
      plant_name: nextProps.editPlantData.name,
      plant_address: nextProps.editPlantData.address,
      plant_contactno: nextProps.editPlantData.phoneNumber,
      type: nextProps.type
    });
  }

  render() {
    const { visible, loading } = this.state;
    const { errors } = this.state;
    console.log(this.state.errorCount);

    // console.log(this.props.visible);

    // console.log(this.state.errormgs);
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
          Add Plant
        </PrimaryButton>
        <Modal
          visible={visible}
          closable={false}
          loading={loading}
          onCancel={this.handleCancel}
          title={
            <MasterLevelFormTitle>
              <p
                style={{
                  color: "white"
                }}
              >
                {this.state.type === "edit" ? "Edit Plant" : "Add Plant"}
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
          width='600px'
        >
          <MasterLevelForm style={{ justifyContent: "space-evenly" }}>
            {/* Code */}

            {/* Code */}
            <div className='input_wrapper'>
              <label for='plant_code' className='label'>
                Code:
              </label>
              <Input
                id='plant_code'
                name='plant_code'
                placeholder='Enter the Code '
                onChange={this.handleChange}
                value={this.state.plant_code}
                disabled={this.state.type === "edit" ? true : false}
              />

              {errors.code.length > 0 && <div style={error}>{errors.code}</div>}
              {this.state.errormgs.message === "PlantId" ? (
                <div style={error}>{HandelError(this.state.errormgs)}</div>
              ) : (
                ""
              )}
              <div style={{ height: "12px" }}></div>
            </div>

            {/* Plant Name */}
            <div className='input_wrapper'>
              <label for='plant_name' className='label'>
                Plant:
              </label>
              <Input
                id='plant_name'
                name='plant_name'
                placeholder='Enter the Plant Name '
                onChange={this.handleChange}
                value={this.state.plant_name}
              />

              {errors.plant.length > 0 && (
                <div style={error}>{errors.plant}</div>
              )}
              {this.state.errormgs.message == "PlantName" ? (
                <div style={error}>{HandelError(this.state.errormgs)}</div>
              ) : (
                ""
              )}

              <div style={{ height: "12px" }}></div>
            </div>

            {/* Place */}
            <div className='input_wrapper'>
              <label for='plant_address' className='label'>
                Address:
              </label>
              <Input
                id='plant_address'
                name='plant_address'
                placeholder='Enter the Address '
                onChange={this.handleChange}
                value={this.state.plant_address}
              />
              {errors.address.length > 0 && (
                <div style={error}>{errors.address}</div>
              )}
              <div style={{ height: "12px" }}></div>
            </div>

            {/* Contact Number */}
            <div className='input_wrapper'>
              <label for='plant_contactno' className='label'>
                Contact No:
              </label>
              <Input
                className='input_number'
                id='plant_contactno'
                name='plant_contactno'
                placeholder='Enter the Contact No '
                onChange={this.handleChange}
                value={this.state.plant_contactno}
              />
              {errors.phoneNumber.length > 0 && (
                <div style={error}>{errors.phoneNumber}</div>
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
    setPlantVisiblity: () => {
      dispatch({ type: DISABLE_EDIT_MODE });
      console.log("edit modal closed");
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlantAddForm);
