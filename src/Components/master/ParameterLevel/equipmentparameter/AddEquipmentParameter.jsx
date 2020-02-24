import React, { Component } from "react";
import { Input, Modal, Icon, Button, Form } from "antd";

import { PrimaryButton } from "../../../styledcomponents/button/button";
import {
  MasterLevelFormTitle,
  MasterLevelForm
} from "../../../styledcomponents/form/MasterLevelForms";

class AddEquipmentParameter extends Component {
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
          Add Equipment Parameter
        </PrimaryButton>
        <Modal
          width='500px'
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
                Add Equipment Parameter
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
              <label for='equipment' className='label'>
                Equipment:
              </label>
              <Form.Item>
                {getFieldDecorator("equipment", {
                  rules: [
                    { required: true, message: "Please enter Equipment!" }
                  ]
                })(
                  <Input
                    id='equipment'
                    name='equipment'
                    placeholder='Enter the Equipment'
                  />
                )}
              </Form.Item>
            </div>

            {/* User Role */}
            <div className='input_wrapper'>
              <label for='user_role' className='label'>
                Parameter:
              </label>
              <Form.Item>
                {getFieldDecorator("Parameter", {
                  rules: [
                    { required: true, message: "Please enter Parameter!" }
                  ]
                })(
                  <Input
                    id='Parameter'
                    name='Parameter'
                    placeholder='Enter the Parameter'
                  />
                )}
              </Form.Item>
            </div>

            <div className='input_wrapper'>
              <label for='unit' className='label'>
                Unit:
              </label>
              <Form.Item>
                {getFieldDecorator("unit", {
                  rules: [{ required: true, message: "Please enter Unit!" }]
                })(
                  <Input id='unit' name='unit' placeholder='Enter the Unit' />
                )}
              </Form.Item>
            </div>
          </MasterLevelForm>
        </Modal>
      </div>
    );
  }
}

const EquipmentParameter = Form.create({ name: "add_equipmentparameter" })(
  AddEquipmentParameter
);
export default EquipmentParameter;
