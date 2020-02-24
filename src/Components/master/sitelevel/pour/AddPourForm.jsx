import React, { Component } from "react";
import { Input, Modal, Icon, Button, Select, Form } from "antd";

import {
  MasterLevelFormTitle,
  MasterLevelForm
} from "../../../styledcomponents/form/MasterLevelForms";

import { PrimaryButton } from "../../../styledcomponents/button/button";
import TextArea from "antd/lib/input/TextArea";

const Option = Select;
class AddPourForm extends Component {
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
                Add Pour{" "}
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
              <label for='pour' className='label'>
                Pour No:
              </label>
              <Form.Item>
                {getFieldDecorator("pour", {
                  rules: [{ required: true, message: "Please enter Pour No!" }]
                })(
                  <Input id='pour' name='pour' placeholder=' Enter Pour No' />
                )}
              </Form.Item>
            </div>

            <div className='input_wrapper' style={{ width: "200px" }}>
              <label for='project' className='label'>
                Project:
              </label>

              <Form.Item>
                {getFieldDecorator("project", {
                  rules: [{ required: true, message: "Please Select Project!" }]
                })(
                  <Select
                    id='project'
                    name='project'
                    placeholder=' Select Project'
                  ></Select>
                )}
              </Form.Item>
            </div>
            <div className='input_wrapper'>
              <label for='code' className='label'>
                Description:
              </label>
              <TextArea id='code' name='code' placeholder='Enter Description' />
            </div>
          </MasterLevelForm>
        </Modal>
      </div>
    );
  }
}

const PourForm = Form.create({ name: "add_pour" })(AddPourForm);
export default PourForm;
