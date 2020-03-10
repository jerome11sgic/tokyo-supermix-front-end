import React, { Component } from "react";
import { Input, Modal, Icon, Button, DatePicker, Select } from "antd";

import { PrimaryButton } from "../../styledcomponents/button/button";
import {
  MasterLevelFormTitle,
  MasterLevelForm
} from "../../styledcomponents/form/MasterLevelForms";
import moment from "moment";
import { api } from "../../services/AxiosService";
import Notification from "../../Constant/Notification";
import HandelError from "../../Constant/HandleError";
import { connect } from "react-redux";
import { DISABLE_EDIT_MODE } from "../../../redux/action/master/plantlevel/PlantLevel";

const error = {
  color: "red",
  fontSize: "12px",
  width: "160px",
  height: "0.2px"
};

const { Option } = Select;
class Addincoming extends Component {
  state = {
    loading: false,
    visible: false,
    code: "",
    date: "",
    status: "",
    supplierId: "",
    plantCode: "",
    vehicleNo: "",
    rawMaterialId: "",
    supplierselect: "",

    SelectRaw: "",
    plantName: "",
    supplierName: "",
    rawMaterialName: "",
    edit_plantName: "",
    edit_supplierName: "",
    edit_rawMaterialName: "",
    errors: {
      code: "",
      supplierName: "",
      rawMaterialName: "",
      date: "",
      plantName: ""
    },
    type: "add"
  };

  showModal = () => {
    this.setState({
      visible: true,
      errors: {
        code: "",
        supplierName: "",
        rawMaterialName: "",
        date: "",
        plantName: ""
      },
      code: "",
      date: "",
      status: "",
      supplierId: "",
      plantCode: "",
      vehicleNo: "",
      rawMaterialId: "",
      supplierselect: "",
      SelectPlants: "",
      SelectRaw: "",
      plantName: "",
      supplierName: "",
      rawMaterialName: "",
      edit_plantName: "",
      edit_supplierName: "",
      edit_rawMaterialName: "",
      type: "add"
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      errors: {
        code: "",
        supplierName: "",
        rawMaterialName: "",
        date: "",
        plantName: ""
      },
      code: "",
      date: "",
      status: "",
      supplierId: "",
      plantCode: "",
      vehicleNo: "",
      rawMaterialId: "",
      supplierselect: "",
      SelectPlants: "",
      SelectRaw: "",
      plantName: "",
      supplierName: "",
      rawMaterialName: "",
      edit_plantName: "",
      edit_supplierName: "",
      edit_rawMaterialName: ""
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

      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  handleSelect = (name, value) => {
    console.log(name);
    console.log(value);

    const { errors } = this.state;
    // handle select for  equipment_plant
    if (name === "plant") {
      console.log(value);
      this.setState({
        plantCode: value,
        edit_plantName: value,
        errors: {
          code: errors.code,
          supplierName: errors.supplierName,
          rawMaterialName: errors.rawMaterialName,
          date: errors.date,
          plantName: ""
        }
      });
    }
    // handle select for  supplier
    if (name === "supplier") {
      this.setState({
        supplierId: value,
        edit_supplier: value,
        errors: {
          code: errors.code,
          supplierName: "",
          rawMaterialName: errors.rawMaterialName,
          date: errors.date,
          plantName: errors.plantName
        }
      });
    }
    // handle select for  status
    if (name === "rawMaterial") {
      this.setState({
        rawMaterialId: value,
        edit_rawMaterialName: value,
        errors: {
          code: errors.code,
          supplierName: errors.supplierName,
          rawMaterialName: "",
          date: errors.date,
          plantName: errors.plantName
        }
      });
    }
    // handle select for  radio group
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

  getAllplant() {
    api("GET", "supermix", "/plants", "", "", "").then(res => {
      console.log(res.data.results.plants.length);
      if (res.data.results.plants.length > 0) {
        console.log("ggg");
        let SelectPlants = res.data.results.plants.map((post, index) => {
          return (
            <Option value={post.code} key={index}>
              {post.name}
            </Option>
          );
        });
        this.setState({
          SelectPlants
        });
      }
    });
  }

  getallMaterial = () => {
    console.log("api");
    const datalist = [];
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
          SelectRaw: SelectRaw
        });
      }
    });
  };

  handleSubmit = e => {
    const {
      code,
      supplierName,
      plantName,
      date,
      rawMaterialName,
      errors
    } = this.state;
    let emptyMsg = "can't be empty";
    if (
      code.length === 0 &&
      supplierName.length === 0 &&
      rawMaterialName.length === 0 &&
      plantName.length === 0 &&
      date.length === 0
    ) {
      this.setState({
        errors: {
          code: `code can't be empty`,
          supplierName: `supplier name ${emptyMsg}`,
          rawMaterialName: `raw material name ${emptyMsg}`,
          date: `date ${emptyMsg}`,
          plantName: `plant name ${emptyMsg}`
        }
      });
    } else if (errors.code.length === 0 && code.length === 0) {
      this.setState({
        errors: {
          code: errors.code || `code ${emptyMsg}`,
          supplierName: errors.supplierName,
          rawMaterialName: errors.rawMaterialName,
          date: errors.date,
          plantName: errors.plantName
        }
      });
    } else if (errors.supplierName.length === 0 && supplierName.length === 0) {
      this.setState({
        errors: {
          code: errors.code,
          supplierName: errors.supplierName || `supplier name ${emptyMsg}`,
          rawMaterialName: errors.rawMaterialName,
          date: errors.date,
          plantName: errors.plantName
        }
      });
    } else if (
      errors.rawMaterialName.length === 0 &&
      rawMaterialName.length === 0
    ) {
      this.setState({
        errors: {
          code: errors.code,
          supplierName: errors.supplierName,
          rawMaterialName:
            errors.rawMaterialName || `raw material name ${emptyMsg}`,
          date: errors.date,
          plantName: errors.plantName
        }
      });
    } else if (errors.date.length === 0 && date.length === 0) {
      this.setState({
        errors: {
          code: errors.code,
          supplierName: errors.supplierName,
          rawMaterialName: errors.rawMaterialName,
          date: errors.date || `date ${emptyMsg}`,
          plantName: errors.plantName
        }
      });
    } else if (errors.plantName.length === 0 && plantName.length === 0) {
      this.setState({
        errors: {
          code: errors.code,
          supplierName: errors.supplierName,
          rawMaterialName: errors.rawMaterialName,
          date: errors.date,
          plantName: errors.plantName || `plant name ${emptyMsg}`
        }
      });
    } else if (
      errors.code.length === 0 &&
      errors.supplierName.length === 0 &&
      errors.rawMaterialName.length === 0 &&
      errors.date.length === 0 &&
      errors.plantName.length === 0
    ) {
      if (this.state.type === "edit") {
        const data = {
          code: this.state.code,
          date: this.state.date,
          status: false,
          supplierId: this.state.supplierId,
          plantCode: this.state.plantCode,
          vehicleNo: this.state.vehicleNo,
          rawMaterialId: this.state.rawMaterialId
        };
        console.log("edit part");
        console.log(data);
        api("PUT", "supermix", "/incoming-sample", "", data, "").then(
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
          code: this.state.code,
          date: moment(this.state.date).format("YYYY-MM-DD"),
          status: this.state.status,
          supplierId: this.state.supplierId,
          plantCode: this.state.plantCode,
          vehicleNo: this.state.vehicleNo,
          rawMaterialId: this.state.rawMaterialId
        };
        console.log("hhhhhhhhhhhhhhh");
        console.log(data);
        api("POST", "supermix", "/incoming-sample", "", data, "").then(
          res => {
            console.log(res.data);
            Notification("success", res.data.message);
            this.props.reload();
            this.setState({ loading: true });
            this.setState({
              code: "",
              date: "",
              status: "",
              supplierId: "",
              plantCode: "",
              vehicleNo: "",
              rawMaterialId: ""
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
        code: errors.code,
        supplierName: errors.supplierName,
        rawMaterialName: errors.rawMaterialName,
        date: "",
        plantName: errors.plantName
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log("gggg" + nextProps);
    this.setState({
      visible: nextProps.visible,
      code: nextProps.editPlantData.code,
      vehicleNo: nextProps.editPlantData.vehicleNo,
      date: moment(nextProps.editPlantData.date, "DD-MM-YYYY"),
      status: nextProps.editPlantData.status,
      rawMaterialId: nextProps.editPlantData.rawMaterialId,
      rawMaterialName: nextProps.editPlantData.rawMaterialName,
      plantCode: nextProps.editPlantData.plantCode,
      plantName: nextProps.editPlantData.plantName,
      supplierId: nextProps.editPlantData.supplierId,
      supplierName: nextProps.editPlantData.supplierName,
      edit_plantName: nextProps.editPlantData.plantName,
      edit_supplierName: nextProps.editPlantData.supplierName,
      edit_rawMaterialName: nextProps.editPlantData.rawMaterialName,
      type: nextProps.type
    });
  }
  componentDidMount() {
    this.Selectsupplier();
    this.getAllplant();
    this.getallMaterial();
    console.log(this.props.screen);
  }
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
              Cancel
            </Button>,
            <PrimaryButton
              key='submit'
              loading={loading}
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
                {type === "edit"
                  ? "Edit Incoming Sample"
                  : "Add Incoming Sample"}
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
                Code:llll
              </label>

              <Input
                id='code'
                name='code'
                value={this.state.code}
                onChange={this.handleChange}
                disabled={this.state.type === "edit" ? true : false}
              />
              {errors.code.length > 0 && <div style={error}>{errors.code}</div>}
              <div style={{ height: "12px" }} />
            </div>

            {/* Plant Name */}
            <div className='input_wrapper'>
              <label for='supplierId' className='label'>
                Supplier Name:
              </label>

              <Select
                className='inputfield'
                id='supplierId'
                name='supplierId'
                placeholder='Enter Supplier Name'
                style={{ width: "180px" }}
                value={this.state.edit_supplierName}
                onChange={value => this.handleSelect("supplier", value)}
              >
                {this.state.supplierselect}
              </Select>
              {errors.supplierName.length > 0 && (
                <div style={error}>{errors.supplierName}</div>
              )}
              <div style={{ height: "12px" }} />
            </div>

            {/* Place */}
            <div className='input_wrapper'>
              <label for='rawMaterialId' className='label'>
                Raw Material
              </label>

              <Select
                id='rawMaterialId'
                name='rawMaterialId'
                placeholder=' Raw Material'
                style={{ width: 170 }}
                value={this.state.edit_rawMaterialName}
                onChange={value => this.handleSelect("rawMaterial", value)}
              >
                {this.state.SelectRaw}
              </Select>
              {errors.rawMaterialName.length > 0 && (
                <div style={error}>{errors.rawMaterialName}</div>
              )}
              <div style={{ height: "12px" }} />
            </div>

            {/* T.P No */}
            <div className='input_wrapper'>
              <label for='date' className='label'>
                Delivered Date
              </label>

              <DatePicker
                id='date'
                name='date'
                format={"YYYY-MM-DD"}
                style={{ width: 170 }}
                value={this.state.date}
                onChange={(dateString, field) =>
                  this.handleDates("due_date", dateString, field)
                }
                showToday
              />
              {errors.date.length > 0 && <div style={error}>{errors.date}</div>}
              <div style={{ height: "12px" }} />
            </div>

            {/* Description  */}
            <div className='input_wrapper'>
              <label for='vechical_no' className='label'>
                Vechical No
              </label>

              <Input
                id='vehicleNo'
                name='vehicleNo'
                placeholder='Vechical No'
                value={this.state.vehicleNo}
                onChange={this.handleChange}
              />
              <div style={{ height: "12px" }} />
            </div>

            <div className='input_wrapper'>
              <label for='description' className='label'>
                Plant
              </label>
              <Select
                id='plant'
                name='plant'
                placeholder='plant'
                value={this.state.edit_plantName}
                onChange={value => this.handleSelect("plant", value)}
                style={{ width: 170 }}
              >
                {this.state.SelectPlants}
              </Select>
              {errors.plantName.length > 0 && (
                <div style={error}>{errors.plantName}</div>
              )}
              <div style={{ height: "12px" }} />
            </div>
            <div className='input_wrapper'>
              <label for='status' className='label'>
                Status
              </label>

              <Input
                id='status'
                name='status'
                placeholder='status'
                value={this.state.status}
                onChange={this.handleChange}
                disabled
              />
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
    setincomingVisibility: () => {
      dispatch({ type: DISABLE_EDIT_MODE });
      console.log("edit modal closed");
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Addincoming);
