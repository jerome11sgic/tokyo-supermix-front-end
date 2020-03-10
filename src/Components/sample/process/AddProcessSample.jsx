import React, { Component } from "react";
import { Input, Modal, Icon, Select, Button, Form } from "antd";

import { PrimaryButton } from "../../styledcomponents/button/button";
import {
  MasterLevelFormTitle,
  MasterLevelForm
} from "../../styledcomponents/form/MasterLevelForms";
import { DISABLE_EDIT_MODE } from "../../../redux/action/master/plantlevel/PlantLevel";
import Notification from "../../Constant/Notification";
import { api } from "../../services/AxiosService";
import HandelError from "../../Constant/HandleError";
import { connect } from "react-redux";
const { Option } = Select;

const error = {
  color: "red",
  fontSize: "12px",
  width: "160px",
  height: "2px"
};

function onBlur() {
  console.log("blur");
}

function onFocus() {
  console.log("focus");
}

function onSearch(val) {
  console.log("search:", val);
}
class AddProcessSample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,

      code: "",
      quantity: "",
      rawMaterialId: "",
      incomingSampleCode: "",
      unitId: "",
      SelectRaw: "",
      incomingSampleselect: "",
      SelectUnit: "",
      incomingSampleName: "",
      unitName: "",
      rawMaterialName: "",
      rawmaterialEdit: "",
      UnitEdit: "",
      incomingSampleEdit: "",
      errormgs: "",
      type: "add",
      errors: {
        code: "",
        quantity: "",
        rawMaterialName: "",
        incomingSampleName: "",
        unitName: ""
      }
    };
  }

  showModal = () => {
    this.setState({
      visible: true,
      errors: {
        code: "",
        quantity: "",
        rawMaterialName: "",
        incomingSampleName: "",
        unitName: ""
      },
      code: "",
      quantity: "",
      rawMaterialId: "",
      incomingSampleCode: "",
      unitId: "",
      SelectRaw: "",
      incomingSampleselect: "",
      SelectUnit: "",
      incomingSampleName: "",
      unitName: "",
      rawMaterialName: "",
      rawmaterialEdit: "",
      unitEdit: "",
      incomingSampleEdit: "",
      type: "add"
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,

      errors: {
        code: "",
        quantity: "",
        rawMaterialName: "",
        incomingSampleName: "",
        unitName: ""
      },
      code: "",
      quantity: "",
      rawMaterialId: "",
      incomingSampleCode: "",
      unitId: "",
      SelectRaw: "",
      incomingSampleselect: "",
      SelectUnit: "",
      incomingSampleName: "",
      unitName: "",
      rawMaterialName: "",
      rawmaterialEdit: "",
      unitEdit: "",
      incomingSampleEdit: ""
    });
  };

  handleChange = (event, field) => {
    this.setState({ [field]: event.target.value });
    this.setState({ errormgs: "" });
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "code":
        errors.code =
          value.length === 0
            ? "code can't be empty"
            : value.length < 3
            ? "code \n must be 3 characters long!"
            : "";
        break;
      case "quantity":
        errors.quantity =
          value.length === 0
            ? "quantity can't be empty"
            : value.length < 3
            ? "quantity \n must be 3 characters long!"
            : "";
        break;

      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  handleSelect = (name, value) => {
    console.log(name);
    console.log(value);

    const { errors } = this.state;
    // handle select for  plant
    if (name === "incoming_sample_id") {
      this.setState({
        incomingSampleCode: value,
        incomingSampleEdit: value,
        errors: {
          code: errors.code,
          quantity: errors.quantity,
          rawMaterialName: errors.rawMaterialName,
          incomingSampleName: errors.incomingSampleName,
          unitName: errors.unitName
        }
      });
    }

    //handle select for designation
    if (name === "material_id") {
      this.setState({
        rawMaterialId: value,
        rawmaterialEdit: value
      });
    }

    if (name === "unit_id") {
      this.setState({
        unitId: value,
        unitEdit: value
      });
    }
  };

  //dropdown data
  getAllincomingSample() {
    api("GET", "supermix", "/incoming-samples", "", "", "").then(res => {
      if (res.data.results.incomingSample.length > 0) {
        let SelectIncomingSamples = res.data.results.incomingSample.map(
          (post, index) => {
            return (
              <Option value={post.code} key={index}>
                {post.name}
              </Option>
            );
          }
        );
        this.setState({
          SelectIncomingSamples
        });
      }
    });
  }

  getallrawMaterial = () => {
    console.log("api");

    api("GET", "supermix", "/raw-materials", "", "", "").then(res => {
      console.log(res);

      if (res.data.results.rawMaterial.length > 0) {
        console.log("ggg");
        let SelectRaw = res.data.results.rawMaterial.map((post, index) => {
          return (
            <Option value={post.id} key={index}>
              {post.name}
            </Option>
          );
        });
        this.setState({
          SelectRaw
        });
      }
    });
  };

  getallunits = () => {
    api("GET", "supermix", "/units", "", "", "").then(res => {
      console.log(res.data);
      if (res.data.results.units.length > 0) {
        let SelectUnit = res.data.results.units.map((post, index) => {
          return (
            <Option value={post.id} key={index}>
              {post.name}
            </Option>
          );
        });
        this.setState({
          SelectUnit
        });
      }
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (
      this.state.code.length === 0 &&
      this.state.incomingSampleCode.length === 0 &&
      this.state.rawMaterialId.length === 0 &&
      this.state.quantity.length === 0 &&
      this.state.unitId.length === 0
    ) {
      this.setState({
        errors: {
          code: "Code can't be empty",
          incomingSampleName: "Incoming Sample can't be empty",
          rawMaterialName: "Material can't be empty",
          quantity: "Quantity can't be empty",
          unitName: "Remain Quantity can't be empty"
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      this.state.code.length === 0 &&
      this.state.errors.code.length === 0
    ) {
      this.setState({
        errors: {
          code: this.state.errors.code || "Code can't be empty",
          incomingSampleName: this.state.errors.incoming_sample,
          rawMaterialName: this.state.errors.material,
          quantity: this.state.errors.quantity,
          unitName: this.state.errors.unit
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      this.state.incomingSampleCode.length === 0 &&
      this.state.errors.incomingSampleName.length === 0
    ) {
      this.setState({
        errors: {
          code: this.state.errors.code,
          incomingSampleCode:
            this.state.errors.incomingSampleCode ||
            "Incoming Sample can't be empty",
          rawMaterialName: this.state.errors.rawMaterialName,
          quantity: this.state.errors.quantity,
          unitName: this.state.errors.unitName
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      this.state.rawMaterialId.length === 0 &&
      this.state.errors.rawMaterialName.length === 0
    ) {
      this.setState({
        errors: {
          code: this.state.errors.code,
          incomingSampleName: this.state.errors.incomingSampleName,
          rawMaterialName:
            this.state.errors.rawMaterialName || "Material can't be empty",
          quantity: this.state.errors.quantity,
          unitName: this.state.errors.unitName
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      this.state.quantity.length === 0 &&
      this.state.errors.quantity.length === 0
    ) {
      this.setState({
        errors: {
          code: this.state.errors.code,
          incomingSampleName: this.state.errors.incomingSampleName,
          rawMaterialName: this.state.errors.rawMaterialName,
          quantity: this.state.errors.quantity || "Quantity can't be empty",
          unitName: this.state.errors.unitName
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      this.state.unitId.length === 0 &&
      this.state.errors.unitName.length === 0
    ) {
      this.setState({
        errors: {
          code: this.state.errors.code,
          incomingSampleName: this.state.errors.incomingSampleName,
          rawMaterialName: this.state.errors.rawMaterialName,
          quantity: this.state.errors.quantity,
          unitName: this.state.errors.unitName || "Unit can't be empty"
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      this.state.code.length === 0 &&
      this.state.incoming_sample.length === 0 &&
      this.state.material.length === 0 &&
      this.state.quantity.length === 0 &&
      this.state.unit.length === 0
    ) {
      console.log(this.state.errors);
      this.setState({ formValid: this.validateForm(this.state.errors) });
      this.setState({ errorCount: this.countErrors(this.state.errors) });
      console.log(this.state.formValid);
      console.log(this.state.errorCount);

      const data = {
        code: this.state.code,
        incomingSampleName: this.state.incomingSampleCode,
        rawMaterialName: this.state.rawMaterialId,
        quantity: this.state.quantity,
        unit: this.state.unitId
      };
      if (this.state.type === "add") {
        api("POST", "supermix", "/process-sample", "", data, "")
          .then(
            res => {
              console.log(res.data);
              if (res.data.status == "VALIDATION_FAILURE") {
                console.log("add");
                this.responeserror(res.data.results.name.message);
              } else {
                Notification("success", res.data.message);
                this.props.reload();
                this.setState({ loading: true });
                this.setState({
                  code: "",
                  incomingSampleCode: "",
                  rawMaterialId: "",
                  quantity: "",
                  unitId: "",
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
          code: this.state.code,
          incomingSampleName: this.state.incomingSampleCode,
          rawMaterialName: this.state.rawMaterialId,
          quantity: this.state.quantity,
          unitName: this.state.unitId
        };
        api("PUT", "supermix", "/process-sample", "", data, "")
          .then(
            res => {
              console.log(res.data);

              if (res.data.status == "VALIDATION_FAILURE") {
                console.log("update");
                this.responeserror(res.data.results.name.message);
              } else {
                Notification("success", res.data.message);
                this.props.reload();
                this.setState({ loading: true });
                this.setState({
                  code: "",
                  incomingSampleCode: "",
                  rawMaterialId: "",
                  quantity: "",
                  unitId: "",
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
          .catch(error => {});
      }
      console.log(data);
      console.log("form is valid");
    }
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.type);
    this.setState({
      visible: nextProps.visible,
      code: nextProps.editPlantData.code,
      quantity: nextProps.editPlantData.quantity,
      rawMaterialId: nextProps.editPlantData.rawMaterialId,
      rawMaterialName: nextProps.editPlantData.rawMaterialName,
      incomingSampleCode: nextProps.editPlantData.incomingSampleCode,

      incomingSampleName: nextProps.editPlantData.incomingSampleName,
      unitId: nextProps.editPlantData.unitId,
      unitName: nextProps.editPlantData.unitName,
      incomingSampleEdit: nextProps.editPlantData.incomingSampleName,
      unitEdit: nextProps.editPlantData.unitName,
      rawmaterialEdit: nextProps.editPlantData.rawMaterialName,
      type: nextProps.type
    });
  }

  componentDidMount() {
    // this.getAllincomingSample();
    this.getallrawMaterial();
    this.getallunits();
    console.log(this.props.screen);
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

  // showModal = () => {
  //   this.setState({
  //     visible: true,
  //     processSample_code: "",
  //     incoming_sample_id: "",
  //     material_id: "",
  //     processSample_quantity: "",
  //     unit_id: "",
  //     // username: "",
  //     email: ""
  //   });
  // };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  render() {
    const { visible, loading, type, errors } = this.state;

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
              {type === "edit" ? "Edit" : "Save"}
            </PrimaryButton>
          ]}
          title={
            <MasterLevelFormTitle>
              <p
                style={{
                  color: "white"
                }}
              >
                {type === "edit" ? "Edit Process Sample" : "Add Process Sample"}
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
                onChange={this.handleChange}
                placeholder='Enter the Code'
                value={this.state.code}
              />

              {errors.code.length > 0 && <div style={error}>{errors.code}</div>}
              {this.state.errormgs.message == "code" ? (
                <div style={error}>{HandelError(this.state.errormgs)}</div>
              ) : (
                ""
              )}

              <div style={{ height: "12px" }}></div>
            </div>

            {/* Plant Name */}
            <div className='input_wrapper'>
              <label for='incomingSampleCode' className='label'>
                Incoming Sample:
              </label>

              <Select
                showSearch
                style={{ width: 180 }}
                id='incomingSampleCode'
                name='incomingSampleCode'
                placeholder='Select a Incoming Sample'
                optionFilterProp='children'
                onChange={value =>
                  this.handleSelect("incomingSampleCode", value)
                }
                onFocus={onFocus}
                value={this.state.incomingSampleEdit}
                onBlur={onBlur}
                onSearch={onSearch}
              >
                {this.state.SelectIncomingSamples}
              </Select>
              {errors.incomingSampleName.length > 0 && (
                <div style={error}>{errors.incomingSampleName}</div>
              )}
              <div style={error}>{this.state.errormgs}</div>
              <div style={{ height: "12px" }}></div>
            </div>

            {/* Place */}
            <div className='input_wrapper'>
              <label for='rawMaterialId' className='label'>
                Material:
              </label>

              <Select
                showSearch
                style={{ width: 180 }}
                id='rawMaterialId'
                name='rawMaterialId'
                placeholder='Select the Material'
                optionFilterProp='children'
                onChange={this.handleChange}
                value={this.state.rawmaterialEdit}
              >
                {this.state.SelectRaw}
              </Select>
              {errors.rawMaterialName.length > 0 && (
                <div style={error}>{errors.rawMaterialName}</div>
              )}
              {this.state.errormgs.message == "rawmaterial Code" ? (
                <div style={error}>{HandelError(this.state.errormgs)}</div>
              ) : (
                ""
              )}

              <div style={{ height: "12px" }}></div>
            </div>

            {/* T.P No */}
            <div className='input_wrapper'>
              <label for='quantity' className='label'>
                Quantity:
              </label>

              <Input
                id='quantity'
                name='quantity'
                placeholder='Enter the Quantity'
                onChange={this.handleChange}
                value={this.state.quantity}
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
              <label for='unitId' className='label'>
                Unit:
              </label>

              <Select
                showSearch
                style={{ width: 180 }}
                id='unitId'
                name='unitId'
                placeholder='Select the Unit'
                optionFilterProp='children'
                onChange={this.handleChange}
                value={this.state.unitEdit}
              >
                {this.state.SelectUnit}
              </Select>
              {errors.unitName.length > 0 && (
                <div style={error}>{errors.unitName}</div>
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
