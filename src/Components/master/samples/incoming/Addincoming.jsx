import React, { Component } from "react";
import { Input, Modal, Icon, Button, Form, TextArea, DatePicker } from "antd";

import { PrimaryButton } from "../../../styledcomponents/button/button";
import {
  MasterLevelFormTitle,
  MasterLevelForm
} from "../../../styledcomponents/form/MasterLevelForms";

class Addincoming extends Component {
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
          Add Incoming Sample
        </PrimaryButton>
        <Modal
          width='260px'
          className='addsubcategorymodal'
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
                Add Incoming Sample
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
              <label for='supplier_name' className='label'>
                Supplier Name:
              </label>
              <Form.Item>
                {getFieldDecorator("supplier_name", {
                  rules: [
                    { required: true, message: "Please enter Supplier Name!" }
                  ]
                })(
                  <Select
                    className='inputfield'
                    id='supplier_name'
                    name='supplier_name'
                    placeholder='Enter Supplier Name'
                    style={{ width: "180px" }}
                  />
                )}
              </Form.Item>
            </div>

            {/* Place */}
            <div className='input_wrapper'>
              <label for='raw_material' className='label'>
                Raw Material
              </label>
              <Form.Item>
                {getFieldDecorator("raw_material", {
                  rules: [
                    { required: true, message: "Please enter Raw Material!" }
                  ]
                })(
                  <Select
                    id='raw_material'
                    name='raw_material'
                    placeholder=' Raw Material'
                    style={{ width: "180px" }}
                  />
                )}
              </Form.Item>
            </div>

            {/* T.P No */}
            <div className='input_wrapper'>
              <label for=' delivered_date' className='label'>
                Delivered Date
              </label>
              <Form.Item>
                {getFieldDecorator("delivered_date", {
                  rules: [{ required: true, message: "Please Select Date!" }]
                })(
                  <DatePicker
                  //   onChange={onChange}
                  />
                )}
              </Form.Item>
            </div>

            {/* Description  */}
            <div className='input_wrapper'>
              <label for='vechical_no' className='label'>
                Vechical No
              </label>
              <Form.Item>
                {getFieldDecorator("vechical_no", {
                  rules: [
                    { required: true, message: "Please enter Vechical No!" }
                  ]
                })(
                  <Input
                    id='vechical_no'
                    name='vechical_no'
                    placeholder='Vechical No'
                  />
                )}
              </Form.Item>
            </div>

            <div className='input_wrapper'>
              <label for='description' className='label'>
                Description
              </label>
              <TextArea
                id='description'
                name='description'
                placeholder='Description'
                style={{ width: "410px" }}
              />
            </div>
          </MasterLevelForm>
        </Modal>
      </div>
    );
  }
}

const IncomingForm = Form.create({ name: "add_incoming" })(Addincoming);
export default IncomingForm;
