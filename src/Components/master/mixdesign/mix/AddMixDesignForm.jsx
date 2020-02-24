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
class AddMixDesignForm extends Component {
  state = {
    loading: false,
    visible: false,
    disabled: true
  };
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  toggle = () => {
    this.setState({
      disabled: !this.state.disabled
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

    // const columns = [
    //   { title: "RawMaterial", dataIndex: "rawmaterial", key: "rawmaterial" },
    //   {
    //     title: "Reliable",
    //     dataIndex: "reliable",
    //     key: "reliable",
    //     render: () => <Checkbox onClick={this.toggle} />
    //   },
    //   {
    //     title: "Quantity",
    //     dataIndex: "quantity",
    //     key: "quantity",
    //     render: () => (
    //       <Input style={{ width: "50px" }} disabled={this.state.disabled} />
    //     )
    //   },
    //   {
    //     title: "Unit",
    //     dataIndex: "unit",
    //     key: "unit",
    //     render: () => (
    //       <Input style={{ width: "50px" }} disabled={this.state.disabled} />
    //     )
    //   }
    // ];
    // const data = [];
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
            {/* <div
              style={{
                display: "flex",
                flexBasis: "500px",
                flexWrap: "wrap",
                justifyContent: "flex-start"
              }}
            > */}

            {/* Code */}
            <div className='input_wrapper'>
              <label for='code' className='label'>
                Code:
              </label>
              <Input id='code' name='code' placeholder='Enter the Code ' />
            </div>

            {/* Plant */}
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

            {/* Grade */}
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

            {/* Grade */}
            <div className='input_wrapper'>
              <label for='material' className='label'>
                Material
              </label>

              <Select
                id='material'
                name='material'
                placeholder='Select Material'
                style={{ width: 170 }}
              ></Select>
            </div>

            {/* Data */}
            <div className='input_wrapper'>
              <label for='date' className='label'>
                Date
              </label>
              <DatePicker id='date' name='date' placeholder='Select Date' />
            </div>

            {/* <div
              style={{
                display: "flex",
                flexBasis: "500px",
                flexWrap: "wrap",
                justifyContent: "flex-start"
              }}
            >
              <Table
                style={{ width: "500px" }}
                columns={columns}
                dataSource={data}
                size='small'
              />
              */}
            {/* </div>  */}
          </MasterLevelForm>
        </Modal>
      </div>
    );
  }
}

export default AddMixDesignForm;
