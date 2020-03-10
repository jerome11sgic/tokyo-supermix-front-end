import React, { Component } from "react";
import { Input, Modal, Icon, Select, Button, Form, DatePicker } from "antd";
import { PrimaryButton } from "../../../styledcomponents/button/button";
import {
  MasterLevelFormTitle,
  MasterLevelForm
} from "../../../styledcomponents/form/MasterLevelForms";
import moment from "moment";
import { api } from "../../../services/AxiosService";
import { connect } from "react-redux";
import Notification from "../../../Constant/Notification";
import HandelError from "../../../Constant/HandleError";
import { DISABLE_EDIT_MODE } from "../../../../redux/action/master/plantlevel/PlantLevel";

const Option = Select;

const error = {
  color: "red",
  fontSize: "12px",
  width: "160px",
  height: "0.2px"
};

class AddProjectForm extends Component {
  state = {
    loading: false,
    visible: false,
    code: "",
    start_date: "",
    project_name: "",
    customer: "",
    customer_edit: "",
    contact_person: "",
    contact_person_edit: "",
    contact_no: "",
    plant: "",
    plant_edit: "",
    type: "add",
    errors: {
      code: "",
      project_name: "",
      start_date: "",
      customer: "",
      contact_person: "",
      contact_no: "",
      plant: ""
    },
    errormgs: "",
    errorvalmegss: ""
  };

  showModal = () => {
    this.setState({
      visible: true,
      code: "",
      start_date: "",
      project_name: "",
      customer: "",
      customer_edit: "",
      contact_person: "",
      contact_person_edit: "",
      contact_no: "",
      plant: "",
      plant_edit: "",
      type: "add",
      errors: {
        code: "",
        project_name: "",
        customer: "",
        start_date: "",
        contact_person: "",
        contact_no: "",
        plant: ""
      }
    });
  };

  componentDidMount() {
    this.getAllplant();
    this.getAllCustomers();
  }

  //dropdown data for plant
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

  //dropdown data for plant
  getAllCustomers() {
    api("GET", "supermix", "/customers", "", "", "").then(res => {
      console.log(res.data.results);
      if (res.data.results.customers.length > 0) {
        console.log("ggg");
        let SelectCustomers = res.data.results.customers.map((post, index) => {
          return (
            <Option value={post.id} key={index}>
              {post.name}
            </Option>
          );
        });
        this.setState({
          SelectCustomers
        });
      }
    });
  }

  handleChange = (event, field) => {
    this.setState({ [field]: event.target.value });
    this.setState({ errormgs: "" });
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    console.log(name + " is \n" + value);
    switch (name) {
      case "code":
        errors.code =
          value.length === 0
            ? "Code can't be empty"
            : value.length < 2
            ? "Code \n must be 2 characters long!"
            : !isNaN(value)
            ? "Code won't allow only letters"
            : "";
        break;
      case "project_name":
        errors.project_name =
          value.length === 0
            ? "Name can't be empty"
            : value.length < 3
            ? "Name \n must be 3 characters long!"
            : !isNaN(value)
            ? "Code won't allow only letters"
            : "";
        break;

      case "contact_no":
        errors.contact_no =
          value.length === 0
            ? "contact no can't be empty"
            : value.length < 8
            ? "contact no \n must be 8 characters long!"
            : // : isNaN(value)
              // ? "contact no won't allow only letters"
              "";
        break;
      case "contact_person":
        errors.contact_person =
          value.length === 0
            ? "contact person can't be empty"
            : value.length < 3
            ? "contact person \n must be 3 characters long!"
            : !isNaN(value)
            ? "contact person won't allow only numbers"
            : "";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  // handling for select or dropdown
  handleSelect = (name, value) => {
    const { errors } = this.state;
    console.log(name);
    console.log(value);

    // const { errors } = this.state;
    // handle select for  customer
    if (name === "customer") {
      this.setState({
        customer: value,
        customer_edit: value,
        errors: {
          code: errors.code,
          project_name: errors.project_name,
          start_date: errors.start_date,
          customer: "",
          contact_person: errors.contact_person,
          contact_no: errors.contact_no,
          plant: errors.plant
        }
      });
    }

    // handle select for  plant
    if (name === "plant") {
      this.setState({
        plant: value,
        plant_edit: value,
        errors: {
          code: errors.code,
          project_name: errors.project_name,
          start_date: errors.start_date,
          customer: errors.customer,
          contact_person: errors.contact_person,
          contact_no: errors.contact_no,
          plant: ""
        }
      });
    }
  };

  handleDates(name, dateString, field) {
    const { errors } = this.state;
    console.log(name);
    console.log(dateString);
    console.log(field);
    let convertedDate = moment(dateString).format("YYYY-MM-DD");
    console.log(convertedDate);
    if (name === "start_date") {
      this.setState({
        start_date: dateString,
        start_date_edit: dateString,
        errors: {
          code: errors.code,
          project_name: errors.project_name,
          start_date: "",
          customer: errors.customer,
          contact_person: errors.contact_person,
          contact_no: errors.contact_no,
          plant: errors.plant
        }
      });
    }
  }

  handleCancel = () => {
    if (this.state.type === "edit") {
      this.props.setProjectVisibility();
    }
    this.setState({
      loading: false,
      visible: false,
      code: "",
      start_date: "",
      project_name: "",
      customer: "",
      customer_edit: "",
      contact_person: "",
      contact_person_edit: "",
      contact_no: "",
      plant: "",
      plant_edit: "",
      type: "add",
      errors: {
        code: "",
        project_name: "",
        customer: "",
        start_date: "",
        contact_person: "",
        contact_no: "",
        plant: ""
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      visible,
      loading,
      code,
      project_name,
      start_date,
      customer,
      customer_edit,
      contact_person,
      contact_no,
      plant,
      plant_edit,
      type,
      errors
    } = this.state;

    if (
      code.length === 0 &&
      project_name.length === 0 &&
      start_date.length === 0 &&
      customer.length === 0 &&
      contact_person.length === 0 &&
      contact_no.length === 0 &&
      plant.length === 0
    ) {
      this.setState({
        errors: {
          code: "code can't be empty",
          project_name: "name can't be empty",
          customer: "customer can't be empty",
          start_date: "start date can't be empty",
          contact_person: "contact person can't be empty",
          contact_no: "contact no can't be empty",
          plant: "plant can't be empty"
        }
      });
    } else if (errors.code.length === 0 && code.length === 0) {
      this.setState({
        errors: {
          code: errors.code || "code can't be empty",
          project_name: errors.project_name,
          start_date: errors.start_date,
          customer: errors.customer,
          contact_person: errors.contact_person,
          contact_no: errors.contact_no,
          plant: errors.plant
        }
      });
    } else if (errors.project_name.length === 0 && project_name.length === 0) {
      this.setState({
        errors: {
          code: errors.code,
          project_name: errors.project_name || "project name can't be empty",
          start_date: errors.start_date,
          customer: errors.customer,
          contact_person: errors.contact_person,
          contact_no: errors.contact_no,
          plant: errors.plant
        }
      });
    } else if (errors.start_date.length === 0 && start_date.length === 0) {
      this.setState({
        errors: {
          code: errors.code,
          project_name: errors.project_name,
          start_date: errors.start_date || "start date can't be empty",
          customer: errors.customer,
          contact_person: errors.contact_person,
          contact_no: errors.contact_no,
          plant: errors.plant
        }
      });
    } else if (errors.customer.length === 0 && customer.length === 0) {
      this.setState({
        errors: {
          code: errors.code,
          project_name: errors.project_name,
          start_date: errors.start_date,
          customer: errors.customer || "customer can't be empty",
          contact_person: errors.contact_person,
          contact_no: errors.contact_no,
          plant: errors.plant
        }
      });
    } else if (
      errors.contact_person.length === 0 &&
      contact_person.length === 0
    ) {
      this.setState({
        errors: {
          code: errors.code,
          project_name: errors.project_name,
          start_date: errors.start_date,
          customer: errors.customer,
          contact_person:
            errors.contact_person || "contact person can't be empty",
          contact_no: errors.contact_no,
          plant: errors.plant
        }
      });
    } else if (errors.contact_no.length === 0 && contact_no.length === 0) {
      this.setState({
        errors: {
          code: errors.code,
          project_name: errors.project_name,
          start_date: errors.start_date,
          customer: errors.customer,
          contact_person: errors.contact_person,
          contact_no: errors.contact_no || "contact no can't be empty",
          plant: errors.plant
        }
      });
    } else if (errors.plant.length === 0 && plant.length === 0) {
      this.setState({
        errors: {
          code: errors.code,
          project_name: errors.project_name,
          start_date: errors.start_date,
          customer: errors.customer,
          contact_person: errors.contact_person,
          contact_no: errors.contact_no,
          plant: errors.plant || "plant no can't be empty"
        }
      });
    } else if (
      errors.code.length === 0 &&
      errors.contact_no.length === 0 &&
      errors.contact_person.length === 0 &&
      errors.customer.length === 0 &&
      errors.plant.length === 0 &&
      errors.project_name.length === 0 &&
      errors.start_date.length === 0
    ) {
      console.log("form is valid");
      if (this.state.type === "edit") {
        const data = {
          code: code,
          name: project_name,
          contactNumber: contact_no,
          startDate: moment(start_date).format("YYYY-MM-DD"),
          customerId: customer_edit,
          plantCode: plant_edit,
          contactPerson: contact_person
        };
        console.log(data);
        api("PUT", "supermix", "/project", "", data, "")
          .then(
            res => {
              console.log(res.data);

              if (res.data.status === "VALIDATION_FAILURE") {
                console.log("update");
                this.responeserror(res.data.results.name.message);
              } else {
                Notification("success", res.data.message);
                this.props.reload();
                this.setState({
                  loading: true,
                  code: "",
                  start_date: "",
                  project_name: "",
                  customer: "",
                  contact_person: "",
                  contact_no: "",
                  plant: ""
                });
                setTimeout(() => {
                  this.setState({ loading: false, visible: false });
                }, 1500);
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
        //         code: "pr01"
        // name: "yifuf"
        // contactNumber: "12456494"
        // contactPerson: "uhguhfuf"
        // startDate: "2020-02-20"
        // customerId: 1
        // plantCode: "p01"
        // plantName: "jaffna"
        // customerName: "kiri"
        const data = {
          code: code,
          name: project_name,
          contactNumber: contact_no,
          startDate: moment(start_date).format("YYYY-MM-DD"),
          customerId: customer,
          plantCode: plant,
          contactPerson: contact_person
        };
        console.log(data);
        api("POST", "supermix", "/project", "", data, "").then(
          res => {
            console.log(res.data);
            if (res.data.status === "VALIDATION_FAILURE") {
              console.log("add");
              this.responeserror(res.data.results.name.message);
            } else {
              Notification("success", res.data.message);
              this.props.reload();
              this.setState({
                loading: true,
                code: "",
                start_date: "",
                project_name: "",
                customer: "",
                contact_person: "",
                contact_no: "",
                plant: ""
              });
              setTimeout(() => {
                this.setState({ loading: false, visible: false });
              }, 1500);
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
    }
  };

  //   code: "pr01"
  // name: "yifuf"
  // contactNumber: "12456494"
  // contactPerson: "uhguhfuf"
  // startDate: "2020-02-20"
  // customerId: 1
  // plantCode: "p01"
  // plantName: "jaffna"
  // customerName: "kiri"

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.type);
    this.setState({
      visible: nextProps.visible,
      code: nextProps.editPlantData.code,
      start_date: moment(nextProps.editPlantData.startDate, "YYYY-MM-DD"),
      project_name: nextProps.editPlantData.name,
      customer: nextProps.editPlantData.customerName,
      customer_edit: nextProps.editPlantData.customerId,
      contact_person: nextProps.editPlantData.contactPerson,
      contact_no: nextProps.editPlantData.contactNumber,
      plant: nextProps.editPlantData.plantName,
      plant_edit: nextProps.editPlantData.plantCode,
      type: nextProps.type
    });
  }

  render() {
    const {
      visible,
      loading,
      errors,
      code,
      project_name,
      start_date,
      customer,
      contact_person,
      contact_no,
      plant,
      type
    } = this.state;

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
          Add Project
        </PrimaryButton>
        <Modal
          width="800px"
          visible={visible}
          closable={false}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <PrimaryButton
              key="submit"
              loading={loading}
              onClick={this.handleSubmit}
              style={{ background: "#001328", color: "white", border: "none" }}
            >
              Submit
            </PrimaryButton>
          ]}
          title={
            <MasterLevelFormTitle>
              <p
                style={{
                  color: "white"
                }}
              >
                Add Project
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
              <label for="code" className="label">
                Code:
              </label>

              <Input
                id="code"
                name="code"
                placeholder="Enter the Code "
                value={code}
                onChange={this.handleChange}
                disabled={type === "edit" ? true : false}
              />
              {errors.code.length > 0 && <div style={error}>{errors.code}</div>}
              <div style={{ height: "12px" }}></div>
            </div>

            <div className="input_wrapper">
              <label for="project_name" className="label">
                Project Name:
              </label>

              <Input
                id="project_name"
                name="project_name"
                placeholder="Enter Project Name"
                value={project_name}
                onChange={this.handleChange}
              />
              {errors.project_name.length > 0 && (
                <div style={error}>{errors.project_name}</div>
              )}
              <div style={{ height: "12px" }}></div>
            </div>

            <div className="input_wrapper">
              <label for="start_date" className="label">
                Start Date:
              </label>
              <DatePicker
                id="start_date"
                name="start_date"
                format={"YYYY-MM-DD"}
                showToday
                // disabledDate={this.disabledDate()}
                value={start_date}
                onChange={(dateString, field) =>
                  this.handleDates("start_date", dateString, field)
                }
                // disabledTime={() => Date.now()}
              />
              {errors.start_date.length > 0 && (
                <div style={error}>{errors.start_date}</div>
              )}
              <div style={{ height: "12px" }}></div>
            </div>

            <div className="input_wrapper">
              <label for="customer" className="label">
                Customer
              </label>

              <Select
                id="customer"
                placeholder="Select Customer"
                name="customer "
                style={{ width: "180px" }}
                value={customer}
                onChange={value => this.handleSelect("customer", value)}
              >
                {this.state.SelectCustomers}
              </Select>
              {errors.customer.length > 0 && (
                <div style={error}>{errors.customer}</div>
              )}
              <div style={{ height: "12px" }}></div>
            </div>

            <div className="input_wrapper">
              <label for="contact_person " className="label">
                Contact Person
              </label>

              <Input
                id="contact_person"
                placeholder="Select Contact Person"
                name="contact_person"
                style={{ width: "180px" }}
                value={contact_person}
                onChange={this.handleChange}
              />
              {errors.contact_person.length > 0 && (
                <div style={error}>{errors.contact_person}</div>
              )}
              <div style={{ height: "12px" }}></div>
            </div>
            <div className="input_wrapper">
              <label for="contact_no" className="label">
                Contact No
              </label>

              <Input
                id="contact_no"
                placeholder="Enter Contact No"
                name="contact_no"
                style={{ width: "180px" }}
                value={contact_no}
                onChange={this.handleChange}
              />
              {errors.contact_no.length > 0 && (
                <div style={error}>{errors.contact_no}</div>
              )}
              <div style={{ height: "12px" }}></div>
            </div>

            <div className="input_wrapper">
              <label for="plant" className="label">
                Plant
              </label>

              <Select
                id="plant"
                placeholder="Select Plant"
                name="plant "
                style={{ width: "180px" }}
                value={plant}
                onChange={value => this.handleSelect("plant", value)}
              >
                {this.state.SelectPlants}
              </Select>
              {errors.plant.length > 0 && (
                <div style={error}>{errors.plant}</div>
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
    setProjectVisibility: () => {
      dispatch({ type: DISABLE_EDIT_MODE });
      console.log("edit modal closed");
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProjectForm);
