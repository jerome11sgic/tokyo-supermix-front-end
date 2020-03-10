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
  constructor() {
    super();
    this.state = {
      formValid: false,
      errorCount: 0,
      errors: {
        code: "",
        incoming_sample: "",
        quantity: "",
        unit: ""
      },
      loading: false,
      visible: false,
      processSample_code: "",
      incoming_sample_id: "",
      material_id: "",
      processSample_quantity: "",
      unit_id: "",
      errormgs: "",
      type: "add",
      incomingSampleEdit: "",
      materialEdit: "",
      unitEdit: ""
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
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);

    this.setState({
      visible: nextProps.visible,
      processSample_code: nextProps.editPlantData.code,
      incoming_sample_id: nextProps.editPlantData.incomingSample.code,
      processSample_quantity: nextProps.editPlantData.quantity,
      unit_id: nextProps.editPlantData.unitId,
      type: nextProps.type
    });
  }
  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    if (this.state.type === "edit") {
      this.props.setProessVisiblity();
    }

    this.setState({
      visible: false,
      type: "add",
      processSample_code: "",
      incoming_sample_id: "",
      material_id: "",
      processSample_quantity: "",
      unit_id: "",
      errormgs: ""
    });
  };

  // handleSubmit = e => {
  //   console.log(e);
  //   console.log(this.props.form);
  //   e.preventDefault();
  //   this.props.form.validateFields((err, values) => {
  //     if (!err) {
  //       console.log("Received values of form: ", values);
  //       this.setState({ loading: true });
  //       setTimeout(() => {
  //         this.setState({ loading: false, visible: false });
  //       }, 3000);
  //     }
  //   });
  // };

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
      case "incoming_sample_id":
        errors.incoming_sample =
          value.length === 0
            ? "Incoming Sample can't be empty"
            : value.length < 3
            ? "Incoming Sample \n must be 3 characters long!"
            : value.replace(/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/, "")
            ? "Incoming Sample allow only letters"
            : "";
        break;

      case "processSample_quantity":
        errors.quantity = isNaN(value)
          ? `Quantity must be a number`
          : value.length === 0
          ? "Quantity  can't be empty"
          : "";
        break;
      case "unit_id":
        errors.unit = isNaN(value)
          ? `Unit must be a number`
          : value.length === 0
          ? " Unit  can't be empty"
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
      this.state.incoming_sample_id.length === 0 &&
      this.state.processSample_quantity.length === 0 &&
      this.state.unit_id.length === 0
    ) {
      this.setState({
        errors: {
          code: "Code can't be empty",
          incoming_sample: "Incoming Sample can't be empty",

          quantity: "Quantity can't be empty",
          unit: "Remain Quantity can't be empty"
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
          incoming_sample: this.state.errors.incoming_sample,

          quantity: this.state.errors.quantity,
          unit: this.state.errors.unit
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      this.state.incoming_sample_id.length === 0 &&
      this.state.errors.incoming_sample.length === 0
    ) {
      this.setState({
        errors: {
          code: this.state.errors.code,
          incoming_sample:
            this.state.errors.incoming_sample ||
            "Incoming Sample can't be empty",

          quantity: this.state.errors.quantity,
          unit: this.state.errors.unit
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
          incoming_sample: this.state.errors.incoming_sample,

          quantity: this.state.errors.quantity || "Quantity can't be empty",
          unit: this.state.errors.unit
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      this.state.unit_id.length === 0 &&
      this.state.errors.unit.length === 0
    ) {
      this.setState({
        errors: {
          code: this.state.errors.code,
          incoming_sample: this.state.errors.incoming_sample,

          quantity: this.state.errors.quantity,
          unit: this.state.errors.unit || "Unit can't be empty"
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      this.state.errors.code.length === 0 &&
      this.state.errors.incoming_sample.length === 0 &&
      this.state.errors.quantity.length === 0 &&
      this.state.errors.unit.length === 0
    ) {
      console.log("form is valid");
      console.log(this.state.errors);
      this.setState({ formValid: this.validateForm(this.state.errors) });
      this.setState({ errorCount: this.countErrors(this.state.errors) });
      console.log(this.state.formValid);
      console.log(this.state.errorCount);

      if (this.state.type === "add") {
        const data = {
          code: this.state.processSample_code,
          incomingSampleCode: this.state.incoming_sample_id,

          quantity: this.state.processSample_quantity,
          unitId: this.state.unit_id
        };
        console.log(data);
        api("POST", "supermix", "/process-sample", "", data, "")
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
                  incoming_sample_id: "",
                  material_id: "",
                  processSample_quantity: "",
                  unit_id: "",
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
          code: this.state.processSample_code,
          incomingSampleCode: this.state.incoming_sample_id,

          quantity: this.state.processSample_quantity,
          unitId: this.state.unit_id
        };
        console.log(data);
        api("PUT", "supermix", "/process-sample", "", data, "")
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
                  incoming_sample_id: "",
                  material_id: "",
                  processSample_quantity: "",
                  unit_id: "",
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

      console.log("form is valid");
    }
  };

  showModal = () => {
    this.setState({
      visible: true,
      processSample_code: "",
      incoming_sample_id: "",
      material_id: "",
      processSample_quantity: "",
      unit_id: ""
    });
  };

  handleSelect = (name, value) => {
    console.log(name);
    console.log(value);
    // handle select for  plant
    if (name === "incoming_sample_id") {
      this.setState({
        incoming_sample_id: value,
        incomingSampleEdit: value
      });

      if (value.length !== 0) {
        this.setState({
          errors: {
            // code: this.state.errors.code,
            code: this.state.errors.code,

            incoming_sample: "",
            quantity: this.state.errors.quantity,
            unit: this.state.errors.unit
          }
        });
      }
    }

    //handle select for designation

    if (name === "unit_id") {
      this.setState({
        unit_id: value,
        unitEdit: value
      });

      if (value.length !== 0) {
        this.setState({
          errors: {
            // code: this.state.errors.code,
            code: this.state.errors.code,

            incoming_sample: this.state.errors.incoming_sample,
            quantity: this.state.errors.quantity,
            unit: ""
          }
        });
      }
    }
  };

  //dropdown data
  getAllincomingSample() {
    api("GET", "supermix", "/incoming-samples", "", "", "").then(res => {
      console.log(res.data);
      if (res.data.results.incomingSamples.length > 0) {
        let SelectIncomingSamples = res.data.results.incomingSamples.map(
          (post, index) => {
            return (
              <Option value={post.code} key={index}>
                {post.code}
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

  getallMaterial = () => {
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

  getallunit = () => {
    api("GET", "supermix", "/units", "", "", "").then(res => {
      console.log(res.data);
      if (res.data.results.units.length > 0) {
        let SelectUnit = res.data.results.units.map((post, index) => {
          return (
            <Option value={post.id} key={index}>
              {post.unit}
            </Option>
          );
        });
        this.setState({
          SelectUnit
        });
      }
    });
  };

  handleCancel = () => {
    if (this.state.type === "edit") {
      // we call the redux function to dispatch and delete all the global redux state to close the modal
      this.props.setProessVisiblity();
    }

    this.setState({
      visible: false,
      formValid: false,
      errors: {
        code: "",
        incoming_sample: "",
        material: "",
        quantity: "",
        unit: ""
      },
      processSample_code: "",
      incoming_sample_id: "",
      processSample_quantity: "",
      unit_id: "",
      errormgs: ""
    });
  };

  componentDidMount() {
    this.getAllincomingSample();
    this.getallMaterial();
    this.getallunit();
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
          width="500px"
          visible={visible}
          okType="default"
          closable={false}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <PrimaryButton
              key="submit"
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
              <label for="processSample_code" className="label">
                Code:
              </label>

              <Input
                id="processSample_code"
                name="processSample_code"
                onChange={this.handleChange}
                placeholder="Enter the Code"
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
            <div className="input_wrapper">
              <label for="incoming_sample_id" className="label">
                Incoming Sample:
              </label>

              <Select
                showSearch
                style={{ width: 180 }}
                id="incoming_sample_id"
                name="incoming_sample_id"
                placeholder="Select a Incoming Sample"
                optionFilterProp="children"
                onChange={value =>
                  this.handleSelect("incoming_sample_id", value)
                }
                onFocus={onFocus}
                value={this.state.incomingSampleEdit}
                onBlur={onBlur}
                onSearch={onSearch}
              >
                {this.state.SelectIncomingSamples}
              </Select>
              {errors.incoming_sample.length > 0 && (
                <div style={error}>{errors.incoming_sample}</div>
              )}

              <div style={{ height: "12px" }}></div>
            </div>

            {/* Place */}
            {/* <div className="input_wrapper">
              <label for="material_id" className="label">
                Material:
              </label>

              <Select
                showSearch
                style={{ width: 180 }}
                id="material_id"
                name="material_id"
                placeholder="Select the Material"
                optionFilterProp="children"
                value={this.state.materialEdit}
                onChange={value => this.handleSelect("material_id", value)}
              >
                {this.state.SelectRaw}
              </Select>
              {errors.material.length > 0 && (
                <div style={error}>{errors.material}</div>
              )}
              {this.state.errormgs.message == "proccesSample Code" ? (
                <div style={error}>{HandelError(this.state.errormgs)}</div>
              ) : (
                ""
              )}

              <div style={{ height: "12px" }}></div>
            </div> */}

            {/* T.P No */}
            <div className="input_wrapper">
              <label for="processSample_quantity" className="label">
                Quantity:
              </label>

              <Input
                id="processSample_quantity"
                name="processSample_quantity"
                placeholder="Enter the Quantity"
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

            <div className="input_wrapper">
              <label for="unit" className="label">
                Unit:
              </label>

              <Select
                showSearch
                style={{ width: 180 }}
                id="unit_id"
                name="unit_id"
                placeholder="Select the Material"
                optionFilterProp="children"
                value={this.state.unitEdit}
                onChange={value => this.handleSelect("unit_id", value)}
              >
                {this.state.SelectUnit}
              </Select>
              {errors.unit.length > 0 && <div style={error}>{errors.unit}</div>}
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
    setProessVisiblity: () => {
      dispatch({ type: DISABLE_EDIT_MODE });
      console.log("edit modal closed");
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProcessSample);
