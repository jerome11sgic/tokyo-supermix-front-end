import React, { Component } from "react";
import { Input, Modal, Icon, Select, Button, Form } from "antd";

import { PrimaryButton } from "../../styledcomponents/button/button";
import {
  MasterLevelFormTitle,
  MasterLevelForm
} from "../../styledcomponents/form/MasterLevelForms";
import { DISABLE_EDIT_MODE } from "../../../redux/action/master/plantlevel/PlantLevel";
import TextArea from "antd/lib/input/TextArea";
import HandelError from "../../Constant/HandleError";
import { connect } from "react-redux";

const error = {
  color: "red",
  fontSize: "12px",
  width: "160px",
  height: "2px"
};
class AddProcessSample extends Component {
  constructor() {
    super();
    this.state = {
      formValid: false,
      errorCount: 0,
      errors: {
        code: "",
        incoming_sample_id: "",
        materila_id: "",
        quantity: "",
        remain_in_quantity: ""
      },
      loading: false,
      visible: false,
      processSample_code: "",
      processSample_Incoming_sample: "",
      processSample_material_id: "",
      processSample_quantity: "",
      processSample_remain_in_qunatity: "",
      errormgs: "",
      type: "add"
    };
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

  handleChange = (event, field) => {
    this.setState({ [field]: event.target.value });
    this.setState({ errormgs: "" });
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    // console.log(name + " is \t" + value);
    switch (name) {
      case "processSample_code":
        errors.code =
          value.length === 0
            ? "Code can't be empty"
            : value.length < 1
            ? "Code must be one characters long!"
            : "";
        break;
      case "processSample_Incoming_sample":
        errors.incoming_sample_id =
          value.length === 0
            ? "Incoming Sample can't be empty"
            : value.length < 3
            ? "Incoming Sample \n must be 3 characters long!"
            : value.replace(/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/, "")
            ? "Incoming Sample allow only letters"
            : "";
        break;
      case "processSample_material_id":
        errors.materila_id =
          value.length === 0
            ? "Material can't be empty"
            : value.length < 3
            ? "Material must be 3 characters long!"
            : "";
        break;
      case "processSample_quantity":
        errors.quantity = isNaN(value)
          ? `Quantity must be a number`
          : value.length === 0
          ? "Quantity  can't be empty"
          : "";
        break;
      case "processSample_remain_in_qunatity":
        errors.remain_in_quantity = isNaN(value)
          ? `Remain Quantity must be a number`
          : value.length === 0
          ? " RemainQuantity  can't be empty"
          : "";

        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  componentDidMount() {
    console.log(this.props.screen);
  }

  render() {
    const { visible } = this.state;
    const { errors } = this.state;

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
          Add Processing Sample
        </PrimaryButton>
        <Modal
          width='500px'
          visible={visible}
          okType='default'
          closable={false}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key='back' onClick={this.handleCancel}>
              Return
            </Button>,
            <PrimaryButton
              key='submit'
              // loading={loading}
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
                Add Processing Sample
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
              <label for='processSample_code' className='label'>
                Code:
              </label>

              <Input
                id='processSample_code'
                name='processSample_code'
                onChange={this.handleChange}
                placeholder='Enter the Code'
                value={this.state.processSample_code}
              />

              {errors.code.length > 0 && <div style={error}>{errors.code}</div>}
              {this.state.errormgs.message == "proccesSample Code" ? (
                <div style={error}>{HandelError(this.state.errormgs)}</div>
              ) : (
                ""
              )}

              <div style={{ height: "12px" }}></div>
            </div>

            {/* Plant Name */}
            <div className='input_wrapper'>
              <label for='processSample_Incoming_sample' className='label'>
                Incoming Sample:
              </label>

              <Select
                showSearch
                style={{ width: 180 }}
                id='processSample_Incoming_sample'
                name='processSample_Incoming_sample'
                placeholder='Select the Incoming Sample'
                optionFilterProp='children'
                onChange={this.handleChange}
                value={this.state.plantEdit}
              >
                {this.state.SelectPlants}
              </Select>

              {errors.incoming_sample_id.length > 0 && (
                <div style={error}>{errors.incoming_sample_id}</div>
              )}
              {this.state.errormgs.message == "proccesSample Code" ? (
                <div style={error}>{HandelError(this.state.errormgs)}</div>
              ) : (
                ""
              )}

              <div style={{ height: "12px" }}></div>
            </div>

            {/* Place */}
            <div className='input_wrapper'>
              <label for='processSample_material_id' className='label'>
                Material:
              </label>

              <Select
                showSearch
                style={{ width: 180 }}
                id='processSample_material_id'
                name='processSample_material_id'
                placeholder='Select the Material'
                optionFilterProp='children'
                onChange={this.handleChange}
                value={this.state.plantEdit}
              >
                {this.state.SelectPlants}
              </Select>
              {errors.materila_id.length > 0 && (
                <div style={error}>{errors.materila_id}</div>
              )}
              {this.state.errormgs.message == "proccesSample Code" ? (
                <div style={error}>{HandelError(this.state.errormgs)}</div>
              ) : (
                ""
              )}

              <div style={{ height: "12px" }}></div>
            </div>

            {/* T.P No */}
            <div className='input_wrapper'>
              <label for='processSample_quantity' className='label'>
                Quantity:
              </label>

              <Input
                id='processSample_quantity'
                name='processSample_quantity'
                placeholder='Enter the Quantity'
                onChange={this.handleChange}
                value={this.state.processSample_quantity}
              />

              {errors.quantity.length > 0 && (
                <div style={error}>{errors.quantity}</div>
              )}
              {this.state.errormgs.message == "proccesSample Code" ? (
                <div style={error}>{HandelError(this.state.errormgs)}</div>
              ) : (
                ""
              )}

              <div style={{ height: "12px" }}></div>
            </div>

            <div className='input_wrapper'>
              <label for='processSample_remain_in_qunatity' className='label'>
                Remain Quantity:
              </label>

              <Input
                id='processSample_remain_in_qunatity'
                name='processSample_remain_in_qunatity'
                placeholder='Enter the Remain Quantity'
                onChange={this.handleChange}
                value={this.state.processSample_remain_in_qunatity}
              />

              {errors.remain_in_quantity.length > 0 && (
                <div style={error}>{errors.remain_in_quantity}</div>
              )}
              {this.state.errormgs.message == "proccesSample Code" ? (
                <div style={error}>{HandelError(this.state.errormgs)}</div>
              ) : (
                ""
              )}

              <div style={{ height: "12px" }}></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddProcessSample);
