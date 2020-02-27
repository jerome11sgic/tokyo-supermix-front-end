import React, { Component } from "react";
import { Input, Modal, Button, Icon, Select, Form } from "antd";

import { PrimaryButton } from "../../../styledcomponents/button/button";
import {
  MasterLevelFormTitle,
  MasterLevelForm
} from "../../../styledcomponents/form/MasterLevelForms";
import { connect } from "react-redux";
import { DISABLE_EDIT_MODE } from "../../../../redux/action/master/plantlevel/PlantLevel";

const error = {
  color: "red",
  fontSize: "12px",
  width: "160px",
  height: "0.2px"
};

const Option = Select;
class MaterialMasterAddForm extends Component {
  state = {
    loading: false,
    visible: false,
    formValid: false,
    errorCount: 0,
    errors: {
      material_category: "",
      sub_category: "",
      material_name: ""
    },
    code: "",
    material_category: "",
    sub_category: "",
    material_name: "",
    errormgs: "",
    type: "add"
  };
  showModal = () => {
    this.setState({
      visible: true
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
      case "material_name":
        errors.material_name =
          value.length === 0
            ? "Name can't be empty"
            : value.length < 3
            ? "Name \n must be 3 characters long!"
            : !isNaN(value)
            ? "Name won't allow only letters"
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

    const { errors } = this.state;
    // handle select for material_category
    if (name === "material_category") {
      this.setState({
        material_category: value
      });
      if (value.length !== 0) {
        this.setState({
          errors: {
            material_category: "",
            sub_category: errors.sub_category,
            material_name: errors.material_name
          },
          formValid: this.validateForm(errors),
          errorCount: this.countErrors(errors)
        });
      }
    }
    // handle select for sub_category
    if (name === "sub_category") {
      this.setState({
        sub_category: value
      });
      if (value.length !== 0) {
        this.setState({
          errors: {
            material_category: errors.material_category,
            sub_category: "",
            material_name: errors.material_name
          },
          formValid: this.validateForm(errors),
          errorCount: this.countErrors(errors)
        });
      }
    }
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      errors: {
        material_category: "",
        sub_category: "",
        material_name: ""
      },
      material_category: "",
      sub_category: "",
      material_name: "",
      errormgs: "",
      type: "add"
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      visible,
      loading,
      type,
      errors,
      material_category,
      sub_category,
      material_name
    } = this.state;
    if (
      material_category.length === 0 &&
      sub_category.length === 0 &&
      material_name.length === 0
    ) {
      this.setState({
        errors: {
          material_category: "Material Category can't be empty",
          sub_category: "Sub Category can't be empty",
          material_name: "Name can't be empty"
        },
        formValid: this.validateForm(errors),
        errorCount: this.countErrors(errors)
      });
    } else if (
      material_category.length === 0 &&
      errors.material_category.length === 0
    ) {
      this.setState({
        errors: {
          material_category:
            errors.material_category || "Material Category can't be empty",
          sub_category: errors.sub_category,
          material_name: errors.material_name
        },
        formValid: this.validateForm(errors),
        errorCount: this.countErrors(errors)
      });
    } else if (sub_category.length === 0 && errors.sub_category.length === 0) {
      this.setState({
        errors: {
          material_category: errors.material_category,
          sub_category: errors.sub_category || "Sub Category can't be empty",
          material_name: errors.material_name
        },
        formValid: this.validateForm(errors),
        errorCount: this.countErrors(errors)
      });
    } else if (
      material_name.length === 0 &&
      errors.material_name.length === 0
    ) {
      this.setState({
        errors: {
          material_category: errors.material_category,
          sub_category: errors.sub_category,
          material_name: errors.material_name || "Name can't be empty"
        },
        formValid: this.validateForm(errors),
        errorCount: this.countErrors(errors)
      });
    } else if (
      errors.material_category.length === 0 &&
      errors.sub_category.length === 0 &&
      errors.material_name.length === 0
    ) {
      console.log("form is valid");
    }
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.visible,
      code: nextProps.editPlantData.code,
      material_category: nextProps.editPlantData.materialCategory,
      sub_category: nextProps.editPlantData.subCategory,
      material_name: nextProps.editPlantData.materialName,
      type: nextProps.type
    });
  }

  render() {
    const {
      visible,
      loading,
      type,
      errors,
      code,
      material_category,
      sub_category,
      material_name
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
          Add Material
        </PrimaryButton>
        <Modal
          width='500px'
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
              onClick={e => this.handleSubmit(e)}
              style={{ background: "#001328", color: "white", border: "none" }}
            >
              {this.state.type === "edit" ? "Edit " : "Save "}
            </PrimaryButton>
          ]}
          title={
            <MasterLevelFormTitle>
              <p
                style={{
                  color: "white"
                }}
              >
                {this.state.type === "edit" ? "Edit Material" : "Add Material"}
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
            {type === "edit" ? (
              <div className='input_wrapper'>
                <label for='code' className='label'>
                  Code:
                </label>

                <Input
                  id='code'
                  name='code'
                  placeholder='Enter the Code '
                  value={code}
                  disabled
                />
                <div style={{ height: "12px" }}></div>
              </div>
            ) : (
              ""
            )}

            {/* Plant Name */}

            {/* Place */}
            <div className='input_wrapper'>
              <label for='material_category' className='label'>
                Material Category:
              </label>

              <Select
                placeholder='Select material Category'
                id='material_category'
                name='material_category '
                value={material_category}
                onChange={value =>
                  this.handleSelect("material_category", value)
                }
                style={{ width: 170 }}
              >
                <Option value='mc01'>M C 01</Option>
                <Option value='mc02'>M C 02</Option>
              </Select>
              {errors.material_category.length > 0 && (
                <div style={error}>{errors.material_category}</div>
              )}
              <div style={{ height: "12px" }}></div>
            </div>

            {/* T.P No */}
            <div className='input_wrapper'>
              <label for='sub_category' className='label'>
                Sub Category:
              </label>

              <Select
                placeholder='Select Sub Category'
                id='sub_category'
                name='sub_category '
                style={{ width: 170 }}
                value={sub_category}
                onChange={value => this.handleSelect("sub_category", value)}
              >
                <Option value='sc01'>Sub C 01</Option>
                <Option value='sc02'>Sub C 02</Option>
              </Select>
              {errors.sub_category.length > 0 && (
                <div style={error}>{errors.sub_category}</div>
              )}
              <div style={{ height: "12px" }}></div>
            </div>

            <div className='input_wrapper'>
              <label for='material_name' className='label'>
                Material Name:
              </label>

              <Input
                id='material_name'
                name='material_name'
                placeholder='Enter Material Name'
                value={material_name}
                onChange={this.handleChange}
              />
              {errors.material_name.length > 0 && (
                <div style={error}>{errors.material_name}</div>
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
    setEquipmentPlantVisiblity: () => {
      dispatch({ type: DISABLE_EDIT_MODE });
      console.log("edit modal closed");
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MaterialMasterAddForm);
