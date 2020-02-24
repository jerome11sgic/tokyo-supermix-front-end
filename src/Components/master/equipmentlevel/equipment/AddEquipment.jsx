import React, { Component } from "react";
import { Input, Modal, Icon, Button, Form } from "antd";

import "./styleequipmentmaster.css";
import { PrimaryButton } from "../../../styledcomponents/button/button";
import {
  MasterLevelFormTitle,
  MasterLevelForm
} from "../../../styledcomponents/form/MasterLevelForms";
import TextArea from "antd/lib/input/TextArea";

class AddEquipment extends Component {
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
          Add Equipment
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
                Add Equipments
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
                <Input
                  id='code'
                  name='code'
                  // placeholder='Enter the Code '
                  disabled
                />
              </div>
            ) : (
              ""
            )}

            {/* User Role */}
            <div className='input_wrapper'>
              <label for='equipment_name' className='label'>
                Equipment Name:
              </label>

              <Input
                id='equipment_name'
                name='equipment_name'
                placeholder='Enter Equipment Name'
              />
            </div>

            <div className='input_wrapper'>
              <label for='user_role' className='label'>
                Description:
              </label>
              <TextArea
                id='user_role'
                name='user_role'
                placeholder='Enter Description '
                style={{ width: "180px" }}
              />
            </div>
          </MasterLevelForm>
        </Modal>
      </div>
    );
  }
}

export default AddEquipment;
