import React, { Component } from "react";
import { Input, Modal, Icon, Button, Form } from "antd";

import "./style.css";
import { PrimaryButton } from "../../../styledcomponents/button/button";
import {
  MasterLevelFormTitle,
  MasterLevelForm
} from "../../../styledcomponents/form/MasterLevelForms";
import TextArea from "antd/lib/input/TextArea";

class AddSampleCategory extends Component {
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
          Add Sample Category
        </PrimaryButton>
        <Modal
          width='350px'
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
                Add Sample Category
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
                <Input id='code' name='code' disabled />
              </Form.Item>
            </div>

            {/* User Role */}
            <div className='input_wrapper'>
              <label for='Sample_category' className='label'>
                Sample Category:
              </label>
              <Form.Item>
                {getFieldDecorator("Sample_category", {
                  rules: [
                    {
                      required: true,
                      message: "Please enter Sample Category!"
                    }
                  ]
                })(
                  <Input
                    id='Sample_category'
                    name='Sample_category'
                    placeholder='Enter Sample Category'
                  />
                )}
              </Form.Item>
            </div>

            <div className='input_wrapper'>
              <label for='user_role' className='label'>
                Description:
              </label>
              <TextArea
                id='user_role'
                name='user_role'
                placeholder='Enter Description'
                style={{ width: "180px" }}
              />
            </div>
          </MasterLevelForm>
        </Modal>
      </div>
    );
  }
}

const SampleCategroyForm = Form.create({ name: "add_samplecategory" })(
  AddSampleCategory
);
export default SampleCategroyForm;
