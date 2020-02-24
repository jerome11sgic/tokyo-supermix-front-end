import React, { Component } from "react";
import { Input, Modal, Button, Icon, Select, Form } from "antd";

import { PrimaryButton } from "../../../styledcomponents/button/button";
import {
  MasterLevelFormTitle,
  MasterLevelForm
} from "../../../styledcomponents/form/MasterLevelForms";

const Option = Select;
class MaterialMasterAddForm extends Component {
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
          Add Material
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
                Add Material
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

            {/* Plant Name */}

            {/* Place */}
            <div className='input_wrapper'>
              <label for='material_category' className='label'>
                Material Category:
              </label>

              <Select
                placeholder='Select material Category'
                id='material_category'
                name='material_category '
                style={{ width: 170 }}
              ></Select>
            </div>

            {/* T.P No */}
            <div className='input_wrapper'>
              <label for='sub_category' className='label'>
                Sub Category:
              </label>

              <Select
                placeholder='Select Sub Category'
                id='sub_category'
                name='sub_category '
                style={{ width: 170 }}
              ></Select>
            </div>

            <div className='input_wrapper'>
              <label for='material_name' className='label'>
                Material Name:
              </label>

              <Input
                id='material_name'
                name='material_name'
                placeholder='Enter Material Name'
              />
            </div>
          </MasterLevelForm>
        </Modal>
      </div>
    );
  }
}

export default MaterialMasterAddForm;
