import React, { Component } from "react";
import { Input, Modal, Icon, Button, Select, Form } from "antd";

import {
  MasterLevelFormTitle,
  MasterLevelForm
} from "../../../styledcomponents/form/MasterLevelForms";

import { PrimaryButton } from "../../../styledcomponents/button/button";
import TextArea from "antd/lib/input/TextArea";

const Option = Select;

const error = {
  color: "red",
  fontSize: "12px",
  width: "160px",
  height: "0.2px"
};

class AddPourForm extends Component {
  state = {
    loading: false,
    visible: false,
    type: "add",
    errors: {
      pour_no: "",
      project: ""
    },
    code: "",
    pour_no: "",
    project: "",
    description: "",
    projectEdit: ""
  };

  showModal = () => {
    this.setState({
      visible: true
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
      case "pour_no":
        errors.pour_no =
          value.length === 0
            ? "Pour No can't be empty"
            : value.length < 3
            ? "Pour No \n must be 3 characters long!"
            : // : !isNaN(value)
              // ? "Pour No won't allow only letters"
              "";
        break;

      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  // handling for select or dropdown
  handleSelect = (name, value) => {
    console.log(name);
    console.log(value);

    const { errors } = this.state;
    // handle select for  plant
    if (name === "project") {
      this.setState({
        project: value
      });

      if (value.length !== 0) {
        this.setState({
          errors: {
            pour_no: errors.pour_no,
            project: ""
          }
        });
      }
    }
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { errors, pour_no, project } = this.state;
    if (pour_no.length === 0 && project.length === 0) {
      this.setState({
        errors: {
          pour_no: "Pour No can't be empty",
          project: "Project can't be empty"
        }
      });
    } else if (pour_no.length === 0 && errors.pour_no.length === 0) {
      this.setState({
        errors: {
          pour_no: errors.pour_no || "Pour No can't be empty",
          project: errors.project
        }
      });
    } else if (project.length === 0 && errors.project.length === 0) {
      this.setState({
        errors: {
          pour_no: errors.pour_no,
          project: errors.project || "Project can't be empty"
        }
      });
    } else if (errors.pour_no.length === 0 && errors.project.length === 0) {
      console.log("form is valid");
    }
  };

  render() {
    const {
      visible,
      loading,
      type,
      pour_no,
      project,
      description,
      errors
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
          Add Pour
        </PrimaryButton>
        <Modal
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
                Add Pour
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
            {type === "edit" ? (
              <div className='input_wrapper'>
                <label for='code' className='label'>
                  Code:
                </label>

                <Input
                  id='code'
                  name='code'
                  // placeholder='Enter the Code '
                  disabled
                />
              </div>
            ) : (
              ""
            )}

            <div className='input_wrapper'>
              <label for='pour_no' className='label'>
                Pour No:
              </label>

              <Input
                id='pour_no'
                name='pour_no'
                placeholder=' Enter Pour No'
                value={pour_no}
                onChange={this.handleChange}
              />
              {errors.pour_no.length > 0 && (
                <div style={error}>{errors.pour_no}</div>
              )}
              <div style={{ height: "8px" }}></div>
            </div>

            <div className='input_wrapper' style={{ width: "200px" }}>
              <label for='project' className='label'>
                Project:
              </label>
              <Select
                id='project'
                name='project'
                placeholder=' Select Project'
                value={project}
                onChange={value => this.handleSelect("project", value)}
              >
                <Option value='p01'>Project 01</Option>
                <Option value='p02'>Project 02</Option>
              </Select>
              {errors.project.length > 0 && (
                <div style={error}>{errors.project}</div>
              )}
              <div style={{ height: "8px" }}></div>
            </div>
            <div className='input_wrapper'>
              <label for='description' className='label'>
                Description:
              </label>
              <TextArea
                id='description'
                name='description'
                placeholder='Enter Description'
                value={description}
                onChange={this.handleChange}
                style={{ width: "410px" }}
              />
              <div style={{ height: "8px" }}></div>
            </div>
          </MasterLevelForm>
        </Modal>
      </div>
    );
  }
}

export default AddPourForm;
