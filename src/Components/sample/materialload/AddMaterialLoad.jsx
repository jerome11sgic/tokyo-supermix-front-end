import React, { Component } from "react";
import { Input, Modal, Icon, Select, Button, DatePicker, Form } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { PrimaryButton } from "../../styledcomponents/button/button";
import HandelError from "../../Constant/HandleError";
import { api } from "../../services/AxiosService";
import moment from "moment";
import {
  MasterLevelFormTitle,
  MasterLevelForm
} from "../../styledcomponents/form/MasterLevelForms";
import { DISABLE_EDIT_MODE } from "../../../redux/action/master/plantlevel/PlantLevel";
import { connect } from "react-redux";

const Option = Select;

const error = {
  color: "red",
  fontSize: "12px",
  width: "160px",
  height: "2px"
};

class AddMaterialLoad extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props.editPlantData)
    this.state = {
      formValid: false,
      errorCount: 0,
      errors: {
        process_sample_code: "",
        vechicle_no: "",
        quantity: "",
        measurement: "",
        dateandtime: "",
        expiry_date: ""
      },
      loading: false,
      visible: false,
      processLoad_code: "",
      processLoad_process_sample_code: "",
      processLoad_vechicle_no: "",
      processLoad_quantity: "",
      processLoad_measurement: "",
      processLoad_dateandtime: "",
      processLoad_expiry_date: "",
      edit_process_sample: "",
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

    console.log(valid);

    return valid;
  };

  countErrors = errors => {
    let count = 0;
    Object.values(errors).forEach(val => val.length > 0 && (count = count + 1));

    console.log(count);

    return count;
  };

  showModal = () => {
    this.setState({
      visible: true,
      processLoad_vechicle_no: "",
      processLoad_quantity: "",
      processLoad_measurement: "",
      processLoad_process_sample_code: "",
      processLoad_dateandtime: "",
      processLoad_expiry_date: ""
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
      case "processLoad_code":
        errors.code =
          value.length === 0
            ? "Code can't be empty"
            : value.length < 1
            ? "Code must be one characters long!"
            : "";
        break;
      case "processLoad_process_sample_code":
        errors.process_sample_code =
          value.length === 0
            ? "Process Sample can't be empty"
            : value.length < 3
            ? "Process Sample \n must be 3 characters long!"
            : value.replace(/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/, "")
            ? "Process Sample allow only letters"
            : "";
        break;
      case "processLoad_vechicle_no":
        errors.vechicle_no =
          value.length === 0
            ? "Vechicle No  can't be empty"
            : value.length < 3
            ? "Vechicle No must be 3 characters long!"
            : "";
        break;
      case "processLoad_quantity":
        errors.quantity = isNaN(value)
          ? `Quantity  must be a number`
          : value.length === 0
          ? "Quantity can't be empty"
          : value.length < 9
          ? `Quantity must be 10 characters long!`
          : "";
        break;
      case "processLoad_measurement":
        errors.measurement = isNaN(value)
          ? `Measurement must be a number`
          : value.length === 0
          ? "Measurement can't be empty"
          : value.length < 9
          ? `Measurement must be 10 characters long!`
          : "";
        break;
      case "processLoad_dateandtime":
        errors.dateandtime = isNaN(value)
          ? `Mixdesign must be a number`
          : value.length === 0
          ? "Mixdesign can't be empty"
          : value.length < 9
          ? `Mixdesign must be 10 characters long!`
          : "";
        break;
      case "processLoad_expiry_date":
        errors.dateandtime = isNaN(value)
          ? `Exipry Date must be a number`
          : value.length === 0
          ? "Exipry Date can't be empty"
          : value.length < 9
          ? `Exipry Date must be 10 characters long!`
          : "";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleSelect = value => {
    this.setState({
      processLoad_process_sample_code: value,
      edit_process_sample: value
      // errors: {
      //   code: "",
      //   name: this.state.errors.name,
      //   companyName: this.state.errors.companyName,
      //   category: "",
      //   address: this.state.errors.address,
      //   contactno: this.state.errors.contactno,
      //   email: this.state.errors.email
      // }
    });
  };

  handleCancel = () => {
    if (this.state.type === "edit") {
      // we call the redux function to dispatch and delete all the global redux state to close the modal
      this.props.setProcessSampleLoadVisiblity();
    }
    this.setState({
      visible: false,
      formValid: false,
      processLoad_process_sample_code: "",
      processLoad_vechicle_no: "",
      processLoad_quantity: "",
      processLoad_measurement: "",
      processLoad_dateandtime: "",
      processLoad_expiry_date: "",
      errors: {
        process_sample_code: "",
        vechicle_no: "",
        quantity: "",
        measurement: "",
        expiry_date: "",
        dateandtime: ""
      },
      errormgs: ""
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (
      this.state.processLoad_process_sample_code.length === 0 &&
      this.state.processLoad_vechicle_no.length === 0 &&
      this.state.processLoad_quantity.length === 0 &&
      this.state.processLoad_measurement.length === 0 &&
      this.state.processLoad_dateandtime.length === 0 &&
      this.state.processLoad_expiry_date.length === 0
    ) {
      this.setState({
        errors: {
          process_sample_code: "Process Sample can't be empty",
          vechicle_no: "Vechicle No can't be empty",
          quantity: "Quantity can't be empty",
          measurement: "Measurement can't be empty",
          dateandtime: "Date can't be empty",
          expiry_date: "Expiry Date can't be empty"
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      this.state.processLoad_process_sample_code.length === 0 &&
      this.state.errors.process_sample_code.length === 0
    ) {
      this.setState({
        errors: {
          process_sample_code:
            this.state.errors.process_sample_code ||
            "Process Sample can't be empty",
          vechicle_no: this.state.errors.vechicle_no,
          quantity: this.state.errors.quantity,
          measurement: this.state.errors.measurement,
          dateandtime: this.state.errors.dateandtime,
          expiry_date: this.state.errors.expiry_date
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      this.state.processLoad_vechicle_no.length === 0 &&
      this.state.errors.vechicle_no.length === 0
    ) {
      this.setState({
        errors: {
          process_sample_code: this.state.errors.process_sample_code,

          vechicle_no:
            this.state.errors.vechicle_no || "Process Sample can't be empty",
          quantity: this.state.errors.quantity,
          measurement: this.state.errors.measurement,
          dateandtime: this.state.errors.dateandtime,
          expiry_date: this.state.errors.expiry_date
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      this.state.processLoad_quantity.length === 0 &&
      this.state.errors.quantity.length === 0
    ) {
      this.setState({
        errors: {
          process_sample_code: this.state.errors.process_sample_code,

          vechicle_no: this.state.errors.vechicle_no,
          quantity: this.state.errors.quantity || " Quantity can't be empty",
          measurement: this.state.errors.measurement,
          dateandtime: this.state.errors.dateandtime,
          expiry_date: this.state.errors.expiry_date
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      this.state.processLoad_measurement.length === 0 &&
      this.state.errors.measurement.length === 0
    ) {
      this.setState({
        errors: {
          process_sample_code: this.state.errors.process_sample_code,

          vechicle_no: this.state.errors.vechicle_no,
          quantity: this.state.errors.quantity,
          measurement:
            this.state.errors.measurement || " Measurement can't be empty",
          dateandtime: this.state.errors.dateandtime,
          expiry_date: this.state.errors.expiry_date
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      this.state.processLoad_dateandtime.length === 0 &&
      this.state.errors.dateandtime.length === 0
    ) {
      this.setState({
        errors: {
          process_sample_code: this.state.errors.process_sample_code,

          vechicle_no: this.state.errors.vechicle_no,
          quantity: this.state.errors.quantity,
          measurement: this.state.errors.measurement,
          dateandtime: this.state.errors.dateandtime || " Date can't be empty",
          expiry_date: this.state.errors.expiry_date
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      this.state.processLoad_expiry_date.length === 0 &&
      this.state.errors.expiry_date.length === 0
    ) {
      this.setState({
        errors: {
          process_sample_code: this.state.errors.process_sample_code,

          vechicle_no: this.state.errors.vechicle_no,
          quantity: this.state.errors.quantity,
          measurement: this.state.errors.measurement,
          dateandtime: this.state.errors.dateandtime,
          expiry_date:
            this.state.errors.expiry_date || " Expiry Date can't be empty"
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      this.state.processLoad_process_sample_code.length === 0 &&
      this.state.processLoad_vechicle_no.length === 0 &&
      this.state.processLoad_quantity.length === 0 &&
      this.state.processLoad_measurement.length === 0 &&
      this.state.processLoad_dateandtime.length === 0 &&
      this.state.processLoad_expiry_date.length === 0
    ) {
      this.setState({ formValid: this.validateForm(this.state.errors) });
      this.setState({ errorCount: this.countErrors(this.state.errors) });
      console.log(this.state.designation_name);
      const data = {
        process_sample_code: this.state.process_sample_code,
        vechicle_no: this.state.vechicle_no,
        quantity: this.state.quantity,
        measurement: this.state.measurement,
        dateandtime: this.state.dateandtime,
        expiry_date: this.state.expiry_date
      };
      if (this.state.type === "edit") {
        const data = {
          id: this.state.designation_code,
          process_sample_code: this.state.process_sample_code,
          vechicle_no: this.state.vechicle_no,
          quantity: this.state.quantity,
          measurement: this.state.measurement,
          dateandtime: this.state.dateandtime,
          expiry_date: this.state.expiry_date
        };
        console.log(data);
        api("PUT", "supermix", "/processSampleload", "", data, "").then(
          res => {
            console.log(res.data);

            if (res.data.status === "VALIDATION_FAILURE") {
              console.log("update");
              this.responeserror(res.data.results.name.message);
            } else {
              Notification("success", res.data.message);
              this.props.reloadrole();
              this.setState({ loading: true });
              this.setState({
                processLoad_code: "",
                process_sample_code: "",
                vechicle_no: "",
                quantity: "",
                measurement: "",
                dateandtime: "",
                expiry_date: "",
                errormgs: ""
              });
              setTimeout(() => {
                this.setState({ loading: false, visible: false });
              }, 3000);
            }
          },
          error => {
            this.setState({
              errormgs: error.validationFailures[0]
            });
            console.log("DEBUG34: ", error);
            console.log(HandelError(error.validationFailures[0]));
          }
        );
      } else {
        const data = {
          process_sample_code: this.state.process_sample_code,
          vechicle_no: this.state.vechicle_no,
          quantity: this.state.quantity,
          measurement: this.state.measurement,
          dateandtime: moment(this.state.dateandtime).format("YYYY-MM-DD"),
          expiry_date: this.state.expiry_date
        };
        console.log(data);
        api("POST", "supermix", "/processSampleLoad", "", data, "")
          .then(
            res => {
              console.log(this.state.type);
              console.log(res.data);
              if (res.data.status === "VALIDATION_FAILURE") {
                console.log("jjjj");
                this.responeserror(res.data.results.name.message);
              } else {
                Notification("success", res.data.message);
                this.props.reloadrole();
                // this.props.reload();
                this.setState({ loading: true });
                this.setState({
                  processLoad_code: "",
                  process_sample_code: "",
                  vechicle_no: "",
                  quantity: "",
                  measurement: "",
                  dateandtime: "",
                  expiry_date: "",
                  errormgs: ""
                });
                setTimeout(() => {
                  this.setState({ loading: false, visible: false });
                }, 3000);
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
            console.log(error);
          });
      }

      console.log(data);
      console.log("form is valid");
    }
  };

  componentDidMount() {
    console.log(this.props.screen);
    this.getallprocessSample();
  }

  getallprocessSample = () => {
    api("GET", "supermix", "/process-samples", "", "", "").then(res => {
      console.log(res.data);
      let a = "supplier - category";
      if (res.data.results.processSamples.length > 0) {
        console.log("kkkkkkkkkk");
        let SelectProcessSample = res.data.results.processSamples.map(
          (post, index) => {
            return (
              <Option value={post.id} key={index}>
                {post.name}
              </Option>
            );
          }
        );
        this.setState({
          SelectProcessSample
        });
      }
    });
  };

  handleDates(name, dateString, field) {
    console.log(name);
    console.log(dateString);
    console.log(field);
    let convertedDate = moment(dateString).format("DD-MM-YYYY");
    console.log(convertedDate);
    const { errors } = this.state;

    this.setState({
      date: dateString,
      errors: {
        process_sample_code: errors.process_sample_code,
        vechicle_no: errors.vechicle_no,
        quantity: errors.quantity,
        measurement: errors.measurement,
        expiry_date: "",
        dateandtime: ""
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.editPlantData);
    this.setState({
      visible: nextProps.visible,

      // finish_product_date: moment(nextProps.editPlantData.date, "DD-MM-YYYY"),
      processLoad_process_sample_code:
        nextProps.editPlantData.process_sample_code,
      processLoad_vechicle_no: nextProps.editPlantData.vechicle_no,
      processLoad_quantity: nextProps.editPlantData.quantity,
      processLoad_measurement: nextProps.editPlantData.measurement,
      processLoad_expiry_date: nextProps.editPlantData.expiry_date,
      dateandtime: nextProps.editPlantData.dateandtime,
      type: nextProps.type
    });
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
          Add Process Sample Load
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
                Add Process Sample Load
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
            <div className='input_wrapper'>
              <label for='incoming_sample' className='label'>
                Process Sample:
              </label>

              <Select
                showSearch
                id='processLoad_process_sample_code'
                name='processLoad_process_sample_code'
                style={{ width: 170 }}
                placeholder='Select the Process Sample'
                optionFilterProp='children'
                onChange={value =>
                  this.handleSelect("processLoad_process_sample_code", value)
                }
                value={this.state.edit_process_sample}
              >
                {this.state.SelectProcessSample}
              </Select>
              {errors.process_sample_code.length > 0 && (
                <div style={error}>{errors.process_sample_code}</div>
              )}
              <div style={error}>{this.state.errormgs}</div>
              <div style={{ height: "12px" }}></div>
            </div>
            <div className='input_wrapper'>
              <label for='processLoad_vechicle_no' className='label'>
                Vechicle No:
              </label>

              <Input
                id='processLoad_vechicle_no'
                name='processLoad_vechicle_no'
                placeholder='Enter the Vechicle No '
                onChange={this.handleChange}
                value={this.state.processLoad_vechicle_no}
              />

              {errors.vechicle_no.length > 0 && (
                <div style={error}>{errors.vechicle_no}</div>
              )}
              {this.state.errormgs.message == "PlantName" ? (
                <div style={error}>{HandelError(this.state.errormgs)}</div>
              ) : (
                ""
              )}

              <div style={{ height: "12px" }}></div>
            </div>

            <div className='input_wrapper'>
              <label for='processLoad_quantity' className='label'>
                Quantity:
              </label>

              <Input
                id='processLoad_quantity'
                name='processLoad_quantity'
                placeholder='Enter the Quantity '
                onChange={this.handleChange}
                value={this.state.processLoad_quantity}
              />

              {errors.quantity.length > 0 && (
                <div style={error}>{errors.quantity}</div>
              )}
              {this.state.errormgs.message == "PlantName" ? (
                <div style={error}>{HandelError(this.state.errormgs)}</div>
              ) : (
                ""
              )}

              <div style={{ height: "12px" }}></div>
            </div>

            <div className='input_wrapper'>
              <label for='processLoad_measurement' className='label'>
                Measurement:
              </label>

              <Input
                id='processLoad_measurement'
                name='processLoad_measurement'
                placeholder='Enter the Measurement '
                onChange={this.handleChange}
                value={this.state.processLoad_measurement}
              />

              {errors.measurement.length > 0 && (
                <div style={error}>{errors.measurement}</div>
              )}
              {this.state.errormgs.message == "PlantName" ? (
                <div style={error}>{HandelError(this.state.errormgs)}</div>
              ) : (
                ""
              )}

              <div style={{ height: "12px" }}></div>
            </div>

            <div className='input_wrapper'>
              <label for='processLoad_dateandtime' className='label'>
                Date:
              </label>

              <DatePicker
                id='processLoad_dateandtime'
                name='processLoad_dateandtime'
                format={"YYYY-MM-DD"}
                style={{ width: 170 }}
                value={this.state.date}
                onChange={(dateString, field) =>
                  this.handleDates("date", dateString, field)
                }
                showToday
              />
              {errors.dateandtime.length > 0 && (
                <div style={error}>{errors.dateandtime}</div>
              )}
              <div style={{ height: "12px" }} />
            </div>

            <div className='input_wrapper'>
              <label for='processLoad_expiry_date' className='label'>
                Expiry Date:
              </label>

              <DatePicker
                id='processLoad_expiry_date'
                name='processLoad_expiry_date'
                format={"YYYY-MM-DD"}
                style={{ width: 170 }}
                value={this.state.date}
                onChange={(dateString, field) =>
                  this.handleDates("dateandtime ", dateString, field)
                }
                showToday
              />
              {errors.expiry_date.length > 0 && (
                <div style={error}>{errors.expiry_date}</div>
              )}
              <div style={{ height: "12px" }} />
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
    setProcessSampleLoadVisiblity: () => {
      dispatch({ type: DISABLE_EDIT_MODE });
      console.log("edit modal closed");
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMaterialLoad);
