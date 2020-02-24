import React, { Component } from "react";
import { Input, Modal, Icon, Select, Button, Form } from "antd";
import { PrimaryButton } from "../../../styledcomponents/button/button";
import {
  MasterLevelFormTitle,
  MasterLevelForm
} from "../../../styledcomponents/form/MasterLevelForms";

const Option = Select;

class AddProjectForm extends Component {
  state = {
    loading: false,
    visible: false
  };
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleSubmit = e => {
    console.log(e);
    console.log(this.props.form);
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.setState({ loading: true });
        setTimeout(() => {
          this.setState({ loading: false, visible: false });
        }, 3000);
      }
    });
  };

  componentDidMount() {
    console.log(this.props.screen);
  }
  render() {
    const { visible, loading } = this.state;
    const { getFieldDecorator } = this.props.form;
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
              <Form.Item>
                {getFieldDecorator("code", {
                  // rules: [{ required: true, message: "Please enter a code!" }]
                })(
                  <Input
                    id='code'
                    name='code'
                    // placeholder='Enter the Code '
                    disabled
                  />
                )}
              </Form.Item>
            </div>

            <div className='input_wrapper'>
              <label for='project_name' className='label'>
                Project Name:
              </label>
              <Form.Item>
                {getFieldDecorator("project_name", {
                  rules: [
                    { required: true, message: "Please enter Project Name!" }
                  ]
                })(
                  <Input
                    id='project_name'
                    name='project_name'
                    placeholder='Enter Project Name'
                  />
                )}
              </Form.Item>
            </div>

            <div className='input_wrapper'>
              <label for='customer' className='label'>
                Customer
              </label>
              <Form.Item>
                {getFieldDecorator("customer", {
                  rules: [
                    { required: true, message: "Please Select Customer!" }
                  ]
                })(
                  <Select
                    id='customer'
                    placeholder='Select Customer'
                    name='customer '
                    style={{ width: "180px" }}
                  ></Select>
                )}
              </Form.Item>
            </div>

            <div className='input_wrapper'>
              <label for='contact_person ' className='label'>
                Contact Person
              </label>
              <Form.Item>
                {getFieldDecorator("customer", {
                  rules: [
                    {
                      required: true,
                      message: "Please Select Contact Person!"
                    }
                  ]
                })(
                  <Select
                    id='contact_person'
                    placeholder='Select Contact Person'
                    name='contact_person '
                    style={{ width: "180px" }}
                  ></Select>
                )}
              </Form.Item>
            </div>
            <div className='input_wrapper'>
              <label for='Contact_No ' className='label'>
                Contact No
              </label>
              <Form.Item>
                {getFieldDecorator("Contact_No", {
                  rules: [
                    {
                      required: true,
                      message: "Please enter Contact No!"
                    }
                  ]
                })(
                  <Input
                    id='Contact_No'
                    placeholder='Select Contact No'
                    name='Contact_No '
                    style={{ width: "180px" }}
                  />
                )}
              </Form.Item>
            </div>

            {/* <div className='input_wrapper'>
              <label for='mix_design' className='label'>
                Mix design
              </label>
              <Form.Item>
                {getFieldDecorator("mixdesign", {
                  rules: [
                    {
                      required: true,
                      message: "Please Select MixDesign!"
                    }
                  ]
                })(
                  <Select
                    id='mix_design'
                    placeholder='Select MixDesign'
                    name='mix_design '
                    style={{ width: "180px" }}
                  >
                    <Option value='Main Category 1'>Mix Design</Option>
                  </Select>
                )}
              </Form.Item>
            </div>

            <div className='input_wrapper'>
              <label for='grade' className='label'>
                Grade
              </label>
              <Form.Item>
                {getFieldDecorator("grade", {
                  rules: [
                    {
                      required: true,
                      message: "Please Select Grade!"
                    }
                  ]
                })(
                  <Select
                    id='grade'
                    placeholder='Select Grade'
                    name='grade '
                    style={{ width: "180px" }}
                  ></Select>
                )}
              </Form.Item>
            </div> */}

            <div className='input_wrapper'>
              <label for='plant' className='label'>
                Plant
              </label>
              <Form.Item>
                {getFieldDecorator("plant", {
                  rules: [
                    {
                      required: true,
                      message: "Please Select Plant!"
                    }
                  ]
                })(
                  <Select
                    id='plant'
                    placeholder='Select Plant'
                    name='plant '
                    style={{ width: "180px" }}
                  ></Select>
                )}
              </Form.Item>
            </div>
          </MasterLevelForm>
        </Modal>
      </div>
    );
  }
}

const ProjectForm = Form.create({ name: "add_project" })(AddProjectForm);
export default ProjectForm;
