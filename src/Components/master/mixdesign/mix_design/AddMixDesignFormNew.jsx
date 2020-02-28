import React, { Component } from "react";
import {
  Input,
  DatePicker,
  Modal,
  Button,
  Icon,
  Table,
  Checkbox,
  Select,
  Form
} from "antd";

import { PrimaryButton } from "../../../styledcomponents/button/button";
import {
  MasterLevelFormTitle,
  MasterLevelForm
} from "../../../styledcomponents/form/MasterLevelForms";

const Option = Select;
class AddMixDesignFormNew extends Component {
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
          Add Mix Design
        </PrimaryButton>
        <Modal
          width='1100px'
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
                Add MixDesign
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
            {/* Form Area */}

            {/* Code */}
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
            {/* Plant Name */}

            {/* Place */}
            <div className='input_wrapper'>
              <label for='plant' className='label'>
                Plant
              </label>

              <Select
                placeholder=' Plant'
                id='plant'
                name='plant '
                style={{ width: "180px" }}
              ></Select>
            </div>
            <div className='input_wrapper'>
              <label for='grade' className='label'>
                Grade
              </label>

              <Select
                id='grade'
                name='grade '
                placeholder='Enter Grade'
                style={{ width: "180px" }}
              ></Select>
            </div>
            {/* Place */}
            <div className='input_wrapper'>
              <label for='date' className='label'>
                Date
              </label>

              <DatePicker id='date' name='date' placeholder='Select Date' />
            </div>
          </MasterLevelForm>
        </Modal>
      </div>
    );
  }
}

export default AddMixDesignFormNew;
