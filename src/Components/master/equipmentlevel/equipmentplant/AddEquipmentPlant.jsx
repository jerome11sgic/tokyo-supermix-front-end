import React, { Component } from "react";
import { Input, Modal, Icon, Button, Select } from "antd";

import { PrimaryButton } from "../../../styledcomponents/button/button";
import {
  MasterLevelFormTitle,
  MasterLevelForm
} from "../../../styledcomponents/form/MasterLevelForms";
import { connect } from "react-redux";
import { DISABLE_EDIT_MODE } from "../../../../redux/action/master/plantlevel/PlantLevel";
import Notification from "../../../Constant/Notification";
import HandelError from "../../../Constant/HandleError";
import { api } from "../../../services/AxiosService";
import TextArea from "antd/lib/input/TextArea";

const error = {
  color: "red",
  fontSize: "12px",
  width: "160px",
  height: "0.2px"
};

const { Option } = Select;

class AddEquipmentPlant extends Component {
  state = {
    loading: false,
    visible: false,
    formValid: false,
    errorCount: 0,
    errors: {
      serial: "",
      equipment: "",
      plant: "",
      brand: "",
      model: ""
    },
    serial_no: "",
    equipment: "",
    plant: "",
    brand_name: "",
    model_name: "",
    description: "",
    errormgs: "",
    type: "add"
  };

  showModal = () => {
    this.setState({
      visible: true,
      formValid: false,
      errorCount: 0,
      errors: {
        serial: "",
        equipment: "",
        plant: "",
        brand: "",
        model: ""
      },
      serial_no: "",
      equipment: "",
      plant: "",
      brand_name: "",
      model_name: "",
      description: "",
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
      case "serial_no":
        errors.serial =
          value.length === 0
            ? "Serial No can't be empty"
            : value.length < 3
            ? "Serial No \n must be 3 characters long!"
            : !isNaN(value)
            ? "Serial No won't allow only letters"
            : "";
        break;
      case "brand_name":
        errors.brand =
          value.length === 0
            ? "Brand Name can't be empty"
            : value.length < 3
            ? "Brand Name must be 3 characters long!"
            : !isNaN(value)
            ? "Brand Name won't allow only letters"
            : "";
        break;
      case "model_name":
        errors.model =
          value.length === 0
            ? "Model Name can't be empty"
            : value.length < 3
            ? "Model Name must be 3 characters long!"
            : !isNaN(value)
            ? "Model Name won't allow only letters"
            : "";
        break;

      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  // handling for select or dropdown
  handleSelect = (name, value) => {
    console.log(name);
    console.log(value);
    // handle select for  plant
    if (name === "plant") {
      this.setState({
        plant: value
      });

      if (value.length !== 0) {
        this.setState({
          errors: {
            serial: this.state.errors.serial,
            equipment: this.state.errors.equipment,
            plant: "",
            brand: this.state.errors.brand,
            model: this.state.errors.model
          },
          formValid: this.validateForm(this.state.errors),
          errorCount: this.countErrors(this.state.errors)
        });
      }
    }

    if (name === "equipment") {
      this.setState({
        equipment: value
      });

      if (value.length !== 0) {
        this.setState({
          errors: {
            serial: this.state.errors.serial,
            equipment: "",
            plant: this.state.errors.plant,
            brand: this.state.errors.brand,
            model: this.state.errors.model
          },
          formValid: this.validateForm(this.state.errors),
          errorCount: this.countErrors(this.state.errors)
        });
      }
    }
  };

  handleSubmit = e => {
    const {
      errors,
      serial_no,
      equipment,
      plant,
      model_name,
      brand_name,
      description
    } = this.state;
    e.preventDefault();
    if (
      serial_no.length === 0 &&
      equipment.length === 0 &&
      plant.length === 0 &&
      model_name.length === 0 &&
      brand_name.length === 0
    ) {
      this.setState({
        errors: {
          serial: "Serial No can't be empty",
          equipment: "Equipment can't be empty",
          plant: "Plant can't be empty",
          brand: "Brand can't be empty",
          model: "Model can't be empty"
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (serial_no.length === 0 && errors.serial.length === 0) {
      this.setState({
        errors: {
          serial: errors.serial || "Serial No can't be empty",
          equipment: errors.equipment,
          plant: errors.plant,
          brand: errors.brand,
          model: errors.model
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (equipment.length === 0 && errors.equipment.length === 0) {
      this.setState({
        errors: {
          serial: errors.serial,
          equipment: errors.equipment || "Equipment can't be empty",
          plant: errors.plant,
          brand: errors.brand,
          model: errors.model
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (plant.length === 0 && errors.plant.length === 0) {
      this.setState({
        errors: {
          serial: errors.serial,
          equipment: errors.equipment,
          plant: errors.plant || "Plant can't be empty",
          brand: errors.brand,
          model: errors.model
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (brand_name.length === 0 && errors.brand.length === 0) {
      this.setState({
        errors: {
          serial: errors.serial,
          equipment: errors.equipment,
          plant: errors.plant,
          brand: errors.brand || "Brand can't be empty",
          model: errors.model
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (model_name.length === 0 && errors.model.length === 0) {
      this.setState({
        errors: {
          serial: errors.serial,
          equipment: errors.equipment,
          plant: errors.plant,
          brand: errors.brand,
          model: errors.model || "Model can't be empty"
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      errors.serial.length === 0 &&
      errors.equipment.length === 0 &&
      errors.plant.length === 0 &&
      errors.brand.length === 0 &&
      errors.model.length === 0
    ) {
      this.setState({ formValid: this.validateForm(this.state.errors) });
      this.setState({ errorCount: this.countErrors(this.state.errors) });
      console.log("form is valid");
      const data = {
        serialNo: serial_no,
        equipmentId: equipment,
        plantCode: plant,
        brandName: brand_name,
        modelName: model_name,
        description: description
      };
      console.log(data);
      console.log(this.state.type);
      if (this.state.type === "add") {
        api("POST", "supermix", "/plantequipment", "", data, "")
          .then(
            res => {
              console.log(res.data);
              if (res.data.status === "VALIDATION_FAILURE") {
                console.log("add");
                this.responeserror(res.data.results.name.message);
              } else {
                Notification("success", res.data.message);
                // this.props.reload();

                this.setState({
                  loading: true,
                  errormgs: "",
                  serial_no: "",
                  equipment: "",
                  plant: "",
                  brand_name: "",
                  model_name: "",
                  description: "",
                  errors: {
                    serial: "",
                    equipment: "",
                    plant: "",
                    brand: "",
                    model: ""
                  }
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
            this.setState({
              // errormgs: "Plant Name Exist"
            });
            console.log(error);
          });
      } else {
        const data = {
          serialNo: serial_no,
          equipmentId: equipment,
          plantCode: plant,
          brandName: brand_name,
          modelName: model_name,
          description: description
        };
        console.log(this.state.type);
        api("PUT", "supermix", "/plantequipment", "", data, "")
          .then(
            res => {
              console.log(res.data);

              if (res.data.status === "VALIDATION_FAILURE") {
                console.log("update");
                this.responeserror(res.data.results.name.message);
              } else {
                Notification("success", res.data.message);
                // this.props.reload();

                this.setState({
                  loading: true,
                  errormgs: "",
                  serial_no: "",
                  equipment: "",
                  plant: "",
                  brand_name: "",
                  model_name: "",
                  description: "",
                  errors: {
                    serial: "",
                    equipment: "",
                    plant: "",
                    brand: "",
                    model: ""
                  }
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
            // this.setState({
            //   errormgs: "Plant Name Exist"
            // });
            // console.log(error.response.data);
          });
      }
      // this.setState({
      //   loading: true,
      //   serial_no: "",
      //   equipment: "",
      //   plant: "",
      //   brand_name: "",
      //   model_name: "",
      //   errors: {
      //     serial: "",
      //     equipment: "",
      //     plant: "",
      //     brand: "",
      //     model: ""
      //   }
      // });
      // setTimeout(() => {
      //   this.setState({ loading: false, visible: false });
      // }, 1500);
    }
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.visible,
      serial_no: nextProps.editPlantData.serialNo,
      equipment: nextProps.editPlantData.equipmentName,
      plant: nextProps.editPlantData.plantName,
      model_name: nextProps.editPlantData.modelName,
      brand_name: nextProps.editPlantData.brandName,
      description: nextProps.editPlantData.description,
      type: nextProps.type
    });
  }

  componentDidMount() {
    this.getAllEquipments();
    this.getAllPlants();
  }

  //dropdown data for plant
  getAllPlants() {
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

  //dropdown data for plant
  getAllEquipments() {
    api("GET", "supermix", "/equipments", "", "", "").then(res => {
      console.log(res.data.results);
      if (res.data.results.equipments.length > 0) {
        console.log("ggg");
        let SelectEquipments = res.data.results.equipments.map(
          (post, index) => {
            return (
              <Option value={post.id} key={index}>
                {post.name}
              </Option>
            );
          }
        );
        this.setState({
          SelectEquipments
        });
      }
    });
  }

  handleCancel = () => {
    if (this.state.type === "edit") {
      // we call the redux function to dispatch and delete all the global redux state to close the modal
      this.props.setEquipmentPlantVisiblity();
    }
    this.setState({
      visible: false,
      errormgs: "",
      serial_no: "",
      equipment: "",
      plant: "",
      brand_name: "",
      model_name: "",
      description: "",
      errors: {
        serial: "",
        equipment: "",
        plant: "",
        brand: "",
        model: ""
      }
    });
  };

  render() {
    const {
      visible,
      loading,
      plant,
      model_name,
      brand_name,
      serial_no,
      equipment,
      description,
      errors
    } = this.state;

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
          Add Equipment Plant
        </PrimaryButton>
        <Modal
          width='480px'
          visible={visible}
          closable={false}
          onCancel={this.handleCancel}
          footer={[
            <Button key='back' onClick={this.handleCancel}>
              Cancel
            </Button>,
            <PrimaryButton
              key='submit'
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
                  ? "Edit Equipment Plant"
                  : "Add Equipment Plant"}
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
            {/* <Icon type="close-circle" onClick={this.handleCancel} style={{marginLeft:'300px',marginTop:'-65px',color:'white'}}/> */}

            {/* Code */}

            <div className='input_wrapper'>
              <label for='serial_no' className='label'>
                Serial No:
              </label>
              <Input
                id='serial_no'
                name='serial_no'
                placeholder='Enter Serial No '
                value={serial_no}
                onChange={this.handleChange}
              />
              {errors.serial.length > 0 && (
                <div style={error}>{errors.serial}</div>
              )}
              <div style={{ height: "8px" }}></div>
            </div>

            {/* User Role */}
            <div className='input_wrapper'>
              <label for='equipment' className='label'>
                Equipment :
              </label>

              <Select
                id='equipment'
                name='equipment'
                placeholder='Select Equipment'
                style={{ width: 170 }}
                value={equipment}
                onChange={value => this.handleSelect("equipment", value)}
              >
                {this.state.SelectEquipments}
                {/* <Option value={1}>Equipment 01</Option>
                <Option value={2}>Equipment 02</Option> */}
              </Select>
              {errors.equipment.length > 0 && (
                <div style={error}>{errors.equipment}</div>
              )}
              <div style={{ height: "8px" }}></div>
            </div>

            <div className='input_wrapper'>
              <label for='plant' className='label'>
                Plant :
              </label>

              <Select
                id='plant'
                name='plant'
                placeholder='Select Plant'
                style={{ width: 170 }}
                value={plant}
                onChange={value => this.handleSelect("plant", value)}
              >
                {this.state.SelectPlants}
                {/* <Option value='p01'>Plant 01</Option>
                <Option value='p02'>Plant 02</Option> */}
              </Select>
              {errors.plant.length > 0 && (
                <div style={error}>{errors.plant}</div>
              )}
              <div style={{ height: "8px" }}></div>
            </div>

            <div className='input_wrapper'>
              <label for='brand_name' className='label'>
                Brand Name:
              </label>

              <Input
                id='brand_name'
                name='brand_name'
                placeholder='Enter Brand Name'
                value={brand_name}
                onChange={this.handleChange}
              />
              {errors.brand.length > 0 && (
                <div style={error}>{errors.brand}</div>
              )}
              <div style={{ height: "2px" }}></div>
            </div>
            <div className='input_wrapper'>
              <label for='model_name' className='label'>
                Model Name:
              </label>

              <Input
                id='model_name'
                name='model_name'
                placeholder='Enter Model Name'
                value={model_name}
                onChange={this.handleChange}
              />
              {errors.model.length > 0 && (
                <div style={error}>{errors.model}</div>
              )}
              <div style={{ height: "10px" }}></div>
            </div>

            {/* Description */}
            <div className='input_wrapper'>
              <label for='description' className='label'>
                Description:
              </label>
              <TextArea
                id='description'
                name='description'
                placeholder='Enter Description'
                value={description}
                onChange={this.handleChange}
                style={{ width: "170px" }}
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
    setEquipmentPlantVisiblity: () => {
      dispatch({ type: DISABLE_EDIT_MODE });
      console.log("edit modal closed");
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEquipmentPlant);
