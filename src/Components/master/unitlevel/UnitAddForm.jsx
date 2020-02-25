import React, { Component } from "react";
import { Input, Modal, Button, Icon } from "antd";
import { api } from "../../services/AxiosService";
import { PrimaryButton } from "../../styledcomponents/button/button";
import {
  MasterLevelForm,
  MasterLevelFormTitle
} from "../../styledcomponents/form/MasterLevelForms";
import Notificationfuc from "../../Constant/Notification";
import { connect } from "react-redux";
import { DISABLE_EDIT_MODE } from "../../../redux/action/master/plantlevel/PlantLevel";

// function onChange(date, dateString) {
//   console.log(date, dateString);
// }

const error = {
  color: "red",
  fontSize: "12px",
  width: "160px",
  height: "2px"
};

class UnitAddForm extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props.editPlantData)
    this.state = {
      formValid: false,
      errorCount: 0,
      errors: {
        unit: ""
      },
      loading: false,
      visible: false,
      unit_code: "",
      unit_name: "",

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
      case "unit_name":
        errors.unit =
          value.length === 0
            ? "Unit Name can't be empty"
            : value.length < 3
            ? "Unit Name \n must be 3 characters long!"
            : value.replace(/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/, "")
            ? "Unit allow only letters"
            : "";
        break;

      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.unit_name.length === 0) {
      this.setState({
        errors: {
          unit: "Unit can't be empty"
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (this.state.errors.unit.length === 0) {
      console.log(this.state.errors);
      this.setState({ formValid: this.validateForm(this.state.errors) });
      this.setState({ errorCount: this.countErrors(this.state.errors) });
      console.log(this.state.formValid);
      console.log(this.state.errorCount);

      const data = {
        unit: this.state.unit_name
      };
      if (this.state.type === "add") {
        api("POST", "supermix", "/unit", "", data, "")
          .then(res => {
            console.log(res.data);
            if (res.data.status === "VALIDATION_FAILURE") {
              console.log("add");
              this.responeserror(res.data.results.name.message);
            } else {
              Notificationfuc("success", res.data.message);
              this.props.reload();
              this.setState({ loading: true });
              this.setState({
                unit_code: "",
                unit_name: "",
                errormgs: ""
              });
              setTimeout(() => {
                this.setState({ loading: false, visible: false });
              }, 3000);
            }
          })
          .catch(error => {
            this.setState({
              // errormgs: "Plant Name Exist"
            });
            // console.log(error.response.data);
          });
      } else {
        api("PUT", "supermix", "/unit", "", data, "")
          .then(res => {
            console.log(res.data);

            if (res.data.status == "VALIDATION_FAILURE") {
              console.log("update");
              this.responeserror(res.data.results.name.message);
            } else {
              Notificationfuc("success", res.data.message);
              this.props.reload();
              this.setState({ loading: true });
              this.setState({
                unit_code: "",
                unit_name: "",

                errormgs: ""
              });
              setTimeout(() => {
                this.setState({ loading: false, visible: false });
              }, 3000);
            }
          })
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
      visible: true
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
    this.setState({ visible: false });
    // we call the redux function to dispatch and delete all the global redux state to close the modal
    this.props.setPlantVisiblity();
    this.setState({
      errormgs: "",
      errors: {
        unit: ""
      },
      unit_code: "",
      unit_name: ""
    });
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.visible,
      unit_code: nextProps.editPlantData.id,
      unit_name: nextProps.editPlantData.name,

      type: nextProps.type
    });
  }
  render() {
    const { visible, loading } = this.state;
    const { errors } = this.state;
    console.log(this.state.errorCount);

    return (
      <div>
        <PrimaryButton
          onClick={this.showModal}
          style={{
            background: "#001328",
            color: "white",
            border: "none",
            width: "120px",
            marginLeft: "-10px"
          }}
        >
          Add Unit
        </PrimaryButton>
        <Modal
          visible={visible}
          closable={false}
          loading={loading}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          title={
            <MasterLevelFormTitle>
              <p
                style={{
                  color: "white"
                }}
              >
                {this.state.type === "edit" ? "Edit Unit" : "Add Unit"}
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
          width='400px'
        >
          <MasterLevelForm style={{ justifyContent: "space-evenly" }}>
            {/* Code */}
            <div className='input_wrapper'>
              <label for='plant_code' className='label'>
                Unit:
              </label>
              <Input
                id='unit_name'
                name='unit_name'
                placeholder='Enter the Unit '
                onChange={this.handleChange}
                value={this.state.unit_name}
                // disabled={this.state.type === "edit" ? true : false}
              />

              {errors.unit.length > 0 && <div style={error}>{errors.unit}</div>}
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

export default connect(mapStateToProps, mapDispatchToProps)(UnitAddForm);
