import React, { Component } from "react";
import { Input, Modal, Icon, Select, Button, Form } from "antd";

import { PrimaryButton } from "../../styledcomponents/button/button";
import {
  MasterLevelFormTitle,
  MasterLevelForm
} from "../../styledcomponents/form/MasterLevelForms";
import TextArea from "antd/lib/input/TextArea";

class AddProcessSample extends Component {
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
    const { visible } = this.state;
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
          Add Processing Sample
        </PrimaryButton>
        <Modal
          width='500px'
          visible={visible}
          okType='default'
          closable={false}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key='back' onClick={this.handleCancel}>
              Return
            </Button>,
            <PrimaryButton
              key='submit'
              // loading={loading}
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
                Add Processing Sample
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

            {/* Plant Name */}
            <div className='input_wrapper'>
              <label for='name' className='label'>
                Name:
              </label>
              <Form.Item>
                {getFieldDecorator("name", {
                  rules: [{ required: true, message: "Please enter Name!" }]
                })(
                  <Input
                    className='inputProcessfield'
                    id='name'
                    name='name'
                    placeholder='Enter Name'
                  />
                )}
              </Form.Item>
            </div>

            {/* Place */}
            <div className='input_wrapper'>
              <label for='raw_material' className='label'>
                Raw Material:
              </label>
              <Form.Item>
                {getFieldDecorator("raw_material", {
                  rules: [
                    { required: true, message: "Please Select Raw Material!" }
                  ]
                })(
                  <Select
                    className='inputProcessfield'
                    id='raw_material'
                    name='raw_material'
                    placeholder=' Enter RawMaterial'
                    style={{ width: "180px" }}
                  />
                )}
              </Form.Item>
            </div>

            {/* T.P No */}
            <div className='input_wrapper'>
              <label for='plant' className='label'>
                Plant:
              </label>
              <Form.Item>
                {getFieldDecorator("plant", {
                  rules: [{ required: true, message: "Please Select Plant!" }]
                })(
                  <Select
                    className='inputProcessfield'
                    id='plant'
                    name='plant'
                    placeholder='Select Plant '
                    style={{ width: "180px" }}
                  />
                )}
              </Form.Item>
            </div>

            {/* Description  */}
            <div className='input_wrapper'>
              <label for='description' className='label'>
                Description:
              </label>
              <TextArea
                id='description'
                name='description'
                placeholder=' Enter Description'
                style={{ width: "410px" }}
              />
            </div>
          </MasterLevelForm>
        </Modal>
      </div>
    );
  }
}

const ProcessForm = Form.create({ name: "add_process" })(AddProcessSample);
export default ProcessForm;
