import React, { Component } from "react";
import { Input, Modal, Icon, Select, Button, Form } from "antd";

import { PrimaryButton } from "../../styledcomponents/button/button";
import {
  MasterLevelFormTitle,
  MasterLevelForm
} from "../../styledcomponents/form/MasterLevelForms";
import { DISABLE_EDIT_MODE } from "../../../redux/action/master/plantlevel/PlantLevel";
import Notificationfuc from "../../Constant/Notification";
import { api } from "../../services/AxiosService";
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

  validateForm = errors => {
    let valid;
    Object.values(errors).forEach(
      val => val.length > 1 && (valid = false),
      (valid = true)
    );
    // this.setState({
    //   formValid: valid
    // })
    console.log(valid);

    return valid;
  };

  countErrors = errors => {
    let count = 0;
    Object.values(errors).forEach(val => val.length > 0 && (count = count + 1));

    // this.setState({
    //   errorCount: count
    // })
    console.log(count);

    return count;
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

  handleSubmit = event => {
    event.preventDefault();
    if (
      this.state.processSample_code.length === 0 &&
      this.state.processSample_Incoming_sample.length === 0 &&
      this.state.processSample_material_id.length === 0 &&
      this.state.processSample_quantity.length === 0 &&
      this.state.processSample_remain_in_qunatity.length === 0
    ) {
      this.setState({
        errors: {
          code: "Code can't be empty",
          incoming_sample_id: "Incoming Sample can't be empty",
          materila_id: "Material can't be empty",
          quantity: "Quantity can't be empty",
          remain_in_quantity: "Remain Quantity can't be empty"
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      this.state.processSample_code.length === 0 &&
      this.state.errors.code.length === 0
    ) {
      this.setState({
        errors: {
          code: this.state.errors.code || "Code can't be empty",
          incoming_sample_id: this.state.errors.incoming_sample_id,
          materila_id: this.state.errors.materila_id,
          quantity: this.state.errors.quantity,
          remain_in_quantity: this.state.errors.remain_in_quantity
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      this.state.processSample_Incoming_sample.length === 0 &&
      this.state.errors.incoming_sample_id.length === 0
    ) {
      this.setState({
        errors: {
          code: this.state.errors.code,
          incoming_sample_id:
            this.state.errors.incoming_sample_id ||
            "Incoming Sample can't be empty",
          materila_id: this.state.errors.materila_id,
          quantity: this.state.errors.quantity,
          remain_in_quantity: this.state.errors.remain_in_quantity
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      this.state.processSample_material_id.length === 0 &&
      this.state.errors.materila_id.length === 0
    ) {
      this.setState({
        errors: {
          code: this.state.errors.code,
          incoming_sample_id: this.state.errors.incoming_sample_id,
          materila_id:
            this.state.errors.materila_id || "Material can't be empty",
          quantity: this.state.errors.quantity,
          remain_in_quantity: this.state.errors.remain_in_quantity
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      this.state.processSample_quantity.length === 0 &&
      this.state.errors.quantity.length === 0
    ) {
      this.setState({
        errors: {
          code: this.state.errors.code,
          incoming_sample_id: this.state.errors.incoming_sample_id,
          materila_id: this.state.errors.materila_id,
          quantity: this.state.errors.quantity || "Quantity can't be empty",
          remain_in_quantity: this.state.errors.remain_in_quantity
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      this.state.processSample_remain_in_qunatity.length === 0 &&
      this.state.errors.remain_in_quantity.length === 0
    ) {
      this.setState({
        errors: {
          code: this.state.errors.code,
          incoming_sample_id: this.state.errors.incoming_sample_id,
          materila_id: this.state.errors.materila_id,
          quantity: this.state.errors.quantity,
          remain_in_quantity:
            this.state.errors.remain_in_quantity ||
            "Remain Quantity can't be empty"
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      this.state.code.length === 0 &&
      this.state.incoming_sample_id.length === 0 &&
      this.state.materila_id.length === 0 &&
      this.state.quantity.length === 0 &&
      this.state.remain_in_quantity.length === 0
    ) {
      console.log(this.state.errors);
      this.setState({ formValid: this.validateForm(this.state.errors) });
      this.setState({ errorCount: this.countErrors(this.state.errors) });
      console.log(this.state.formValid);
      console.log(this.state.errorCount);

      const data = {
        code: this.state.plant_code,
        incoming_sample_id: this.state.processSample_Incoming_sample,
        materila_id: this.state.processSample_material_id,
        quantity: this.state.processSample_quantity,
        remain_in_quantity: this.state.processSample_remain_in_qunatity
      };
      if (this.state.type === "add") {
        api("POST", "supermix", "/processsample", "", data, "")
          .then(
            res => {
              console.log(res.data);
              if (res.data.status == "VALIDATION_FAILURE") {
                console.log("add");
                this.responeserror(res.data.results.name.message);
              } else {
                Notificationfuc("success", res.data.message);
                this.props.reload();
                this.setState({ loading: true });
                this.setState({
                  processSample_code: "",
                  processSample_Incoming_sample: "",
                  processSample_material_id: "",
                  processSample_quantity: "",
                  processSample_remain_in_qunatity: "",
                  errormgs: ""
                });
                setTimeout(() => {
                  this.setState({ loading: false, visible: false });
                });
              }
            },
            error => {
              this.setState({
                errormgs: error.validationFailures[0]
              });
              console.log("DEBUG34: ", error);
              console.log(HandelError(error.validationFailures[0]));
            }
          )
          .catch(error => {
            this.setState({
              // errormgs: "Plant Name Exist"
            });
            console.log(error);
          });
      } else {
        const data = {
          code: this.state.plant_code,
          incoming_sample_id: this.state.processSample_Incoming_sample,
          materila_id: this.state.processSample_material_id,
          quantity: this.state.processSample_quantity,
          remain_in_quantity: this.state.processSample_remain_in_qunatity
        };
        api("PUT", "supermix", "/processsample", "", data, "")
          .then(
            res => {
              console.log(res.data);

              if (res.data.status == "VALIDATION_FAILURE") {
                console.log("update");
                this.responeserror(res.data.results.name.message);
              } else {
                Notificationfuc("success", res.data.message);
                this.props.reload();
                this.setState({ loading: true });
                this.setState({
                  processSample_code: "",
                  processSample_Incoming_sample: "",
                  processSample_material_id: "",
                  processSample_quantity: "",
                  processSample_remain_in_qunatity: "",
                  errormgs: ""
                });
                setTimeout(() => {
                  this.setState({ loading: false, visible: false });
                });
              }
            },
            error => {
              this.setState({
                errormgs: error.validationFailures[0]
              });
              console.log("DEBUG34: ", error);
              console.log(HandelError(error.validationFailures[0]));
            }
          )
          .catch(error => {
            // this.setState({
            //   errormgs: "Plant Name Exist"
            // });
            // console.log(error.response.data);
          });
      }
      console.log(data);
      console.log("form is valid");
    }
  };

  showModal = () => {
    this.setState({
      visible: true,
      processSample_code: "",
      processSample_Incoming_sample: "",
      processSample_material_id: "",
      processSample_quantity: "",
      processSample_remain_in_qunatity: ""
    });
  };

  handleCancel = () => {
    if (this.state.type === "edit") {
      // we call the redux function to dispatch and delete all the global redux state to close the modal
      this.props.setPlantVisiblity();
    }

    this.setState({
      visible: false,
      formValid: false,
      errors: {
        code: "",
        incoming_sample_id: "",
        materila_id: "",
        quantity: "",
        remain_in_quantity: ""
      },
      processSample_code: "",
      processSample_Incoming_sample: "",
      processSample_material_id: "",
      processSample_quantity: "",
      processSample_remain_in_qunatity: "",
      errormgs: ""
    });
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
              onClick={this.handleSubmit}
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
