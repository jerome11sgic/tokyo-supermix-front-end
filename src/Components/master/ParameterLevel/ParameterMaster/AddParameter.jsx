import React, { Component } from "react";
import { Input, Modal, Icon, Button, Form } from "antd";
import HandelError from "../../../Constant/HandleError";
import { api } from "../../../services/AxiosService";
import { PrimaryButton } from "../../../styledcomponents/button/button";
import {
  MasterLevelFormTitle,
  MasterLevelForm
} from "../../../styledcomponents/form/MasterLevelForms";
import Notificationfuc from "../../../Constant/Notification";
import { connect } from "react-redux";
import { DISABLE_EDIT_MODE } from "../../../../redux/action/master/plantlevel/PlantLevel";

const error = {
  color: "red",
  fontSize: "12px",
  width: "160px",
  height: "2px"
};
class AddParameter extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props.editPlantData)
    this.state = {
      formValid: false,
      errorCount: 0,
      errors: {
        name: "",
        abbrivation: ""
      },
      loading: false,
      visible: false,
      parameter_code: "",
      parameter_name: "",
      parameter_abbrivation: "",
      errormgs: "",
      type: "add"
    };
  }
  showModal = () => {
    this.setState({
      visible: true
    });
  };

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

  handleChange = (event, field) => {
    this.setState({ [field]: event.target.value });
    this.setState({ errormgs: "" });
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      // case "parameter_code":
      //   errors.code =
      //     value.length === 0
      //       ? "Code can't be empty"
      //       : value.length < 3
      //       ? "Code \n must be 3 characters long!"
      //       : "";
      //   break;
      case "parameter_name":
        errors.name =
          value.length === 0
            ? "Parameter Name can't be empty"
            : value.length < 3
            ? "Parameter Name \n must be 3 characters long!"
            : value.replace(/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/, "")
            ? "Parameter Name allow only letters"
            : "";
        break;
      case "parameter_abbrivation":
        errors.abbrivation =
          value.length === 0
            ? "Abbrivation can't be empty"
            : value.length < 3
            ? "Abbrivation \n must be 3 characters long!"
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

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (
      this.state.parameter_name.length === 0 &&
      this.state.parameter_abbrivation.length === 0
    ) {
      this.setState({
        errors: {
          name: "Parameter Name can't be empty",
          abbrivation: "Abbrivation can't be empty"
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
      // } else if (
      //   this.state.parameter_code.length === 0 &&
      //   this.state.errors.code.length === 0
      // ) {
      //   this.setState({
      //     errors: {
      //       code: this.state.errors.code || "Code can't be empty",
      //       name: this.state.errors.name,
      //       abbrivation: this.state.errors.abbrivation
      //     },
      //     formValid: this.validateForm(this.state.errors),
      //     errorCount: this.countErrors(this.state.errors)
      //   });
    } else if (
      this.state.parameter_name.length === 0 &&
      this.state.errors.name.length === 0
    ) {
      this.setState({
        errors: {
          name: this.state.errors.name || "Parameter Name can't be empty",
          abbrivation: this.state.errors.abbrivation
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      this.state.parameter_abbrivation.length === 0 &&
      this.state.errors.abbrivation.length === 0
    ) {
      this.setState({
        errors: {
          name: this.state.errors.name,
          abbrivation:
            this.state.errors.abbrivation || "Abbrivation can't be empty"
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      this.state.errors.name.length === 0 &&
      this.state.errors.abbrivation.length === 0
    ) {
      console.log(this.state.errors);
      this.setState({ formValid: this.validateForm(this.state.errors) });
      this.setState({ errorCount: this.countErrors(this.state.errors) });
      console.log(this.state.formValid);
      console.log(this.state.errorCount);

      const data = {
        // code: this.state.parameter_code,
        name: this.state.parameter_name,
        abbreviation: this.state.parameter_abbrivation
      };
      if (this.state.type === "add") {
        const data = {
          // code: this.state.parameter_code,
          name: this.state.parameter_name,
          abbreviation: this.state.parameter_abbrivation
        };
        api("POST", "supermix", "/parameter", "", data, "")
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
                  parameter_code: "",
                  parameter_name: "",
                  parameter_abbrivation: "",
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
            this.setState({
              // errormgs: "Plant Name Exist"
            });
            console.log(error);
          });
      } else {
        const data = {
          id: this.state.parameter_code,
          name: this.state.parameter_name,
          abbreviation: this.state.parameter_abbrivation
        };
        console.log(data);
        api("PUT", "supermix", "/parameter", "", data, "")
          .then(
            res => {
              console.log(res.data);

              Notificationfuc("success", res.data.message);
              this.props.reload();
              this.setState({ loading: true });
              this.setState({
                parameter_code: "",
                parameter_name: "",
                parameter_abbrivation: "",
                visible: false,
                errormgs: ""
              });
              setTimeout(() => {
                this.setState({ loading: false, visible: false });
              }, 3000);
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
      console.log(data);
      console.log("form is valid");
    }
  };

  showModal = () => {
    this.setState({
      visible: true,
      parameter_code: "",
      parameter_name: "",
      parameter_abbrivation: ""
    });
  };

  responeserror(error) {
    console.log(error);
    this.setState({
      errormgs: `${error} is exist`
    });
  }

  //cancelling or closing the modal
  handleCancel = () => {
    if (this.state.type === "edit") {
      // we call the redux function to dispatch and delete all the global redux state to close the modal
      this.props.setPlantVisiblity();
    }

    this.setState({
      visible: false,
      formValid: false,
      errors: {
        code: "",
        name: "",
        abbrivation: ""
      },
      parameter_code: "",
      parameter_name: "",
      parameter_abbrivation: "",
      errormgs: ""
    });
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.visible,
      parameter_code: nextProps.editPlantData.id,
      parameter_name: nextProps.editPlantData.name,
      parameter_abbrivation: nextProps.editPlantData.abbreviation,
      type: nextProps.type
    });
  }

  componentDidMount() {
    console.log(this.props.screen);
  }
  render() {
    const { visible, loading } = this.state;
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
          Add Parameter
        </PrimaryButton>
        <Modal
          width="260px"
          className="addsubcategorymodal"
          visible={visible}
          closable={false}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <PrimaryButton
              key="submit"
              loading={loading}
              onClick={this.handleSubmit}
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
                  ? "Edit Parameter"
                  : "Add Parameter"}
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
              <label for="parameter_code" className="label">
                Code:
              </label>
              <Input
                id="parameter_code"
                name="parameter_code"
                placeholder="Enter the Code "
                onChange={this.handleChange}
                value={this.state.parameter_code}
                disabled={this.state.type === "edit" ? true : false}
                // disabled
              />

              <div style={{ height: "12px" }}></div>
            </div>
            {/* Paramter Name */}
            <div className="input_wrapper">
              <label for="parameter_name" className="label">
                Parameter Name:
              </label>

              <Input
                id="parameter_name"
                name="parameter_name"
                placeholder="Enter Parameter Name"
                onChange={this.handleChange}
                value={this.state.parameter_name}
              />
              {errors.name.length > 0 && <div style={error}>{errors.name}</div>}
              {this.state.errormgs.message === "name" ? (
                <div style={error}>{HandelError(this.state.errormgs)}</div>
              ) : (
                ""
              )}
              <div style={{ height: "12px" }}></div>
            </div>

            {/* Abbrivation */}
            <div className="input_wrapper">
              <label for="parameter_abbrivation" className="label">
                Abbrivation:
              </label>

              <Input
                id="parameter_abbrivation"
                name="parameter_abbrivation"
                placeholder="Enter Abbrivation"
                onChange={this.handleChange}
                value={this.state.parameter_abbrivation}
              />
              {errors.abbrivation.length > 0 && (
                <div style={error}>{errors.abbrivation}</div>
              )}
              {this.state.errormgs.message === "abbrivation" ? (
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

export default connect(mapStateToProps, mapDispatchToProps)(AddParameter);
