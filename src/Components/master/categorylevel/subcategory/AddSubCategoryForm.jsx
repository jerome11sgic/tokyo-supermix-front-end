import React, { Component } from "react";
import { Input, Modal, Icon, Button, Select, Form } from "antd";

import "./style.css";
import { PrimaryButton } from "../../../styledcomponents/button/button";
import {
  MasterLevelFormTitle,
  MasterLevelForm
} from "../../../styledcomponents/form/MasterLevelForms";

const Option = Select;

class AddSubCategoryForm extends Component {
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

  handleCancel = () => {
    this.setState({ visible: false });
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
            marginLeft: "-45px"
          }}
        >
          Add Material Sub Category
        </PrimaryButton>
        <Modal
          width='330px'
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
                Add Material Sub Category
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
              <label for='sub_category' className='label'>
                SubCategory:
              </label>
              <Form.Item>
                {getFieldDecorator("sub_category", {
                  rules: [
                    { required: true, message: "Please enter Sub Category!" }
                  ]
                })(
                  <Input
                    id='sub_category'
                    name='sub_category'
                    placeholder='Enter SubCategory'
                  />
                )}
              </Form.Item>
            </div>

            <div className='input_wrapper'>
              <label for='material_category' className='label'>
                Material Category:
              </label>
              <Form.Item>
                {getFieldDecorator("material_category", {
                  rules: [
                    {
                      required: true,
                      message: "Please Select Material Category!"
                    }
                  ]
                })(
                  <Select
                    placeholder='Select Material Category'
                    id='material_category'
                    name='material_category '
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

export default AddSubCategoryForm;
