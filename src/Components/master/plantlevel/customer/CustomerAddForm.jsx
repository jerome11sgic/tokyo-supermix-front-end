import React, { Component } from "react";
import { Input, Modal, Button, Icon, Form } from "antd";
import { PrimaryButton } from "../../../styledcomponents/button/button";

import {
  MasterLevelFormTitle,
  MasterLevelForm
} from "../../../styledcomponents/form/MasterLevelForms";
import { connect } from "react-redux";
import { DISABLE_EDIT_MODE } from "../../../../redux/action/master/plantlevel/PlantLevel";
import { api } from "../../../services/AxiosService";
import Notification from "../../../Constant/Notification";
import HandelError from "../../../Constant/HandleError";

const error = {
  color: "red",
  fontSize: "12px",
  width: "160px",
  height: "2px"
};

class CustomerAddForm extends Component {
  state = {
    loading: false,
    visible: false,
    errors: {
      name: "",
      address: "",
      contactno: "",
      email: ""
    },
    formValid: false,
    errorCount: 0,
    errormsgs: "",
    // input fields
    customer_code: "",
    customer_name: "",
    customer_address: "",
    customer_contactno: "",
    customer_email: "",
    // add or edit
    type: "add"
  };

  validateForm = errors => {
    let valid;
    Object.values(errors).forEach(
      val => val.length > 1 && (valid = false),
      (valid = true)
    );
    console.log(valid);
    return valid;
  };

  countErrors = errors => {
    let count = 0;
    Object.values(errors).forEach(val => val.length > 0 && (count = count + 1));
    console.log(count);
    return count;
  };

  showModal = () => {
    this.setState({
      visible: true,
      customer_code: "",
      customer_name: "",
      customer_address: "",
      customer_contactno: "",
      customer_email: ""
    });
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.visible,
      customer_code: nextProps.editPlantData.id,
      customer_name: nextProps.editPlantData.name,
      customer_address: nextProps.editPlantData.address,
      customer_contactno: nextProps.editPlantData.phoneNumber,
      customer_email: nextProps.editPlantData.email,
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
      case "customer_name":
        errors.name =
          value.length === 0
            ? "Name can't be empty"
            : value.length < 3
            ? "Name must be 3 characters long!"
            : "";
        break;
      case "customer_address":
        errors.address =
          value.length === 0
            ? "Address can't be empty"
            : value.length < 3
            ? "Address \n must be 3 characters long!"
            : "";
        break;

      case "customer_contactno":
        errors.contactno = isNaN(value)
          ? `Contact Number must be a number`
          : value.length === 0
          ? "Contact Number can't be empty"
          : value.length < 10
          ? `Contact Number must be 10 characters long!`
          : "";
        break;
      case "customer_email":
        errors.email =
          value.length === 0
            ? "Email can't be empty"
            : value.length < 1
            ? "Email must be 1 characters long!"
            : value.split("").filter(x => x === "@").length !== 1
            ? "Email should contain a @"
            : value.indexOf(".") === -1
            ? "Email should contain at least one dot"
            : "";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  handleCancel = () => {
    if (this.state.type === "edit") {
      this.props.setCustomerVisibility();
    }
    this.setState({
      loading: false,
      visible: false,
      errors: {
        name: "",
        address: "",
        contactno: "",
        email: ""
      },
      formValid: false,
      errorCount: 0,
      errormsgs: "",
      // input fields
      customer_code: "",
      customer_name: "",
      customer_address: "",
      customer_contactno: "",
      customer_email: "",
      // add or edit
      type: "add",
      errormgs: ""
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.errors);
    console.log(this.state.customer_email);

    if (
      this.state.customer_name.length === 0 &&
      this.state.customer_address.length === 0 &&
      this.state.customer_contactno.length === 0 &&
      this.state.customer_email.length === 0
    ) {
      this.setState({
        errors: {
          name: "Name can't be empty",
          address: "Address can't be empty",
          contactno: "Contact Number can't be empty",
          email: "Email can't be empty"
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });

      console.log("form is not valid");
    } else if (
      this.state.customer_name.length === 0 &&
      this.state.errors.name.length === 0
    ) {
      this.setState({
        errors: {
          name: this.state.errors.name || "Name can't be empty",
          address: this.state.errors.address,
          contactno: this.state.errors.contactno,
          email: this.state.errors.email
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
      console.log("form is not valid");
    } else if (
      this.state.customer_address.length === 0 &&
      this.state.errors.address.length === 0
    ) {
      this.setState({
        errors: {
          name: this.state.errors.name,
          address: this.state.errors.address || "Address can't be empty",
          contactno: this.state.errors.contactno,
          email: this.state.errors.email
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
      console.log("form is not valid");
    } else if (
      this.state.customer_contactno.length === 0 &&
      this.state.errors.contactno.length === 0
    ) {
      this.setState({
        errors: {
          name: this.state.errors.name,
          address: this.state.errors.address,
          contactno:
            this.state.errors.contactno || "Contact Number can't be empty",
          email: this.state.errors.email
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
      console.log("form is not valid");
    } else if (
      this.state.customer_email.length === 0 &&
      this.state.errors.email.length === 0
    ) {
      this.setState({
        errors: {
          name: this.state.errors.name,
          address: this.state.errors.address,
          contactno: this.state.errors.contactno,
          email: this.state.errors.email || "Email can't be empty"
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
      console.log("form is not valid");
    } else if (
      this.state.errors.name.length === 0 &&
      this.state.errors.address.length === 0 &&
      this.state.errors.contactno.length === 0 &&
      this.state.errors.email.length === 0
    ) {
      console.log(this.state.formValid);
      console.log(this.state.errorCount);
      console.log("form is valid");

      let data = {
        name: this.state.customer_name,
        address: this.state.customer_address,
        phoneNumber: this.state.customer_contactno,
        email: this.state.customer_email
      };
      if (this.state.type === "add") {
        let data = {
          name: this.state.customer_name,
          address: this.state.customer_address,
          phoneNumber: this.state.customer_contactno,
          email: this.state.customer_email
        };

        api("POST", "supermix", "/customer", "", data, "").then(
          res => {
            console.log(res.data);

            Notification("success", res.data.message);
            this.props.reload();
            this.setState({ loading: true });
            this.setState({
              customer_code: "",
              customer_contactno: "",
              customer_address: "",
              customer_email: "",
              customer_name: "",
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
          id: this.state.customer_code,
          name: this.state.customer_name,
          address: this.state.customer_address,
          phoneNumber: this.state.customer_contactno,
          email: this.state.customer_email
        };
        api("PUT", "supermix", "/customer", "", data, "").then(res => {
          console.log(res.data);

          Notification("success", res.data.message);
          this.props.reload();
          this.setState({ loading: true });
          this.setState({
            customer_code: "",
            customer_contactno: "",
            customer_address: "",
            customer_email: "",
            customer_name: "",
            errormgs: ""
          });
          setTimeout(() => {
            this.setState({ loading: false, visible: false });
          }, 3000);
        });
      }

      console.log(data);
      console.log("form is valid");
    }
  };

  componentDidMount() {
    console.log(this.props.screen);
  }
  render() {
    const { visible, loading } = this.state;
    const { errors } = this.state;
    console.log(this.state.type);
    return (
      <div>
        <PrimaryButton
          onClick={this.showModal}
          style={{
            background: "#001328",
            color: "white",
            border: "none",
            width: "120px"
          }}
        >
          Add Customer
        </PrimaryButton>
        <Modal
          width="500px"
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
                {this.state.type === "edit" ? "Edit Customer" : "Add Customer"}
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
                <label for="customer_code" className="label">
                  Code:
                </label>
                <Input
                  id="customer_code"
                  name="customer_code"
                  value={this.state.customer_code}
                  disabled
                />
                <div style={{ height: "12px" }}></div>
              </div>
            ) : (
              ""
            )}

            {/* Plant Name */}
            <div className="input_wrapper">
              <label for="customer_name" className="label">
                Customer Name:
              </label>

              <Input
                id="customer_name"
                name="customer_name"
                placeholder="Enter the Customer "
                value={this.state.customer_name}
                onChange={this.handleChange}
              />
              {errors.name.length > 0 && <div style={error}>{errors.name}</div>}
              <div style={{ height: "12px" }}></div>
            </div>

            {/* Place */}
            <div className="input_wrapper">
              <label for="customer_address" className="label">
                Address:
              </label>

              <Input
                id="customer_address"
                name="customer_address"
                placeholder="Enter the Address"
                value={this.state.customer_address}
                onChange={this.handleChange}
              />
              {errors.address.length > 0 && (
                <div style={error}>{errors.address}</div>
              )}
              <div style={{ height: "12px" }}></div>
            </div>

            {/* T.P No */}
            <div className="input_wrapper">
              <label for="customer_contactno" className="label">
                Contact No:
              </label>

              <Input
                className="input_number"
                id="customer_contactno"
                name="customer_contactno"
                placeholder="Enter the Contact No"
                value={this.state.customer_contactno}
                onChange={this.handleChange}
              />
              {errors.contactno.length > 0 && (
                <div style={error}>{errors.contactno}</div>
              )}
              <div style={{ height: "12px" }}></div>
            </div>

            {/* Description  */}
            <div className="input_wrapper">
              <label for="customer_email" className="label">
                Email:
              </label>
              <Input
                id="customer_email"
                name="customer_email"
                placeholder="Enter the Email"
                value={this.state.customer_email}
                onChange={this.handleChange}
              />
              {errors.email.length > 0 && (
                <div style={error}>{errors.email}</div>
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
    setCustomerVisibility: () => {
      dispatch({ type: DISABLE_EDIT_MODE });
      console.log("edit modal closed");
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerAddForm);
