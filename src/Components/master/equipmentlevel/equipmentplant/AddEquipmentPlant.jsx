import React, { Component } from "react";
import { Input, Modal, Icon, Button, Select } from "antd";

import { PrimaryButton } from "../../../styledcomponents/button/button";
import {
  MasterLevelFormTitle,
  MasterLevelForm
} from "../../../styledcomponents/form/MasterLevelForms";
import TextArea from "antd/lib/input/TextArea";

class AddEquipmentPlant extends Component {
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
          Add Equipment Plant
        </PrimaryButton>
        <Modal
          width='480px'
          visible={visible}
          closable={false}
          onCancel={this.handleCancel}
          footer={[
            <Button key='back' onClick={this.handleCancel}>
              Cancel
            </Button>,
            <PrimaryButton
              key='submit'
              loading={loading}
              onClick={e => this.handleSubmit(e)}
              style={{ background: "#001328", color: "white", border: "none" }}
            >
              Save
            </PrimaryButton>
          ]}
          title={
            <MasterLevelFormTitle>
              <p
                style={{
                  color: "white"
                }}
              >
                Add Equipment Plant
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

            <div className='input_wrapper'>
              <label for='serial_no' className='label'>
                Serial No:
              </label>
              <Input
                id='serial_no'
                name='serial_no'
                placeholder='Enter Serial No '
              />
            </div>

            {/* User Role */}
            <div className='input_wrapper'>
              <label for='equipment' className='label'>
                Equipment :
              </label>

              <Select
                id='equipment'
                name='equipment'
                placeholder='Select Equipment'
                style={{ width: 170 }}
              />
            </div>

            <div className='input_wrapper'>
              <label for='plant' className='label'>
                Plant :
              </label>

              <Select
                id='plant'
                name='plant'
                placeholder='Select Plant'
                style={{ width: 170 }}
              />
            </div>

            <div className='input_wrapper'>
              <label for='brand_name' className='label'>
                Brand Name:
              </label>

              <Input
                id='brand_name'
                name='brand_name'
                placeholder='Enter Brand Name'
              />
            </div>
            <div className='input_wrapper'>
              <label for='model_name' className='label'>
                Model Name:
              </label>

              <Input
                id='model_name'
                name='model_name'
                placeholder='Enter Model Name'
              />
            </div>
          </MasterLevelForm>
        </Modal>
      </div>
    );
  }
}

export default AddEquipmentPlant;
