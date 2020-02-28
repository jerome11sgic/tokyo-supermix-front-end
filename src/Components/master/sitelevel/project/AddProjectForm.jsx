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

const Option = Select;

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
    errors: {}
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
      errors: {}
    });
  };

  handleChange = (event, field) => {
    this.setState({ [field]: event.target.value });
    this.setState({ errormgs: "" });
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    // console.log(name + " is \t" + value);
    // switch (name) {
    //   case "pour_name":
    //     errors.pour_name =
    //       value.length === 0
    //         ? "Pour No can't be empty"
    //         : value.length < 3
    //         ? "Pour No \n must be 3 characters long!"
    //         : // : !isNaN(value)
    //           // ? "Pour No won't allow only letters"
    //           "";
    //     break;

    //   default:
    //     break;
    // }

    this.setState({ errors, [name]: value });
  };

  // handling for select or dropdown
  handleSelect = (name, value) => {
    console.log(name);
    console.log(value);

    // const { errors } = this.state;
    // handle select for  customer
    if (name === "customer") {
      this.setState({
        customer: value,
        customer_edit: value
      });
    }

    // handle select for  contact_person
    if (name === "contact_person") {
      this.setState({
        contact_person: value,
        contact_person_edit: value
      });
    }

    // handle select for  plant
    if (name === "plant") {
      this.setState({
        plant: value,
        plant_edit: value
      });
    }
  };

  handleCancel = () => {
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
      errors: {}
    });
  };

  handleDates(name, dateString, field) {
    console.log(name);
    console.log(dateString);
    console.log(field);
    let convertedDate = moment(dateString).format("DD-MM-YYYY");
    console.log(convertedDate);
    if (name === "start_date") {
      this.setState({
        start_date: dateString
      });
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    const {
      visible,
      loading,
      code,
      project_name,
      start_date,
      customer,
      contact_person,
      contact_no,
      plant
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
      console.log("form is valid");
      if (this.state.type === "edit") {
        const data = {
          code: "",
          start_date: "",
          project_name: "",
          customer: "",
          contact_person: "",
          contact_no: "",
          plant: ""
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
                // this.props.reload();
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
        const data = {
          code: code,
          start_date: start_date,
          project_name: project_name,
          customer: customer,
          contact_person: contact_person,
          contact_no: contact_no,
          plant: plant
        };
        api("POST", "supermix", "/project", "", data, "").then(
          res => {
            console.log(res.data);
            if (res.data.status === "VALIDATION_FAILURE") {
              console.log("add");
              this.responeserror(res.data.results.name.message);
            } else {
              Notification("success", res.data.message);
              // this.props.reload();
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
    } else {
      console.log("form is not valid");
    }
  };

  componentDidMount() {
    console.log(this.props.screen);
  }
  render() {
    const {
      visible,
      loading,
      code,
      project_name,
      start_date,
      customer,
      contact_person,
      contact_no,
      plant
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
          width='800px'
          visible={visible}
          closable={false}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key='back' onClick={this.handleCancel}>
              Return
            </Button>,
            <PrimaryButton
              key='submit'
              loading={loading}
              onClick={e => this.handleSubmit(e)}
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
            <div className='input_wrapper'>
              <label for='code' className='label'>
                Code:
              </label>

              <Input
                id='code'
                name='code'
                placeholder='Enter the Code '
                value={code}
                onChange={this.handleChange}
              />
              <div style={{ height: "8px" }}></div>
            </div>

            <div className='input_wrapper'>
              <label for='project_name' className='label'>
                Project Name:
              </label>

              <Input
                id='project_name'
                name='project_name'
                placeholder='Enter Project Name'
                value={project_name}
                onChange={this.handleChange}
              />
              <div style={{ height: "8px" }}></div>
            </div>

            <div className='input_wrapper'>
              <label for='start_date' className='label'>
                Calibrated Date:
              </label>
              <DatePicker
                id='start_date'
                name='start_date'
                format={"DD-MM-YYYY"}
                showToday
                // disabledDate={this.disabledDate()}
                value={start_date}
                onChange={(dateString, field) =>
                  this.handleDates("start_date", dateString, field)
                }
                // disabledTime={() => Date.now()}
              />
              <div style={{ height: "8px" }}></div>
            </div>

            <div className='input_wrapper'>
              <label for='customer' className='label'>
                Customer
              </label>

              <Select
                id='customer'
                placeholder='Select Customer'
                name='customer '
                style={{ width: "180px" }}
                value={customer}
                onChange={value => this.handleSelect("customer", value)}
              ></Select>
              <div style={{ height: "8px" }}></div>
            </div>

            <div className='input_wrapper'>
              <label for='contact_person ' className='label'>
                Contact Person
              </label>

              <Select
                id='contact_person'
                placeholder='Select Contact Person'
                name='contact_person '
                style={{ width: "180px" }}
                value={contact_person}
                onChange={value => this.handleSelect("contact_person", value)}
              ></Select>
              <div style={{ height: "8px" }}></div>
            </div>
            <div className='input_wrapper'>
              <label for='Contact_No ' className='label'>
                Contact No
              </label>

              <Input
                id='Contact_No'
                placeholder='Select Contact No'
                name='Contact_No '
                style={{ width: "180px" }}
                value={contact_no}
                onChange={this.handleChange}
              />
              <div style={{ height: "8px" }}></div>
            </div>

            <div className='input_wrapper'>
              <label for='plant' className='label'>
                Plant
              </label>

              <Select
                id='plant'
                placeholder='Select Plant'
                name='plant '
                style={{ width: "180px" }}
                value={plant}
                onChange={value => this.handleSelect("plant", value)}
              ></Select>
              <div style={{ height: "8px" }}></div>
            </div>
          </MasterLevelForm>
        </Modal>
      </div>
    );
  }
}

export default AddProjectForm;
