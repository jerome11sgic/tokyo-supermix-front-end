import React, { Component } from "react";
import { Input, Modal, Icon, Select, Button, DatePicker, Form } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { PrimaryButton } from "../../styledcomponents/button/button";
import {
  MasterLevelFormTitle,
  MasterLevelForm
} from "../../styledcomponents/form/MasterLevelForms";

const Option = Select;
class AddFinishProduct extends Component {
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

  render() {
    const { visible } = this.state;

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
          Add Material Load
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
                Add Material Load
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
              <Input id='code' name='code' placeholder='Enter the Code ' />
            </div>

            <div className='input_wrapper'>
              <label for='incoming_sample' className='label'>
                Incoming Sample:
              </label>

              <Select
                placeholder='Select Incoming Sample '
                id='incoming_sample'
                name='incoming_sample '
                style={{ width: 170 }}
              ></Select>
            </div>

            <div className='input_wrapper'>
              <label for='project_name' className='label'>
                Quantity:
              </label>

              <Input
                placeholder='Enter Quantity'
                id='quantity'
                name='quantity '
                style={{ width: 170 }}
              />
            </div>

            <div className='input_wrapper'>
              <label for='measurement' className='label'>
                Measurement:
              </label>

              <Input
                placeholder='Enter Measurement'
                id='measurement'
                name='measurement '
                style={{ width: 170 }}
              />
            </div>

            <div className='input_wrapper'>
              <label for='date' className='label'>
                Date:
              </label>

              <DatePicker id='date' name='date' placeholder='Select Date' />
            </div>

            <div className='input_wrapper'>
              <label for='expiry_date' className='label'>
                Expiry Date:
              </label>

              <DatePicker
                id='expiry_date'
                name='expiry_date'
                placeholder='Select Expiry Date'
              />
            </div>
          </MasterLevelForm>
        </Modal>
      </div>
    );
  }
}

export default AddFinishProduct;
