import React, { Component } from "react";
import {
  Input,
  DatePicker,
  Modal,
  Button,
  Icon,
  Radio,
  Form,
  Select
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import { PrimaryButton } from "../../../styledcomponents/button/button";
import {
  MasterLevelFormTitle,
  MasterLevelForm
} from "../../../styledcomponents/form/MasterLevelForms";
import { api } from "../../../services/AxiosService";
import Notification from "../../../Constant/Notification";
import HandelError from "../../../Constant/HandleError";
import { connect } from "react-redux";
import { DISABLE_EDIT_MODE } from "../../../../redux/action/master/plantlevel/PlantLevel";

const error = {
  color: "red",
  fontSize: "12px",
  width: "160px",
  height: "0.2px"
};

const { Option } = Select;

class AddCalibrationForm extends Component {
  state = {
    loading: false,
    visible: false,
    formValid: false,
    errorCount: 0,
    errors: {
      equipment_plant: "",
      // calibrated_date: "",
      // due_date: "",
      calibrated_by: "",
      supplier: "",
      tester: "",
      status: ""
    },
    equipment_plant: "",
    calibrated_date: "",
    due_date: "",
    calibrated_by: "",
    supplier: "",
    tester: "",
    description: "",
    status: "",
    errormgs: "",
    edit_equipment_plant: "",
    edit_supplier: "",
    type: "add"
  };

  showModal = () => {
    this.setState({
      visible: true,
      formValid: false,
      errorCount: 0,
      errors: {
        equipment_plant: "",
        calibrated_date: "",
        due_date: "",
        calibrated_by: "",
        // supplier: "",
        // tester: "",
        status: ""
      },
      id: "",
      equipment_plant: "",
      calibrated_date: "",
      due_date: "",
      calibrated_by: "",
      supplier: "",
      tester: "",
      description: "",
      status: "",
      errormgs: "",
      type: "add"
    });
  };

  //validators
  validateForm = errors => {
    let valid;
    Object.values(errors).forEach(
      val => val.length > 0 && (valid = false),
      (valid = true)
    );
    return valid;
  };

  countErrors = errors => {
    let count = 0;
    Object.values(errors).forEach(val => val.length > 0 && (count = count + 1));
    return count;
  };

  handleChange = (event, field) => {
    this.setState({ [field]: event.target.value });
    this.setState({ errormgs: "" });
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    // console.log(name + " is \t" + value);
    switch (name) {
      // case "tester":
      //   errors.tester =
      //     value.length === 0
      //       ? "Tester can't be empty"
      //       : value.length < 3
      //       ? "Tester \n must be 3 characters long!"
      //       : !isNaN(value)
      //       ? "Tester Plant won't allow only letters"
      //       : "";
      //   break;

      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  // handling for select or dropdown
  handleSelect = (name, value) => {
    console.log(name);
    console.log(value);

    const { errors } = this.state;
    // handle select for  equipment_plant
    if (name === "equipment_plant") {
      console.log(value);
      this.setState({
        equipment_plant: value,
        edit_equipment_plant: value
      });
      if (value.length !== 0) {
        this.setState({
          errors: {
            equipment_plant: "",
            // calibrated_date: errors.calibrated_date,
            // due_date: errors.due_date,
            calibrated_by: errors.calibrated_by,
            // supplier: errors.supplier
            // tester: errors.tester,
            status: errors.status
          },
          formValid: this.validateForm(errors),
          errorCount: this.countErrors(errors)
        });
      }
    }
    // handle select for  supplier
    if (name === "supplier") {
      this.setState({
        supplier: value,
        edit_supplier: value
      });
      // if (value.length !== 0) {
      //   this.setState({
      //     errors: {
      //       equipment_plant: errors.equipment_plant,
      //       // calibrated_date: errors.calibrated_date,
      //       // due_date: errors.due_date,
      //       calibrated_by: errors.calibrated_by,
      //       supplier: "",
      //       tester: errors.tester,
      //       status: errors.status
      //     },
      //     formValid: this.validateForm(errors),
      //     errorCount: this.countErrors(errors)
      //   });
      // }
    }
    // handle select for  status
    if (name === "status") {
      this.setState({
        status: value
      });
      if (value.length !== 0) {
        this.setState({
          errors: {
            equipment_plant: errors.equipment_plant,
            // calibrated_date: errors.calibrated_date,
            // due_date: errors.due_date,
            calibrated_by: errors.calibrated_by,
            // supplier: errors.supplier,
            // tester: errors.tester,
            status: ""
          },
          formValid: this.validateForm(errors),
          errorCount: this.countErrors(errors)
        });
      }
    }
    // handle select for  radio group
    if (name === "calibrated_by") {
      this.setState({
        calibrated_by: value.target.value
      });
      if (value.length !== 0) {
        this.setState({
          errors: {
            equipment_plant: errors.equipment_plant,
            // calibrated_date: errors.calibrated_date,
            // due_date: errors.due_date,
            calibrated_by: "",
            // supplier: errors.supplier,
            // tester: errors.tester,
            status: errors.status
          },
          formValid: this.validateForm(errors),
          errorCount: this.countErrors(errors)
        });
      }
    }
  };

  handleDates(name, dateString, field) {
    console.log(name);
    console.log(dateString);
    console.log(field);
    let convertedDate = moment(dateString).format("DD-MM-YYYY");
    console.log(convertedDate);
    if (name === "due_date") {
      this.setState({
        due_date: dateString
      });
    }
    if (name === "calibrated_date") {
      this.setState({
        calibrated_date: dateString
      });
    }
  }

  handleCancel = () => {
    if (this.state.type === "edit") {
      this.props.setCalibrationVisibility();
    }
    this.setState({
      visible: false,
      errors: {
        equipment_plant: "",
        calibrated_by: "",
        status: ""
      },
      equipment_plant: "",
      calibrated_date: "",
      due_date: "",
      calibrated_by: "",
      supplier: "",
      tester: "",
      description: "",
      status: "",
      errormgs: "",
      type: ""
    });
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.visible,
      equipment_plant: nextProps.editPlantData.plantEquipmentEquipmentName,
      calibrated_date: moment(
        nextProps.editPlantData.calibratedDate,
        "DD-MM-YYYY"
      ),
      id: nextProps.editPlantData.id,
      due_date: moment(nextProps.editPlantData.dueDate, "DD-MM-YYYY"),
      calibrated_by: nextProps.editPlantData.calibrationType,
      edit_supplier: nextProps.editPlantData.supplierName,
      tester: nextProps.editPlantData.userId,
      description: nextProps.editPlantData.description,
      status: nextProps.editPlantData.status,
      equipment_plant: nextProps.editPlantData.plantEquipmentSerialNo,
      edit_equipment_plant: nextProps.editPlantData.plantEquipmentEquipmentName,
      supplier: nextProps.editPlantData.supplierId,
      type: nextProps.type
    });
  }
  componentDidMount() {
    this.Selectequipmantplant();
    this.Selectsupplier();
  }
  handleSubmit = e => {
    e.preventDefault();
    const {
      errors,
      equipment_plant,
      calibrated_by,
      calibrated_date,
      description,
      due_date,
      status,
      supplier,
      tester
    } = this.state;
    if (
      equipment_plant.length === 0 &&
      calibrated_by.length === 0 &&
      status.length === 0
    ) {
      this.setState({
        errors: {
          equipment_plant: "Equipment Plant can't be empty",
          calibrated_by: "Calibrated By can't be empty",
          status: "Status can't be empty"
        },
        formValid: this.validateForm(errors),
        errorCount: this.countErrors(errors)
      });
    } else if (
      equipment_plant.length === 0 &&
      errors.equipment_plant.length === 0
    ) {
      this.setState({
        errors: {
          equipment_plant:
            errors.equipment_plant || "Equipment Plant can't be empty",
          calibrated_by: errors.calibrated_by,
          status: errors.status
        },
        formValid: this.validateForm(errors),
        errorCount: this.countErrors(errors)
      });
    } else if (
      calibrated_by.length === 0 &&
      errors.calibrated_by.length === 0
    ) {
      this.setState({
        errors: {
          equipment_plant: errors.equipment_plant,
          calibrated_by: errors.calibrated_by || "Calibrated By can't be empty",
          status: errors.status
        },
        formValid: this.validateForm(errors),
        errorCount: this.countErrors(errors)
      });
    } else if (status.length === 0 && errors.status.length === 0) {
      this.setState({
        errors: {
          equipment_plant: errors.equipment_plant,
          calibrated_by: errors.calibrated_by,
          status: errors.status || "Status can't be empty"
        },
        formValid: this.validateForm(errors),
        errorCount: this.countErrors(errors)
      });
    } else if (
      errors.equipment_plant.length === 0 &&
      errors.calibrated_by.length === 0 &&
      errors.status.length === 0
    ) {
      console.log("form is valid");

      if (this.state.type === "edit") {
        console.log("edit part");
        const data = {
          id: this.state.id,
          plantEquipmentSerialNo: equipment_plant,
          calibratedDate: moment(calibrated_date).format("YYYY-MM-DD"),
          dueDate: moment(due_date).format("YYYY-MM-DD"),
          calibrationType: calibrated_by,
          supplierId: supplier,
          userId: tester,
          description: description,
          status: status
        };
        console.log(data);
        api(
          "PUT",
          "supermix",
          "/plant-equipment-calibration",
          "",
          data,
          ""
        ).then(
          res => {
            console.log(res.data);

            Notification("success", res.data.message);
            this.props.reload();
            this.setState({ loading: true });
            this.setState({
              equipment_plant: "",
              calibrated_date: "",
              due_date: "",
              calibrated_by: "",
              supplier: "",
              tester: "",
              description: "",
              status: "",
              errormgs: ""
            });
            setTimeout(() => {
              this.setState({ loading: false, visible: false });
            }, 3000);
          },
          error => {
            // this.setState({
            //   errormgs: error.validationFailures[0]
            // });
            console.log("DEBUG34: ", error);
            // console.log(HandelError(error.validationFailures[0]));
          }
        );
      } else {
        const data = {
          plantEquipmentSerialNo: equipment_plant,
          calibratedDate: moment(calibrated_date).format("YYYY-MM-DD"),
          dueDate: moment(due_date).format("YYYY-MM-DD"),
          calibrationType: calibrated_by,
          supplierId: supplier,
          userId: 1,
          description: description,
          status: status
        };
        console.log("hhhhhhhhhhhhhhh");

        console.log(data);
        api(
          "POST",
          "supermix",
          "/plant-equipment-calibration",
          "",
          data,
          ""
        ).then(
          res => {
            console.log(res.data);

            Notification("success", res.data.message);
            this.props.reload();
            this.setState({ loading: true });
            this.setState({
              equipment_plant: "",
              calibrated_date: "",
              due_date: "",
              calibrated_by: "",
              supplier: "",
              tester: "",
              description: "",
              status: "",
              errormgs: ""
            });
            setTimeout(() => {
              this.setState({ loading: false, visible: false });
            }, 3000);
          },
          error => {
            // this.setState({
            //   errormgs: error.validationFailures[0]
            // });
            console.log("DEBUG34: ", error);
            // console.log(HandelError(error.validationFailures[0]));
          }
        );
      }
    }
  };

  //restrict date
  disabledDate = current => {
    // Can not select days before today and today
    return current && current.valueOf() < Date.now();
  };

  Selectequipmantplant = () => {
    api("GET", "supermix", "/plantequipments", "", "", "").then(res => {
      console.log(res.data);

      console.log("kkkkkkkkkk");
      let equipmantplantselect = res.data.results.Plantequipments.map(
        (post, index) => {
          return (
            <Option value={post.serialNo} key={index}>
              {post.serialNo}
            </Option>
          );
        }
      );
      this.setState({
        equipmantplantselect
      });
    });
  };

  Selectsupplier = () => {
    api("GET", "supermix", "/suppliers", "", "", "").then(res => {
      console.log(res.data);

      if (res.data.results.Supplier.length > 0) {
        let supplierselect = res.data.results.Supplier.map((post, index) => {
          console.log(post.name);
          console.log("kkkkkkkkkk");
          return (
            <Option value={post.id} key={index}>
              {post.name}
            </Option>
          );
        });
        this.setState({
          supplierselect
        });
      }
    });
  };

  render() {
    const {
      visible,
      loading,
      errors,
      errorCount,
      equipment_plant,
      edit_equipment_plant,
      edit_supplier,
      calibrated_by,
      calibrated_date,
      description,
      due_date,
      status,
      supplier,
      tester
    } = this.state;
    console.log(errorCount);

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
          Add Calibration
        </PrimaryButton>
        <Modal
          width="800px"
          visible={visible}
          closable={false}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <PrimaryButton
              key="submit"
              loading={loading}
              onClick={e => this.handleSubmit(e)}
              style={{ background: "#001328", color: "white", border: "none" }}
            >
              {this.state.type === "edit" ? "Edit" : "Save"}
            </PrimaryButton>
          ]}
          title={
            <MasterLevelFormTitle>
              <p
                style={{
                  color: "white"
                }}
              >
                {this.state.type === "edit"
                  ? "Edit Equipment Calibration"
                  : " Add Equipment Calibration"}
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
            {/* <Icon type="close-circle" onClick={this.handleCancel} style={{marginLeft:'300px',marginTop:'-65px',color:'white'}}/> */}

            {/* Code */}
            {this.state.type === "edit" ? (
              <div className="input_wrapper">
                <label for="code" className="label">
                  Code:
                </label>
                <Input
                  id="code"
                  name="code"
                  value={this.state.id}
                  disabled
                  placeholder="Enter the Code "
                />
                <div style={{ height: "12px" }}></div>
              </div>
            ) : (
              ""
            )}

            {/* User Role */}
            <div className="input_wrapper">
              <label for="equipment_plant" className="label">
                Equipment Plant:
              </label>

              <Select
                id="equipment_plant"
                name="equipment_plant"
                placeholder="Select Equipment Plant"
                style={{ width: 170 }}
                value={edit_equipment_plant}
                onChange={value => this.handleSelect("equipment_plant", value)}
              >
                {/* <Option value="eq01">Equipment 01</Option>
                <Option value="eq02">Equipment 02</Option> */}
                {this.state.equipmantplantselect}
              </Select>
              {errors.equipment_plant.length > 0 && (
                <div style={error}>{errors.equipment_plant}</div>
              )}
              <div style={{ height: "12px" }}></div>
            </div>

            <div className="input_wrapper">
              <label for="calibrated_date" className="label">
                Calibrated Date:
              </label>
              <DatePicker
                id="calibrated_date"
                name="calibrated_date"
                format={"DD-MM-YYYY"}
                showToday
                disabledDate={this.disabledDate()}
                value={calibrated_date}
                onChange={(dateString, field) =>
                  this.handleDates("calibrated_date", dateString, field)
                }
                // disabledTime={() => Date.now()}
              />
              <div style={{ height: "12px" }}></div>
            </div>
            <div className="input_wrapper">
              <label for="due_date" className="label">
                Due Date:
              </label>
              <DatePicker
                id="due_date"
                name="due_date"
                format={"DD-MM-YYYY"}
                value={due_date}
                onChange={(dateString, field) =>
                  this.handleDates("due_date", dateString, field)
                }
                showToday
              />

              <div style={{ height: "12px" }}></div>
            </div>
            <div className="input_wrapper">
              <label for="calibrated_by" className="label">
                Calibrated By:
              </label>
              <Radio.Group
                id="calibrated_by"
                name="calibrated_by"
                value={calibrated_by}
                checked={calibrated_by}
                onChange={value => this.handleSelect("calibrated_by", value)}
              >
                <Radio value="INTERNAL">Internal </Radio>
                <Radio value="EXTERNAL">External</Radio>
              </Radio.Group>
              {errors.calibrated_by.length > 0 && (
                <div style={error}>{errors.calibrated_by}</div>
              )}
              <div style={{ height: "12px" }}></div>
            </div>
            {this.state.calibrated_by === "EXTERNAL" ? (
              <div className="input_wrapper">
                <label
                  for="supplier"
                  className="label"
                  style={{ left: "20px" }}
                >
                  Supplier:
                </label>

                <Select
                  id="supplier"
                  name="supplier"
                  placeholder="Select Supplier"
                  style={{ width: 170 }}
                  value={edit_supplier}
                  onChange={value => this.handleSelect("supplier", value)}
                >
                  {/* <Option value="s01">Supplier 01</Option>
                <Option value="s02">Supplier 02</Option> */}
                  {this.state.supplierselect}
                </Select>
                {/* {errors.supplier.length > 0 && (
                  <div style={error}>{errors.supplier}</div>
                )} */}
                <div style={{ height: "12px" }}></div>
              </div>
            ) : (
              ""
            )}
            {this.state.calibrated_by === "INTERNAL" ? (
              <div className="input_wrapper">
                <label for="tester" className="label">
                  Tester:
                </label>
                <Input
                  id="tester"
                  name="tester"
                  placeholder="Enter Tester"
                  value={tester}
                  onChange={this.handleChange}
                />
                {/* {errors.tester.length > 0 && (
                  <div style={error}>{errors.tester}</div>
                )} */}
                <div style={{ height: "12px" }}></div>
              </div>
            ) : (
              ""
            )}
            <div className="input_wrapper">
              <label for="description" className="label">
                Description:
              </label>
              <TextArea
                id="description"
                name="description"
                placeholder="Enter Description"
                style={{ width: "400px" }}
                value={this.state.description}
                onChange={this.handleChange}
              />
            </div>
            <div className="input_wrapper">
              <label for="status" className="label">
                Status:
              </label>
              <Select
                id="status"
                name="status"
                placeholder="Select Status"
                style={{ width: 170 }}
                value={status}
                onChange={value => this.handleSelect("status", value)}
              >
                <Option value="pass">pass</Option>
                <Option value="fail">fail</Option>
                <Option value="pending">pending</Option>
              </Select>
              {errors.status.length > 0 && (
                <div style={error}>{errors.status}</div>
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
    setCalibrationVisibility: () => {
      dispatch({ type: DISABLE_EDIT_MODE });
      console.log("edit modal closed");
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCalibrationForm);
