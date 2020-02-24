import React, { Component } from "react";
import { Input, Modal, Icon, Select, Button, Form } from "antd";

import "./style.css";
import { PrimaryButton } from "../../../styledcomponents/button/button";
import {
  MasterLevelFormTitle,
  MasterLevelForm
} from "../../../styledcomponents/form/MasterLevelForms";

const Option = Select;

class AddMainCategoryForm extends Component {
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
          Add Material Sub Category
        </PrimaryButton>
        <Modal
          width='350px'
          visible={visible}
          closable={false}
          onOk={this.handleOk}
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
            {this.state.type === "edit" ? (
              <div className='input_wrapper'>
                <label for='code' className='label'>
                  Code:
                </label>

                <Input id='code' name='code' disabled />
              </div>
            ) : (
              ""
            )}

            {/* Sub Category Name */}
            <div className='input_wrapper'>
              <label for='subcategory_name' className='label'>
                Name:
              </label>

              <Input
                id='subcategory_name'
                name='subcategory_name'
                placeholder='Enter Sub Category'
              />
            </div>
            {/* User Role */}
            <div className='input_wrapper'>
              <label for='material_category' className='label'>
                Material Category:
              </label>

              <Select
                placeholder='Select Material Category'
                id='material_category'
                name='material_category'
                style={{ width: "180px" }}
              ></Select>
            </div>
          </MasterLevelForm>
        </Modal>
      </div>
    );
  }
}

export default AddMainCategoryForm;
