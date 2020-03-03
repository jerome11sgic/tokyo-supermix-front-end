import React, { Component } from "react";
import { Input, Modal, Icon, Button, Form, DatePicker, Select } from "antd";

import { PrimaryButton } from "../../styledcomponents/button/button";
import {
  MasterLevelFormTitle,
  MasterLevelForm
} from "../../styledcomponents/form/MasterLevelForms";

import { DISABLE_EDIT_MODE } from "../../../redux/action/master/plantlevel/PlantLevel";
import { connect } from "react-redux";

const { Option } = Select;
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
    // const { getFieldDecorator } = this.props.form;
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
          Add Incoming Sample
        </PrimaryButton>
        <Modal
          width='500px'
          className='addsubcategorymodal'
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
                Add Incoming Sample
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

              <Input
                id='code'
                name='code'
                placeholder='Enter the Code '
                disabled
              />
            </div>

            {/* Plant Name */}
            <div className='input_wrapper'>
              <label for='supplier_name' className='label'>
                Date:
              </label>
              <DatePicker placeholder='Enter the Date' />
            </div>

            {/* Place */}
            <div className='input_wrapper'>
              <label for='raw_material' className='label'>
                Vechicle No
              </label>
              <Input placeholder='Enter the Vechicle NO' />
            </div>

            {/* T.P No */}
            <div className='input_wrapper'>
              <label for=' delivered_date' className='label'>
                Material
              </label>

              <Select
                id='raw_material'
                name='raw_material'
                style={{ width: "180px" }}
                placeholder='Select the Material'
              />
            </div>

            {/* Description  */}
            <div className='input_wrapper'>
              <label for='vechical_no' className='label'>
                Plant
              </label>

              <Select
                id='raw_material'
                name='raw_material'
                placeholder='Select the Plant'
                style={{ width: "180px" }}
              />
            </div>

            <div className='input_wrapper'>
              <label for='description' className='label'>
                Supplier
              </label>
              <Select
                id='raw_material'
                name='raw_material'
                placeholder='Select the Suppplier'
                style={{ width: "180px" }}
              />
            </div>
            <div className='input_wrapper'>
              <label for='description' className='label'>
                Status
              </label>
              <Input
                id='description'
                name='description'
                placeholder='Enter the Status'
                style={{ width: "200px" }}
              />
            </div>
          </MasterLevelForm>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  //getting the global redux state to get the data from the EditPlantReducer.js
  return {
    visible: state.plantLevelReducers.EditPlantReducer.visible,
    type: state.plantLevelReducers.EditPlantReducer.type,
    editPlantData: state.plantLevelReducers.EditPlantReducer.editPlantData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // setting visible to false if we close the modal .. and all state data will be deleted if this function is dispatched
    setPlantVisiblity: () => {
      dispatch({ type: DISABLE_EDIT_MODE });
      console.log("edit modal closed");
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Addincoming);
