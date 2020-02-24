import React, { Component } from "react";
import { Input, Modal, Icon, Button, Select, Row, Col } from "antd";
import {
  MasterLevelFormTitle,
  MasterLevelForm
} from "../../../styledcomponents/form/MasterLevelForms";

import { PrimaryButton } from "../../../styledcomponents/button/button";

const { Option } = Select;
export default class AddMaterialParameter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: [{ id: "", parameter: "", unit: "", entry: "" }],
      val: "",
      loading: false,
      visible: false
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(i, e) {
    console.log("kkkkkkk");
    const { name, value } = e.target;
    let test = [...this.state.test];
    test[i] = { ...test[i], [name]: value };
    this.setState({ test });
  }

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

  createUI() {
    return this.state.test.map((el, i) => (
      <div key={i}>
        <Row>
          <Select
            style={{ width: "140px", marginLeft: "10px" }}
            placeholder='MainCategory '
          ></Select>
          <Select
            style={{ width: "130px", marginLeft: "10px" }}
            placeholder='SubCategory '
          ></Select>

          <Select
            style={{ width: "120px", marginLeft: "10px" }}
            placeholder='Material '
          ></Select>

          <Select
            style={{ width: "120px", marginLeft: "10px" }}
            placeholder='Parameter '
          ></Select>

          <Select
            style={{ width: "100px", marginLeft: "40px" }}
            placeholder='Unit'
          ></Select>

          <Input
            placeholder='Min Value'
            name='parameter'
            value={el.parameter || ""}
            onChange={this.handleChange.bind(this, i)}
            style={{ width: "100px", marginLeft: "20PX" }}
          />

          <Input
            placeholder='Max Value'
            name='parameter'
            value={el.parameter || ""}
            onChange={this.handleChange.bind(this, i)}
            style={{ width: "100px", marginLeft: "20PX" }}
          />

          <Button
            type=''
            value='remove'
            onClick={this.removeClick.bind(this, i)}
            style={{ width: "75px", marginLeft: "40px" }}
          >
            Remove
          </Button>
        </Row>
        <br />
      </div>
    ));
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
          Add Material Parameter
        </PrimaryButton>
        <Modal
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
              onClick={this.handleOk}
              style={{ background: "#001328", color: "white", border: "none" }}
            >
              Save
            </PrimaryButton>
          ]}
          width='500px'
          title={
            <MasterLevelFormTitle>
              <p
                style={{
                  color: "white"
                }}
              >
                Add Material Parameter
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
            {/* Main Category */}
            <div className='input_wrapper'>
              <label for='main_category' className='label'>
                Main Category
              </label>
              <Select
                style={{ width: 170 }}
                placeholder='Select Main Category'
                id='main_category'
                name='main_category'
              />
            </div>

            {/* Sub Category */}
            <div className='input_wrapper'>
              <label for='sub_category' className='label'>
                Sub Category
              </label>
              <Select
                style={{ width: 170 }}
                placeholder='Select Sub Category'
                id='sub_category'
                name='sub_category'
              />
            </div>

            {/* Material */}
            <div className='input_wrapper'>
              <label for='material' className='label'>
                Sub Category
              </label>
              <Select
                style={{ width: 170 }}
                placeholder='Select Material'
                id='material'
                name='material'
              />
            </div>

            {/* Parameter */}
            <div className='input_wrapper'>
              <label for='parameter' className='label'>
                Parameter
              </label>
              <Select
                style={{ width: 170 }}
                placeholder='Select Parameter'
                id='parameter'
                name='parameter'
              />
            </div>

            {/* Unit */}
            <div className='input_wrapper'>
              <label for='unit' className='label'>
                Unit
              </label>
              <Select
                style={{ width: 170 }}
                placeholder='Select Unit'
                id='unit'
                name='unit'
              />
            </div>

            {/* Min Value */}
            <div className='input_wrapper'>
              <label for='min_value' className='label'>
                Min Value
              </label>
              <Select
                style={{ width: 170 }}
                placeholder='Enter Min Value'
                id='min_value'
                name='min_value'
              />
            </div>

            {/* Max Value */}
            <div className='input_wrapper'>
              <label for='max_value' className='label'>
                Max Value
              </label>
              <Input
                style={{ width: 170 }}
                placeholder='Enter Max Value'
                id='max_value'
                name='max_value'
              />
            </div>
          </MasterLevelForm>
        </Modal>
      </div>
    );
  }
}
