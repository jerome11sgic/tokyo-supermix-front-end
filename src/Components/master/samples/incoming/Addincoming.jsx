import React, { Component } from "react";
import {
  Input,
  Modal,
  Icon,
  Button,
  Form,
  TextArea,
  DatePicker,
  Select
} from "antd";

import { PrimaryButton } from "../../../styledcomponents/button/button";
import {
  MasterLevelFormTitle,
  MasterLevelForm
} from "../../../styledcomponents/form/MasterLevelForms";

class Addincoming extends Component {
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
          Add Incoming Samplenhhh
        </PrimaryButton>
        <Modal
          width="260px"
          className="addsubcategorymodal"
          visible={visible}
          closable={false}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <PrimaryButton
              key="submit"
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
                Add Incoming Sample
              </p>
              <Icon
                type="close-circle"
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
            <div className="input_wrapper">
              <label for="code" className="label">
                Code:
              </label>

              <Input
                id="code"
                name="code"
                // placeholder='Enter the Code '
                disabled
              />
            </div>

            {/* Plant Name */}
            <div className="input_wrapper">
              <label for="supplier_name" className="label">
                Supplier Name:kkkk
              </label>

              <Select
                className="inputfield"
                id="supplier_name"
                name="supplier_name"
                placeholder="Enter Supplier Name"
                style={{ width: "180px" }}
              ></Select>
            </div>

            {/* Place */}
            <div className="input_wrapper">
              <label for="raw_material" className="label">
                Raw Material
              </label>

              <Select
                id="raw_material"
                name="raw_material"
                placeholder=" Raw Material"
                style={{ width: "180px" }}
              ></Select>
            </div>

            {/* T.P No */}
            <div className="input_wrapper">
              <label for=" delivered_date" className="label">
                Delivered Date
              </label>

              <DatePicker
              //   onChange={onChange}
              />
            </div>

            {/* Description  */}
            <div className="input_wrapper">
              <label for="vechical_no" className="label">
                Vechical No
              </label>

              <Input
                id="vechical_no"
                name="vechical_no"
                placeholder="Vechical No"
              />
            </div>

            <div className="input_wrapper">
              <label for="description" className="label">
                Plant
              </label>
              <Select
                id="plant"
                name="plant"
                placeholder="plant"
                style={{ width: "410px" }}
              ></Select>
            </div>

            <div className="input_wrapper">
              <label for="description" className="label">
                Status
              </label>
              <Select
                id="status"
                name="status"
                placeholder="status"
                style={{ width: "410px" }}
              ></Select>
            </div>
          </MasterLevelForm>
        </Modal>
      </div>
    );
  }
}

export default Addincoming;
