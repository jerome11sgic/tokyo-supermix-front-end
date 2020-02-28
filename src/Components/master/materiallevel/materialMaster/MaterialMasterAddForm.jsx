import React, { Component } from "react";
import { Input, Modal, Button, Icon, Select, Form } from "antd";
import Notification from "../../../Constant/Notification";
import HandelError from "../../../Constant/HandleError";
import { PrimaryButton } from "../../../styledcomponents/button/button";
import {
  MasterLevelFormTitle,
  MasterLevelForm
} from "../../../styledcomponents/form/MasterLevelForms";
import { connect } from "react-redux";
import { DISABLE_EDIT_MODE } from "../../../../redux/action/master/plantlevel/PlantLevel";
import { api } from "../../../services/AxiosService";

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
      sub_category: "",
      material_name: "",
      material_nature: ""
    },
    code: "",
    // material_category: "",
    material_nature: "",
    sub_category: "",
    material_name: "",
    errormgs: "",
    type: "add",
    edit_material_nature: "",
    edit_sub_category: "",
    subCategoryList: [],
    categoryList: []
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
    // if (name === "material_category") {
    //   this.setState({
    //     material_category: value
    //   });
    //   if (value.length !== 0) {
    //     this.setState({
    //       errors: {
    //         material_category: "",
    //         sub_category: errors.sub_category,
    //         material_name: errors.material_name,
    //         material_nature: errors.material_nature
    //       },
    //       formValid: this.validateForm(errors),
    //       errorCount: this.countErrors(errors)
    //     });
    //   }
    // }
    // handle select for sub_category
    if (name === "sub_category") {
      this.setState({
        sub_category: value,
        edit_sub_category: value
      });
      if (value.length !== 0) {
        this.setState({
          errors: {
            // material_category: errors.material_category,
            sub_category: "",
            material_name: errors.material_name,
            material_nature: errors.material_nature
          },
          formValid: this.validateForm(errors),
          errorCount: this.countErrors(errors)
        });
      }
    }

    if (name === "material_nature") {
      this.setState({
        material_nature: value
      });
      if (value.length !== 0) {
        this.setState({
          errors: {
            // material_category: errors.material_category,
            sub_category: errors.sub_category,
            material_name: errors.material_name,
            material_nature: ""
          },
          formValid: this.validateForm(errors),
          errorCount: this.countErrors(errors)
        });
      }
    }
  };

  //filling dripdown
  //get all
  getallMaterialCategory = () => {
    console.log("api");
    api("GET", "supermix", "/material-categories", "", "", "").then(res => {
      console.log(res);
      let categoryselect = res.data.results.materialCategories.map(
        (post, index) => {
          return (
            <Option value={post.id} key={index}>
              {post.name}
            </Option>
          );
        }
      );
      this.setState({
        categoryselect
      });
    });
  };

  //get all
  getallMaterialSubCategory = () => {
    console.log("api");
    api("GET", "supermix", "/material-sub-categories", "", "", "").then(res => {
      console.log(res);
      let subCategorySelect = res.data.results.materialSubCategories.map(
        (post, index) => {
          return (
            <Option value={post.id} key={index}>
              {post.name}
            </Option>
          );
        }
      );
      this.setState({
        subCategorySelect
      });
    });
  };

  componentDidMount() {
    this.getallMaterialSubCategory();
    // this.getallMaterialCategory();
  }

  handleCancel = () => {
    if (this.state.type === "edit") {
      // we call the redux function to dispatch and delete all the global redux state to close the modal
      this.props.setMaterialMasterVisiblity();
    }
    this.setState({
      visible: false,
      errors: {
        // material_category: "",
        sub_category: "",
        material_name: "",
        material_nature: ""
      },
      material_category: "",
      sub_category: "",
      material_name: "",
      errormgs: "",
      material_nature: "",
      type: ""
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
      material_name,
      code,
      material_nature
    } = this.state;
    if (
      // material_category.length === 0 &&
      sub_category.length === 0 &&
      material_name.length === 0 &&
      material_nature.length === 0
    ) {
      this.setState({
        errors: {
          // material_category: "Material Category can't be empty",
          sub_category: "Sub Category can't be empty",
          material_name: "Name can't be empty",
          material_nature: "Material Nature can't be empty"
        },
        formValid: this.validateForm(errors),
        errorCount: this.countErrors(errors)
      });
    }
    // else if (
    //   material_category.length === 0 &&
    //   errors.material_category.length === 0
    // ) {
    //   this.setState({
    //     errors: {
    //       material_category:
    //         errors.material_category || "Material Category can't be empty",
    //       sub_category: errors.sub_category,
    //       material_name: errors.material_name,
    //       material_nature: errors.material_nature
    //     },
    //     formValid: this.validateForm(errors),
    //     errorCount: this.countErrors(errors)
    //   });
    // }
    else if (sub_category.length === 0 && errors.sub_category.length === 0) {
      this.setState({
        errors: {
          // material_category: errors.material_category,
          sub_category: errors.sub_category || "Sub Category can't be empty",
          material_name: errors.material_name,
          material_nature: errors.material_nature
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
          // material_category: errors.material_category,
          sub_category: errors.sub_category,
          material_name: errors.material_name || "Name can't be empty",
          material_nature: errors.material_nature
        },
        formValid: this.validateForm(errors),
        errorCount: this.countErrors(errors)
      });
    } else if (
      material_nature.length === 0 &&
      errors.material_nature.length === 0
    ) {
      this.setState({
        errors: {
          // material_category: errors.material_category,
          sub_category: errors.sub_category,
          material_name: errors.material_name,
          material_nature:
            errors.material_nature || "Material Nature can't be empty"
        },
        formValid: this.validateForm(errors),
        errorCount: this.countErrors(errors)
      });
    } else if (
      // errors.material_category.length === 0 &&
      errors.sub_category.length === 0 &&
      errors.material_name.length === 0
    ) {
      console.log("form is valid");

      console.log(this.state.type);
      if (this.state.type === "add") {
        const data = {
          // materialCategory: material_category,
          materialSubCategoryId: sub_category,
          name: material_name,
          nature: material_nature
        };
        console.log(data);
        api("POST", "supermix", "/raw-material", "", data, "")
          .then(
            res => {
              console.log(res.data);
              if (res.data.status === "VALIDATION_FAILURE") {
                console.log("add");
                this.responeserror(res.data.results.name.message);
              } else {
                Notification("success", res.data.message);
                this.props.reload();
                this.setState({
                  loading: true,
                  errormgs: "",
                  errors: {
                    material_category: "",
                    sub_category: "",
                    material_name: "",
                    material_nature: ""
                  },
                  code: "",
                  material_category: "",
                  sub_category: "",
                  material_name: "",
                  material_nature: ""
                });
                setTimeout(() => {
                  this.setState({ loading: false, visible: false });
                }, 1500);
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
          // materialCategory: material_category,
          id: code,
          materialSubCategoryId: sub_category,
          name: material_name,
          nature: material_nature
        };
        console.log(data);
        api("PUT", "supermix", "/raw-material", "", data, "")
          .then(
            res => {
              console.log(res.data);

              if (res.data.status === "VALIDATION_FAILURE") {
                console.log("update");
                this.responeserror(res.data.results.name.message);
              } else {
                Notification("success", res.data.message);
                this.props.reload();
                this.setState({
                  loading: true,
                  errormgs: "",
                  errors: {
                    material_category: "",
                    sub_category: "",
                    material_name: ""
                  },
                  code: "",
                  material_category: "",
                  sub_category: "",
                  material_name: ""
                });
                setTimeout(() => {
                  this.setState({ loading: false, visible: false });
                }, 1500);
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
    }
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.visible,
      code: nextProps.editPlantData.id,
      material_category: nextProps.editPlantData.materialCategory,
      sub_category: nextProps.editPlantData.subCategory_Id,
      material_name: nextProps.editPlantData.name,
      material_nature: nextProps.editPlantData.nature,
      edit_material_nature: nextProps.editPlantData.nature,
      edit_sub_category: nextProps.editPlantData.subCategory,
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
      edit_sub_category,
      sub_category,
      material_name,
      material_nature
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
          width="500px"
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
            {type === "edit" ? (
              <div className="input_wrapper">
                <label for="code" className="label">
                  Code:
                </label>

                <Input
                  id="code"
                  name="code"
                  placeholder="Enter the Code "
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
            {/* <div className="input_wrapper">
              <label for="material_category" className="label">
                Material Category:
              </label>

              <Select
                placeholder="Select material Category"
                id="material_category"
                name="material_category "
                value={material_category}
                onChange={value =>
                  this.handleSelect("material_category", value)
                }
                style={{ width: 170 }}
              >
                {this.state.categoryselect}
                {/* <Option value='mc01'>M C 01</Option>
                <Option value='mc02'>M C 02</Option> */}
            {/* </Select>
              {errors.material_category.length > 0 && (
                <div style={error}>{errors.material_category}</div>
              )}
              <div style={{ height: "12px" }}></div>
            </div>  */}

            {/* T.P No */}
            <div className="input_wrapper">
              <label for="sub_category" className="label">
                Sub Category:
              </label>

              <Select
                placeholder="Select Sub Category"
                id="sub_category"
                name="sub_category "
                style={{ width: 170 }}
                value={edit_sub_category}
                onChange={value => this.handleSelect("sub_category", value)}
              >
                {this.state.subCategorySelect}
                {/* <Option value='sc01'>Sub C 01</Option>
                <Option value='sc02'>Sub C 02</Option> */}
              </Select>
              {errors.sub_category.length > 0 && (
                <div style={error}>{errors.sub_category}</div>
              )}
              <div style={{ height: "12px" }}></div>
            </div>

            <div className="input_wrapper">
              <label for="sub_category" className="label">
                Material Nature :
              </label>

              <Select
                placeholder="Select Sub Category"
                id="material_nature"
                name="material_nature"
                style={{ width: 170 }}
                value={material_nature}
                onChange={value => this.handleSelect("material_nature", value)}
              >
                <Option value="SOLID">SOLID</Option>
                <Option value="LIQUID">LIQUID</Option>
                <Option value="GAS">GAS</Option>
              </Select>
              {/* {errors.material_nature.length > 0 && (
                <div style={error}>{errors.material_nature}</div>
              )} */}
              <div style={{ height: "12px" }}></div>
            </div>

            <div className="input_wrapper">
              <label for="material_name" className="label">
                Material Name:
              </label>

              <Input
                id="material_name"
                name="material_name"
                placeholder="Enter Material Name"
                value={material_name}
                onChange={this.handleChange}
              />
              {errors.material_name.length > 0 && (
                <div style={error}>{errors.material_name}</div>
              )}
              {this.state.errormgs.message == "name" ? (
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
    setMaterialMasterVisiblity: () => {
      dispatch({ type: DISABLE_EDIT_MODE });
      console.log("edit modal closed");
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MaterialMasterAddForm);
