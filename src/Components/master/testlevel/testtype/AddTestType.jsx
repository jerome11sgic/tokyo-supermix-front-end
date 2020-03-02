import React, { Component } from "react";
import { Input, Modal, Icon, Button, Form } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { api } from "../../../services/AxiosService";
import { connect } from "react-redux";
import Notification from "../../../Constant/Notification";
import HandelError from "../../../Constant/HandleError";
import "./styleStatus.css";
import { PrimaryButton } from "../../../styledcomponents/button/button";
import {
  MasterLevelFormTitle,
  MasterLevelForm
} from "../../../styledcomponents/form/MasterLevelForms";
import { DISABLE_EDIT_MODE } from "../../../../redux/action/master/plantlevel/PlantLevel";

const error = {
  color: "red",
  fontSize: "12px",
  width: "160px",
  height: "0.2px"
};

class AddTestType extends Component {
  state = {
    loading: false,
    visible: false,
    errors: {
      test_type: ""
    },
    errormgs: "",
    code: "",
    test_type: "",
    type: "add"
  };

  showModal = () => {
    this.setState({
      visible: true,
      errors: {
        test_type: ""
      },
      errormgs: "",
      test_type: "",
      type: "add"
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
      case "test_type":
        errors.test_type =
          value.length === 0
            ? "test type can't be empty"
            : value.length < 3
            ? "test type \n must be 3 characters long!"
            : !isNaN(value)
            ? "test type won't allow only letters"
            : "";
        break;

      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  handleCancel = () => {
    if (this.state.type === "edit") {
      this.props.setTestTypeVisibility();
    }
    this.setState({
      visible: false,
      errors: {
        test_type: ""
      },
      errormgs: "",
      test_type: "",
      type: "add"
    });
  };

  handleSubmit = e => {
    const { errors, test_type, code } = this.state;
    e.preventDefault();
    if (test_type.length === 0) {
      this.setState({
        errors: {
          test_type: "test type can't be empty"
        }
      });
    } else if (errors.test_type.length === 0) {
      console.log("form is valid");
      if (this.state.type === "edit") {
        const data = {
          id: code,
          type: test_type
        };
        console.log(data);
        api("PUT", "supermix", "/test-type", "", data, "")
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
                  errors: {
                    test_type: ""
                  },
                  errormgs: "",
                  test_type: ""
                });
                setTimeout(() => {
                  this.setState({ loading: false, visible: false });
                }, 1500);
              }
            },
            error => {
              this.setState({
                errorvalmegss: error.validationFailures[0]
              });
              console.log("DEBUG34: ", error);
              console.log(HandelError(error.validationFailures[0]));
            }
          )
          .catch(error => {
            // this.setState({
            //   errormgs: "Plant Name Exist"
            // });
            console.log(error);
          });
      } else {
        const data = {
          type: test_type
        };
        console.log(data);
        api("POST", "supermix", "/test-type", "", data, "").then(
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
                errors: {
                  test_type: ""
                },
                errormgs: "",
                test_type: ""
              });
              setTimeout(() => {
                this.setState({ loading: false, visible: false });
              }, 1500);
            }
          },
          error => {
            this.setState({
              errorvalmegss: error.validationFailures[0]
            });
            console.log("DEBUG34: ", error);
            console.log(HandelError(error.validationFailures[0]));
          }
        );
      }
    }
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.type);
    this.setState({
      visible: nextProps.visible,
      code: nextProps.editPlantData.id,
      test_type: nextProps.editPlantData.type,
      type: nextProps.type
    });
  }

  // componentDidMount() {
  //   console.log(this.props.screen);
  // }

  render() {
    const { visible, loading, type, code, test_type, errors } = this.state;

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
          Add Test Type
        </PrimaryButton>
        <Modal
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
              onClick={e => this.handleSubmit(e)}
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
                {type === "edit" ? "Edit Test Status" : "Add Test Status"}
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
          width='330px'
        >
          <MasterLevelForm>
            {/* Test Type */}
            {type === "edit" ? (
              <div className='input_wrapper'>
                <label for='code' className='label'>
                  Code :
                </label>

                <Input id='code' name='code' value={code} disabled />
              </div>
            ) : (
              ""
            )}

            {/* Test Type */}
            <div className='input_wrapper'>
              <label for='test_type' className='label'>
                Test Type:
              </label>

              <Input
                id='test_type'
                name='test_type'
                placeholder='Enter Test Type'
                value={test_type}
                onChange={this.handleChange}
              />
              {errors.test_type.length > 0 && (
                <div style={error}>{errors.test_type}</div>
              )}
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
    setTestTypeVisibility: () => {
      dispatch({ type: DISABLE_EDIT_MODE });
      console.log("edit modal closed");
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTestType);
