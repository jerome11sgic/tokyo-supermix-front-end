import React, { Component } from "react";
import { Input, Modal, Icon, Button, Form } from "antd";
import Notification from "../../../Constant/Notification";
import HandelError from "../../../Constant/HandleError";
import { PrimaryButton } from "../../../styledcomponents/button/button";
import {
  MasterLevelFormTitle,
  MasterLevelForm
} from "../../../styledcomponents/form/MasterLevelForms";
import { api } from "../../../services/AxiosService";
import { DISABLE_EDIT_MODE } from "../../../../redux/action/master/plantlevel/PlantLevel";
import { connect } from "react-redux";

const error = {
  color: "red",
  fontSize: "12px",
  width: "160px",
  height: "0.2px"
};

class MaterialNatureAddForm extends Component {
  state = {
    loading: false,
    visible: false,
    formValid: false,
    errorCount: 0,
    errormsg: "",
    type: "add",
    errors: {
      material_state: ""
    },
    code: "",
    material_state: ""
  };

  showModal = () => {
    this.setState({
      visible: true,
      formValid: false,
      errorCount: 0,
      errormsg: "",
      type: "add",
      errors: {
        material_state: ""
      },
      code: "",
      material_state: ""
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
      case "material_state":
        errors.material_state =
          value.length === 0
            ? "Material State can't be empty"
            : value.length < 3
            ? "Material State \n must be 3 characters long!"
            : !isNaN(value)
            ? "Material State won't allow only letters"
            : "";
        break;

      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  handleCancel = () => {
    if (this.state.type === "edit") {
      // we call the redux function to dispatch and delete all the global redux state to close the modal
      this.props.setMaterialStateVisiblity();
    }
    this.setState({
      visible: false,
      formValid: false,
      errorCount: 0,
      errormsg: "",
      type: "add",
      errors: {
        material_state: ""
      },
      code: "",
      material_state: ""
    });
  };

  handleSubmit = e => {
    const { visible, loading, code, material_state, errors } = this.state;
    e.preventDefault();
    if (material_state.length === 0) {
      this.setState({
        errors: {
          material_state: "Material State can't be empty"
        }
      });
    } else if (
      material_state.length === 0 &&
      errors.material_state.length === 0
    ) {
      this.setState({
        errors: {
          material_state:
            errors.material_state || "Material State can't be empty"
        }
      });
    } else if (errors.material_state.length === 0) {
      console.log("form is valid");
      const data = {
        materialState: material_state
      };
      console.log(data);
      console.log(this.state.type);
      if (this.state.type === "add") {
        api("POST", "supermix", "/material-state", "", data, "")
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
                  errors: {
                    material_state: ""
                  },
                  code: "",
                  material_state: ""
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
          id: code,
          materialState: material_state
        };
        console.log(this.state.type);
        api("PUT", "supermix", "/material-state", "", data, "")
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
                  errors: {
                    material_state: ""
                  },
                  code: "",
                  material_state: ""
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
      material_state: nextProps.editPlantData.materialState,
      type: nextProps.type
    });
  }

  render() {
    const { visible, loading, code, material_state, errors } = this.state;

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
          Add State
        </PrimaryButton>
        <Modal
          width='330px'
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
              Save
            </PrimaryButton>
          ]}
          title={
            <MasterLevelFormTitle>
              <p
                style={{
                  color: "white"
                }}
              >
                Add State
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
            {this.state.type === "edit" ? (
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
              </div>
            ) : (
              ""
            )}
            {/* User Role */}
            <div className='input_wrapper'>
              <label for='material_state' className='label'>
                State:
              </label>

              <Input
                id='material_state'
                name='material_state'
                placeholder='Enter Nature'
                value={material_state}
                onChange={this.handleChange}
              />
              {errors.material_state.length > 0 && (
                <div style={error}>{errors.material_state}</div>
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
    setMaterialStateVisiblity: () => {
      dispatch({ type: DISABLE_EDIT_MODE });
      console.log("edit modal closed");
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MaterialNatureAddForm);
