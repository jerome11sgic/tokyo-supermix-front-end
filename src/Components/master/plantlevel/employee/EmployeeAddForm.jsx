import React, { Component } from "react";
import { Input, Modal, Button, Icon, Select } from "antd";

import {
  MasterLevelForm,
  MasterLevelFormTitle
} from "../../../styledcomponents/form/MasterLevelForms";
import { PrimaryButton } from "../../../styledcomponents/button/button";
import { api } from "../../../services/AxiosService";
import { connect } from "react-redux";
import Notification from "../../../Constant/Notification";
import HandelError from "../../../Constant/HandleError";
import { DISABLE_EDIT_MODE } from "../../../../redux/action/master/plantlevel/PlantLevel";
const { Option } = Select;

function onBlur() {
  console.log("blur");
}

function onFocus() {
  console.log("focus");
}

function onSearch(val) {
  console.log("search:", val);
}

const error = {
  color: "red",
  fontSize: "12px",
  width: "160px",
  height: "2px"
};

class EmployeeAddForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formValid: false,
      errorCount: null,
      errors: {
        code: "",
        firstName: "",
        lastName: "",
        plant: "",
        desigination: "",
        address: "",
        phoneno: "",
        username: "",
        email: ""
      },
      loading: false,
      visible: false,
      employee_code: "",
      first_name: "",
      last_name: "",
      plant: "",
      desigination: "",
      address: "",
      phoneno: "",
      username: "",
      email: "",
      errormgs: "",
      type: "",
      plantdata: "",
      errorvalmegss: "",
      desiginationEdit: "",
      plantEdit: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.type);
    this.setState({
      visible: nextProps.visible,
      employee_code: nextProps.editPlantData.id,
      first_name: nextProps.editPlantData.firstName,
      last_name: nextProps.editPlantData.lastName,
      plantEdit: nextProps.editPlantData.plantName,
      desiginationEdit: nextProps.editPlantData.designationName,
      address: nextProps.editPlantData.address,
      phoneno: nextProps.editPlantData.phoneNumber,
      email: nextProps.editPlantData.email,
      plant: nextProps.editPlantData.plantCode,
      desigination: nextProps.editPlantData.designationId,
      type: nextProps.type
    });
  }

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
      employee_code: "",
      first_name: "",
      last_name: "",
      plant: "",
      desigination: "",
      address: "",
      phoneno: "",
      // username: "",
      email: ""
    });
  };
  responeserror(error) {
    console.log(error);
    this.setState({
      errormgs: `${error} is exist`
    });
  }

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    if (this.state.type === "edit") {
      this.props.setEmployeeVisibility();
    }
    this.setState({
      visible: false,
      errors: {
        code: "",
        firstName: "",
        lastName: "",
        plant: "",
        desigination: "",
        address: "",
        phoneno: "",
        username: "",
        email: ""
      },
      employee_code: "",
      first_name: "",
      last_name: "",
      plant: "",
      desigination: "",
      address: "",
      phoneno: "",
      // username: "",
      email: "",
      type: "",
      plantEdit: "",
      desiginationEdit: "",
      errorvalmegss: ""
    });
  };

  // handling for select or dropdown
  handleSelect = (name, value) => {
    console.log(name);
    console.log(value);
    // handle select for  plant
    if (name === "plant") {
      this.setState({
        plant: value
      });

      if (value.length !== 0) {
        this.setState({
          errors: {
            // code: this.state.errors.code,
            firstName: this.state.errors.firstName,
            lastName: this.state.errors.lastName,
            plant: "",
            desigination: this.state.errors.desigination,
            address: this.state.errors.address,
            phoneno: this.state.errors.phoneno,
            email: this.state.errors.email
          }
        });
      }
    }

    //handle select for designation
    if (name === "designation") {
      this.setState({
        desigination: value
      });

      if (value.length !== 0) {
        this.setState({
          errors: {
            // code: this.state.errors.code,
            firstName: this.state.errors.firstName,
            lastName: this.state.errors.lastName,
            plant: this.state.errors.plant,
            desigination: "",
            address: this.state.errors.address,
            phoneno: this.state.errors.phoneno,
            email: this.state.errors.email
          }
        });
      }
    }
  };

  //dropdown data
  getAllplant() {
    api("GET", "supermix", "/plants", "", "", "").then(res => {
      console.log(res.data.results.plants.length);
      if (res.data.results.plants.length > 0) {
        console.log("ggg");
        let SelectPlants = res.data.results.plants.map((post, index) => {
          return (
            <Option value={post.code} key={index}>
              {post.name}
            </Option>
          );
        });
        this.setState({
          SelectPlants
        });
      }
    });
  }

  getalldesignation = () => {
    api("GET", "supermix", "/designations", "", "", "").then(res => {
      console.log(res.data);
      if (res.data.results.designations.length > 0) {
        let SelectDesignation = res.data.results.designations.map(
          (post, index) => {
            return (
              <Option value={post.id} key={index}>
                {post.name}
              </Option>
            );
          }
        );
        this.setState({
          SelectDesignation
        });
      }
    });
  };

  handleChange = (event, field) => {
    this.setState({ [field]: event.target.value });
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    console.log(name + " is \t" + value);
    switch (name) {
      case "employee_code":
        errors.code =
          value.length === 0
            ? "Code can't be empty"
            : value.length < 3
            ? "Code must be 3 characters long!"
            : "";
        break;
      case "first_name":
        errors.firstName =
          value.length === 0
            ? "First Name can't be empty"
            : value.length < 3
            ? "First Name \n must be 3 characters long!"
            : value.length > 20
            ? "First Name \n must not be exceeded than 20 characters"
            : value.replace(/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/, "")
            ? "First Name Allow only Letter"
            : "";
        break;
      case "last_name":
        errors.lastName =
          value.length === 0
            ? "Last Name can't be empty"
            : value.length < 3
            ? "Last Name must be 3 characters long!"
            : value.length > 20
            ? "Last Name \n must not be exceeded than 20 characters"
            : value.replace(/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/, "")
            ? "Last Name Allow only Letter"
            : "";
        break;
      case "Plant":
        errors.plant =
          value.length === 0
            ? "Plant can't be empty"
            : value.length < 6
            ? "Plant must be 6 characters long!"
            : "";
        break;
      case "Desigination":
        errors.desigination =
          value.length === 0
            ? "Desigination can't be empty"
            : value.length < 6
            ? "Desigination must be 6 characters long!"
            : "";
        break;
      case "address":
        errors.address =
          value.length === 0
            ? "address can't be empty"
            : value.length < 6
            ? "address must be 6 characters long!"
            : "";
        break;
      case "phoneno":
        errors.phoneno = isNaN(value)
          ? `Contact Number must be a number`
          : value.length === 0
          ? "Contact Number can't be empty"
          : value.length < 6
          ? `Contact Number must be 6 characters long!`
          : "";
        break;
      // case "username":
      //   errors.username =
      //     value.length === 0
      //       ? "UserName can't be empty"
      //       : value.length < 3
      //       ? "UserName must be 6 characters long!"
      //       : "";
      //   break;
      case "email":
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

  handleSubmit = event => {
    event.preventDefault();
    if (
      // this.state.employee_code.length === 0 &&
      this.state.first_name.length === 0 &&
      this.state.last_name.length === 0 &&
      this.state.plant.length === 0 &&
      this.state.desigination.length === 0 &&
      this.state.address.length === 0 &&
      this.state.phoneno.length === 0 &&
      // this.state.username.length === 0 &&
      this.state.email.length === 0
    ) {
      this.setState({
        errors: {
          // code: "code can't be empty",
          firstName: "First Name can't be empty",
          lastName: "Last Name can't be empty",
          plant: "Plant can't be empty",
          desigination: "Desigination can't be empty",
          address: "Address can't be empty",
          phoneno: "Phone No can't be empty",
          // username: "UserName  can't be empty",
          email: "Email can't be empty"
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      this.state.first_name.length === 0 &&
      this.state.errors.firstName.length === 0
    ) {
      this.setState({
        errors: {
          // code: this.state.errors.code,
          firstName: this.state.errors.firstName || "First Name can't be empty",
          lastName: this.state.errors.lastName || "Last Name can't be empty",
          plant: this.state.errors.plant || "Plant can't be empty",
          desigination:
            this.state.errors.desigination || "Designation can't be empty",
          address: this.state.errors.address || "Address can't be empty",
          phoneno: this.state.errors.phoneno || "Phone Number can't be empty",
          email: this.state.errors.email || "Email can't be empty"
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      this.state.last_name.length === 0 &&
      this.state.errors.lastName.length === 0
    ) {
      this.setState({
        errors: {
          // code: this.state.errors.code,
          // username: this.state.errors.username,
          firstName: this.state.errors.firstName || "First Name can't be empty",
          lastName: this.state.errors.lastName || "Last Name can't be empty",
          plant: this.state.errors.plant || "Plant can't be empty",
          desigination:
            this.state.errors.desigination || "Designation can't be empty",
          address: this.state.errors.address || "Address can't be empty",
          phoneno: this.state.errors.phoneno || "Phone Number can't be empty",
          email: this.state.errors.email || "Email can't be empty"
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      this.state.plant.length === 0 &&
      this.state.errors.plant.length === 0
    ) {
      this.setState({
        errors: {
          // code: this.state.errors.code,
          // username: this.state.errors.username,
          firstName: this.state.errors.firstName || "First Name can't be empty",
          lastName: this.state.errors.lastName || "Last Name can't be empty",
          plant: this.state.errors.plant || "Plant can't be empty",
          desigination:
            this.state.errors.desigination || "Designation can't be empty",
          address: this.state.errors.address || "Address can't be empty",
          phoneno: this.state.errors.phoneno || "Phone Number can't be empty",
          email: this.state.errors.email || "Email can't be empty"
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      this.state.desigination.length === 0 &&
      this.state.errors.desigination.length === 0
    ) {
      this.setState({
        errors: {
          // code: this.state.errors.code,
          // username: this.state.errors.username,
          firstName: this.state.errors.firstName || "First Name can't be empty",
          lastName: this.state.errors.lastName || "Last Name can't be empty",
          plant: this.state.errors.plant || "Plant can't be empty",
          desigination:
            this.state.errors.desigination || "Designation can't be empty",
          address: this.state.errors.address || "Address can't be empty",
          phoneno: this.state.errors.phoneno || "Phone Number can't be empty",
          email: this.state.errors.email || "Email can't be empty"
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      this.state.address.length === 0 &&
      this.state.errors.address.length === 0
    ) {
      this.setState({
        errors: {
          // code: this.state.errors.code,
          // username: this.state.errors.username,
          firstName: this.state.errors.firstName || "First Name can't be empty",
          lastName: this.state.errors.lastName || "Last Name can't be empty",
          plant: this.state.errors.plant || "Plant can't be empty",
          desigination:
            this.state.errors.desigination || "Designation can't be empty",
          address: this.state.errors.address || "Address can't be empty",
          phoneno: this.state.errors.phoneno || "Phone Number can't be empty",
          email: this.state.errors.email || "Email can't be empty"
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      this.state.phoneno.length === 0 &&
      this.state.errors.phoneno.length === 0
    ) {
      this.setState({
        errors: {
          // code: this.state.errors.code,
          // username: this.state.errors.username,
          firstName: this.state.errors.firstName || "First Name can't be empty",
          lastName: this.state.errors.lastName || "Last Name can't be empty",
          plant: this.state.errors.plant || "Plant can't be empty",
          desigination:
            this.state.errors.desigination || "Designation can't be empty",
          address: this.state.errors.address || "Address can't be empty",
          phoneno: this.state.errors.phoneno || "Phone Number can't be empty",
          email: this.state.errors.email || "Email can't be empty"
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      this.state.email.length === 0 &&
      this.state.errors.email.length === 0
    ) {
      this.setState({
        errors: {
          // code: this.state.errors.code,
          // username: this.state.errors.username,
          firstName: this.state.errors.firstName || "First Name can't be empty",
          lastName: this.state.errors.lastName || "Last Name can't be empty",
          plant: this.state.errors.plant || "Plant can't be empty",
          desigination:
            this.state.errors.desigination || "Designation can't be empty",
          address: this.state.errors.address || "Address can't be empty",
          phoneno: this.state.errors.phoneno || "Phone Number can't be empty",
          email: this.state.errors.email || "Email can't be empty"
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      // this.state.code.length === 0 &&
      this.state.errors.firstName.length === 0 &&
      this.state.errors.lastName.length === 0 &&
      this.state.errors.plant.length === 0 &&
      this.state.errors.desigination.length === 0 &&
      this.state.errors.address.length === 0 &&
      this.state.errors.phoneno.length === 0 &&
      // this.state.errors.username.length === 0 &&
      this.state.errors.email.length === 0
    ) {
      console.log(this.state.errors);
      this.setState({ formValid: this.validateForm(this.state.errors) });
      this.setState({ errorCount: this.countErrors(this.state.errors) });
      console.log(this.state.formValid);
      console.log(this.state.errorCount);

      if (this.state.type === "edit") {
        const data = {
          id: this.state.employee_code,
          firstName: this.state.first_name,
          lastName: this.state.last_name,
          plantCode: this.state.plant,
          designationId: this.state.desigination,
          address: this.state.address,
          phoneNumber: this.state.phoneno,
          // username: this.state.username,
          email: this.state.email
        };
        console.log(data);
        api("PUT", "supermix", "/employee", "", data, "")
          .then(
            res => {
              console.log(res.data);

              if (res.data.status === "VALIDATION_FAILURE") {
                console.log("update");
                this.responeserror(res.data.results.name.message);
              } else {
                Notification("success", res.data.message);
                this.props.reload();
                this.setState({ loading: true });
                this.setState({
                  employee_code: "",
                  first_name: "",
                  last_name: "",
                  plant: "",
                  desigination: "",
                  address: "",
                  phoneno: "",
                  // username: "",
                  email: "",
                  errormgs: ""
                });
                setTimeout(() => {
                  this.setState({ loading: false, visible: false });
                }, 3000);
              }
            },
            error => {
              this.setState({
                errorvalmegss: error.validationFailures[0]
              });
              console.log("DEBUG34: ", error);
              console.log(HandelError(error.validationFailures[0]));
            }
          )
          .catch(error => {
            // this.setState({
            //   errormgs: "Plant Name Exist"
            // });
            console.log(error);
          });
      } else {
        const data = {
          // code: this.state.employee_code,
          firstName: this.state.first_name,
          lastName: this.state.last_name,
          plantCode: this.state.plant,
          designationId: this.state.desigination,
          address: this.state.address,
          phoneNumber: this.state.phoneno,
          // username: this.state.username,
          email: this.state.email
        };
        api("POST", "supermix", "/employee", "", data, "").then(
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
                employee_code: "",
                first_name: "",
                last_name: "",
                plant: "",
                desigination: "",
                address: "",
                phoneno: "",
                // username: "",
                email: "",
                errormgs: ""
              });
              setTimeout(() => {
                this.setState({ loading: false, visible: false });
              }, 3000);
            }
          },
          error => {
            this.setState({
              errorvalmegss: error.validationFailures[0]
            });
            console.log("DEBUG34: ", error);
            console.log(HandelError(error.validationFailures[0]));
          }
        );
      }

      // console.log(data);
      console.log("form is valid");
    }
  };

  componentDidMount() {
    this.getAllplant();
    this.getalldesignation();
    console.log(this.props.screen);
  }
  render() {
    const { visible, loading } = this.state;
    const { errors } = this.state;
    console.log(this.state.errorCount);
    console.log(this.state.desigination);
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
          Add Employee
        </PrimaryButton>
        <Modal
          width="850px"
          visible={visible}
          closable={false}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          title={
            <MasterLevelFormTitle>
              <p
                style={{
                  color: "white"
                }}
              >
                {this.state.type === "edit" ? "Edit Employee" : "Add Employee"}
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
        >
          <MasterLevelForm>
            {/* Code */}
            <div className="input_wrapper">
              <label for="employee_code" className="label">
                Code:
              </label>

              <Input
                id="employee_code"
                name="employee_code"
                placeholder="Enter the Code "
                onChange={this.handleChange}
                value={this.state.employee_code}
                disabled={this.props.type === "edit" ? true : true}
              />
              {/* {errors.code.length > 0 && <div style={error}>{errors.code}</div>} */}
              <div style={{ height: "12px" }}></div>
            </div>

            {/* Plant Name */}
            <div className="input_wrapper">
              <label for="first_name" className="label">
                First Name:
              </label>

              <Input
                id="first_name"
                name="first_name"
                placeholder="Enter the First Name"
                onChange={this.handleChange}
                value={this.state.first_name}
              />
              {errors.firstName.length > 0 && (
                <div style={error}>{errors.firstName}</div>
              )}
              <div style={error}>{this.state.errormgs}</div>
              <div style={{ height: "12px" }}></div>
            </div>

            {/* Place */}
            <div className="input_wrapper">
              <label for="last_name" className="label">
                Last Name:
              </label>

              <Input
                id="last_name"
                name="last_name"
                placeholder="Enter the Last Name"
                onChange={this.handleChange}
                value={this.state.last_name}
              />
              {errors.lastName.length > 0 && (
                <div style={error}>{errors.lastName}</div>
              )}
              <div style={error}>{this.state.errormgs}</div>
              <div style={{ height: "12px" }}></div>
            </div>

            {/* T.P No */}
            <div className="input_wrapper">
              <label for="plant" className="label">
                Plant:
              </label>

              <Select
                showSearch
                style={{ width: 180 }}
                id="plant"
                name="plant"
                placeholder="Select a Plant"
                optionFilterProp="children"
                onChange={value => this.handleSelect("plant", value)}
                onFocus={onFocus}
                value={this.state.plantEdit}
                onBlur={onBlur}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {this.state.SelectPlants}
              </Select>
              {errors.plant.length > 0 && (
                <div style={error}>{errors.plant}</div>
              )}
              <div style={error}>{this.state.errormgs}</div>
              <div style={{ height: "12px" }}></div>
            </div>

            <div className="input_wrapper">
              <label for="desigination" className="label">
                Desigination:
              </label>

              <Select
                showSearch
                id="desigination"
                name="desigination"
                style={{ width: 170 }}
                placeholder="Select the Desigination"
                optionFilterProp="children"
                onChange={value => this.handleSelect("designation", value)}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                value={this.state.desiginationEdit}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {this.state.SelectDesignation}
              </Select>
              {errors.desigination.length > 0 && (
                <div style={error}>{errors.desigination}</div>
              )}
              <div style={error}>{this.state.errormgs}</div>
              <div style={{ height: "12px" }}></div>
            </div>
            <div className="input_wrapper">
              <label for="address" className="label">
                Address:
              </label>

              <Input
                id="address"
                name="address"
                placeholder="Enter the Address"
                onChange={this.handleChange}
                value={this.state.address}
              />
              {errors.address.length > 0 && (
                <div style={error}>{errors.address}</div>
              )}
              <div style={error}>{this.state.errormgs}</div>
              <div style={{ height: "12px" }}></div>
            </div>
            <div className="input_wrapper">
              <label for="phoneno" className="label">
                Contact No:
              </label>

              <Input
                id="phoneno"
                name="phoneno"
                placeholder="Enter the Contact No"
                onChange={this.handleChange}
                value={this.state.phoneno}
              />
              {errors.phoneno.length > 0 && (
                <div style={error}>{errors.phoneno}</div>
              )}
              <div style={error}>{this.state.errormgs}</div>
              <div style={{ height: "12px" }}></div>
            </div>

            <div className="input_wrapper">
              <label for="email" className="label">
                Email:
              </label>{" "}
              <Input
                id="email"
                name="email"
                placeholder="Enter the Email"
                onChange={this.handleChange}
                value={this.state.email}
              />
              {errors.email.length > 0 && (
                <div style={error}>{errors.email}</div>
              )}
              {this.state.errorvalmegss.message == "email" ? (
                <div style={error}>{HandelError(this.state.errorvalmegss)}</div>
              ) : (
                ""
              )}
              {/* <div style={error}>{this.state.errormgs}</div> */}
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
    setEmployeeVisibility: () => {
      dispatch({ type: DISABLE_EDIT_MODE });
      console.log("edit modal closed");
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeAddForm);
