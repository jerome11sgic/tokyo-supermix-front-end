import React, { Component } from "react";
import { Input, Modal, Icon, Button, Select, Form } from "antd";
import { PrimaryButton } from "../../styledcomponents/button/button";
import {
  MasterLevelFormTitle,
  MasterLevelForm
} from "../../styledcomponents/form/MasterLevelForms";

// function onChange(date, dateString) {
//   console.log(date, dateString);
// }
const Option = Select;
const InputGroup = Input.Group;
class AdditionalParameterAddForm extends Component {
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
          Add Additional Parameter
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
                Add Additional Parameter
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

            <div className='input_wrapper'>
              <label for='lastname' className='label'>
                Parameter
              </label>
              <Form.Item>
                {getFieldDecorator("parameter", {
                  rules: [
                    {
                      required: true,
                      message: "Please enter Parameter !"
                    }
                  ]
                })(
                  <Select
                    showSearch
                    style={{ width: "180px" }}
                    placeholder='Enter Parameter'
                    optionFilterProp='children'
                    onChange={this.onChangeTrail}
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  ></Select>
                )}
              </Form.Item>
            </div>

            {/* Plant Name */}
            <div className='input_wrapper'>
              <label for='plant' className='label'>
                Unit
              </label>
              <Form.Item>
                {getFieldDecorator("unit", {
                  rules: [{ required: true, message: "Please select Unit!" }]
                })(
                  <Select
                    showSearch
                    style={{ width: "180px" }}
                    placeholder='Select a Unit'
                    optionFilterProp='children'
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  ></Select>
                )}
              </Form.Item>
            </div>

            {/* First Name */}
            <div className='input_wrapper'>
              <label for='firstname' className='label'>
                Short Format
              </label>
              <Form.Item>
                {getFieldDecorator("short_format", {
                  rules: [
                    { required: true, message: "Please select short format!" }
                  ]
                })(
                  <Select
                    showSearch
                    style={{ width: "180px" }}
                    placeholder='Select a  ShortFormat '
                    optionFilterProp='children'
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  ></Select>
                )}
              </Form.Item>
            </div>

            {/* Last Name */}

            {this.state.trial === "Test" ? (
              <div className='input_wrapper'>
                {/* <label for="lastname" className="label">
              Value
              </label>
              */}
                <InputGroup compact>
                  <Form.Item>
                    {getFieldDecorator("parameter_name", {
                      rules: [
                        { required: true, message: "Please enter Parameter!" }
                      ]
                    })(
                      <Input
                        style={{ width: 80, textAlign: "center" }}
                        placeholder='Minimum'
                      />
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator("parameter_name", {
                      rules: [
                        { required: true, message: "Please enter Parameter!" }
                      ]
                    })(
                      <Input
                        style={{
                          width: 30,
                          borderLeft: 0,
                          pointerEvents: "none",
                          backgroundColor: "#fff"
                        }}
                        placeholder='~'
                        disabled
                      />
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator("parameter_name", {
                      rules: [
                        { required: true, message: "Please enter Parameter!" }
                      ]
                    })(
                      <Input
                        style={{
                          width: 80,
                          textAlign: "center",
                          borderLeft: 0
                        }}
                        placeholder='Maximum'
                      />
                    )}
                  </Form.Item>
                </InputGroup>
              </div>
            ) : (
              ""
            )}
          </MasterLevelForm>
        </Modal>
      </div>
    );
  }
}

const ParameerForm = Form.create({ name: "add_parameter" })(
  AdditionalParameterAddForm
);
export default ParameerForm;
