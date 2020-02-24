import React, { Component } from "react";
import {
  Input,
  DatePicker,
  Modal,
  Button,
  Icon,
  Radio,
  Form,
  Select
} from "antd";
import TextArea from "antd/lib/input/TextArea";

import { PrimaryButton } from "../../../styledcomponents/button/button";
import {
  MasterLevelFormTitle,
  MasterLevelForm
} from "../../../styledcomponents/form/MasterLevelForms";

class AddCalibrationForm extends Component {
  state = {
    loading: false,
    visible: false,
    type: "add"
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
    const { visible, loading } = this.state;

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
          Add Calibration
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
                Add Equipment Calibration
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
            {/* <Icon type="close-circle" onClick={this.handleCancel} style={{marginLeft:'300px',marginTop:'-65px',color:'white'}}/> */}

            {/* Code */}
            {this.state.type === "edit" ? (
              <div className='input_wrapper'>
                <label for='code' className='label'>
                  Code:
                </label>
                <Input id='code' name='code' placeholder='Enter the Code ' />
              </div>
            ) : (
              ""
            )}

            {/* User Role */}
            <div className='input_wrapper'>
              <label for='equipment_name' className='label'>
                Equipment Plant:
              </label>

              <Select
                id='equipment_plant'
                name='equipment_plant'
                placeholder='Select Equipment Plant'
                style={{ width: 170 }}
              />
            </div>

            <div className='input_wrapper'>
              <label for='calibrated_date' className='label'>
                Calibrated Date:
              </label>
              <DatePicker />
            </div>
            <div className='input_wrapper'>
              <label for='due_date' className='label'>
                Due Date:
              </label>
              <DatePicker />
            </div>
            <div className='input_wrapper'>
              <label for='due_date' className='label'>
                Calibrated By:
              </label>

              <Radio.Group>
                <Radio value={1}>Internal </Radio>
                <Radio value={2}>External</Radio>
              </Radio.Group>
            </div>
            <div className='input_wrapper'>
              <label for='supplier' className='label' style={{ left: "20px" }}>
                Supplier:
              </label>

              <Select
                id='supplier'
                name='supplier'
                placeholder='Select Supplier'
                style={{ width: 170 }}
              />
            </div>

            <div className='input_wrapper'>
              <label for='tester' className='label'>
                Tester:
              </label>
              <Input id='tester' name='tester' placeholder='Enter Tester' />
            </div>

            <div className='input_wrapper'>
              <label for='user_role' className='label'>
                Description:
              </label>
              <TextArea
                id='user_role'
                name='user_role'
                placeholder='Enter Description'
                style={{ width: "400px" }}
              />
            </div>

            <div className='input_wrapper'>
              <label for='status' className='label'>
                Status:
              </label>
              <Select
                id='status'
                name='status'
                placeholder='Select Status'
                style={{ width: 170 }}
              />
            </div>
          </MasterLevelForm>
        </Modal>
      </div>
    );
  }
}

export default AddCalibrationForm;
