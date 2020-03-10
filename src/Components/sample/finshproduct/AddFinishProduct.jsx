import React, { Component } from "react";
import { Modal, Icon, Select, Button, DatePicker } from "antd";

import { PrimaryButton } from "../../styledcomponents/button/button";
import moment from "moment";
import HandelError from "../../Constant/HandleError";
import { api } from "../../services/AxiosService";
import {
  MasterLevelFormTitle,
  MasterLevelForm
} from "../../styledcomponents/form/MasterLevelForms";
import { connect } from "react-redux";
import { DISABLE_EDIT_MODE } from "../../../redux/action/master/plantlevel/PlantLevel";
const { Option } = Select;
const error = {
  color: "red",
  fontSize: "12px",
  width: "160px",
  height: "2px"
};
class AddFinishProduct extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props.editPlantData)
    this.state = {
      formValid: false,
      errorCount: 0,
      errors: {
        date: "",
        project_code: "",
        pour_id: "",
        mixdesign_code: ""
      },
      loading: false,
      visible: false,
      finish_product_code: "",
      finish_product_date: "",
      finish_product_project_code: "",
      finsih_product_pour_id: "",
      finsih_product_mixdesign_code: "",
      projectEdit: "",
      pourEdit: "",
      mixdesignEdit: "",
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
      finish_product_date: "",
      finish_product_project_code: "",
      finsih_product_pour_id: "",
      finsih_product_mixdesign_code: ""
    });
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

  handleChange = (event, field) => {
    this.setState({ [field]: event.target.value });
    this.setState({ errormgs: "" });
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    // console.log(name + " is \t" + value);
    switch (name) {
      case "finish_product_code":
        errors.code =
          value.length === 0
            ? "Code can't be empty"
            : value.length < 1
            ? "Code must be one characters long!"
            : "";
        break;
      case "finish_product_date":
        errors.date =
          value.length === 0
            ? "Date can't be empty"
            : value.length < 3
            ? "Date allow only letters"
            : "";
        break;
      case "finish_product_project_code":
        errors.project_code =
          value.length === 0
            ? "Project  can't be empty"
            : value.length < 3
            ? "Project must be 3 characters long!"
            : "";
        break;
      case "finsih_product_pour_id":
        errors.pour_id = isNaN(value)
          ? `Pour must be a number`
          : value.length === 0
          ? "Pour can't be empty"
          : value.length < 9
          ? `Pour must be 10 characters long!`
          : "";
        break;
      case "finsih_product_mixdesign_code":
        errors.mixdesign_code = isNaN(value)
          ? `Mixdesign must be a number`
          : value.length === 0
          ? "Mixdesign can't be empty"
          : value.length < 9
          ? `Mixdesign must be 10 characters long!`
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
    // handle select for  plant
    if (name === "finish_product_code") {
      this.setState({
        finish_product_code: value
        // projectEdit: value
      });

      if (value.length !== 0) {
        this.setState({
          errors: {
            project_code: "",
            pour_id: this.state.errors.pour_id,
            mixdesign_code: this.state.errors.mixdesign_code,
            date: this.state.errors.date
          }
        });
      }
    }

    //handle select for designation
    if (name === "finsih_product_pour_id") {
      this.setState({
        finsih_product_pour_id: value
        // pourEdit: value
      });

      if (value.length !== 0) {
        this.setState({
          errors: {
            // code: this.state.errors.code,
            project_code: this.state.errors.project_code,
            pour_id: "",
            mixdesign_code: this.state.errors.mixdesign_code,
            date: this.state.errors.date
          }
        });
      }
    }

    if (name === "finsih_product_mixdesign_code") {
      this.setState({
        finsih_product_mixdesign_code: value
        // mixdesignEdit: value
      });

      if (value.length !== 0) {
        this.setState({
          errors: {
            // code: this.state.errors.code,
            project_code: this.state.errors.project_code,
            pour_id: this.state.errors.pour_id,
            mixdesign_code: "",
            date: this.state.errors.date
          }
        });
      }
    }
  };

  //dropdown data
  getAllproject() {
    api("GET", "supermix", "/projects", "", "", "").then(res => {
      if (res.data.results.projects.length > 0) {
        let SelectProject = res.data.results.projects.map((post, index) => {
          return (
            <Option value={post.code} key={index}>
              {post.name}
            </Option>
          );
        });
        this.setState({
          SelectProject
        });
      }
    });
  }

  getallPour = () => {
    console.log("api");

    api("GET", "supermix", "/pours", "", "", "").then(res => {
      console.log(res);

      if (res.data.results.Pour.length > 0) {
        console.log("ggg");
        let SelectPour = res.data.results.Pour.map((post, index) => {
          return (
            <Option value={post.id} key={index}>
              {post.name}
            </Option>
          );
        });
        this.setState({
          SelectPour
        });
      }
    });
  };

  getallmixdesign = () => {
    api("GET", "supermix", "/mix-designs", "", "", "").then(res => {
      console.log(res.data);
      if (res.data.results.mixDesigns.length > 0) {
        let SelectMixDesign = res.data.results.mixDesigns.map((post, index) => {
          return (
            <Option value={post.id} key={index}>
              {post.code}
            </Option>
          );
        });
        this.setState({
          SelectMixDesign
        });
      }
    });
  };

  handleCancel = () => {
    if (this.state.type === "edit") {
      // we call the redux function to dispatch and delete all the global redux state to close the modal
      this.props.setfinishproductVisiblity();
    }
    this.setState({
      visible: false,
      formValid: false,
      finish_product_date: "",
      finish_product_project_code: "",
      finsih_product_pour_id: "",
      finsih_product_mixdesign_code: "",
      errors: {
        date: "",
        project_code: "",
        pour_id: "",
        mixdesign_code: ""
      },
      errormgs: ""
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    if (
      this.state.finish_product_date.length === 0 &&
      this.state.finish_product_project_code.length === 0 &&
      this.state.finsih_product_pour_id.length === 0 &&
      this.state.finsih_product_mixdesign_code.length === 0
    ) {
      this.setState({
        errors: {
          date: "Date can't be empty",
          project_code: "Project can't be empty",
          pour_id: "Pour can't be empty",
          mixdesign_code: "Mixdesign can't be empty"
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      this.state.finish_product_date.length === 0 &&
      this.state.errors.date.length === 0
    ) {
      this.setState({
        errors: {
          date: this.state.errors.date || "Date can't be empty",
          project_code: this.state.errors.project_code,
          pour_id: this.state.errors.pour_id,
          mixdesign_code: this.state.errors.mixdesign_code
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      this.state.finish_product_project_code.length === 0 &&
      this.state.errors.project_code.length === 0
    ) {
      this.setState({
        errors: {
          date: this.state.errors.date,
          project_code:
            this.state.errors.project_code || "Project can't be empty",
          pour_id: this.state.errors.pour_id,
          mixdesign_code: this.state.errors.mixdesign_code
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      this.state.finsih_product_pour_id.length === 0 &&
      this.state.errors.pour_id.length === 0
    ) {
      this.setState({
        errors: {
          date: this.state.errors.date,
          project_code: this.state.errors.project_code,
          pour_id: this.state.errors.pour_id || "Pour can't be empty",
          mixdesign_code: this.state.errors.mixdesign_code
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      this.state.finsih_product_mixdesign_code.length === 0 &&
      this.state.errors.mixdesign_code.length === 0
    ) {
      this.setState({
        errors: {
          date: this.state.errors.date,
          project_code: this.state.errors.project_code,
          pour_id: this.state.errors.pour_id,
          mixdesign_code:
            this.state.errors.mixdesign_code || "Mix Design can't be empty"
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      this.state.finish_product_date.length === 0 &&
      this.state.finish_product_project_code.length === 0 &&
      this.state.finsih_product_pour_id.length === 0 &&
      this.state.finsih_product_mixdesign_code.length === 0
    ) {
      this.setState({ formValid: this.validateForm(this.state.errors) });
      this.setState({ errorCount: this.countErrors(this.state.errors) });
      console.log(this.state.designation_name);
      const data = {
        // i: this.state.designation_code,
        date: this.state.finish_product_date,
        project_code: this.state.finish_product_project_code,
        pour_id: this.state.finsih_product_pour_id,
        mixdesign_code: this.state.finsih_product_mixdesign_code
      };
      if (this.state.type === "edit") {
        const data = {
          id: this.state.finish_product_code,
          date: this.state.finish_product_date,
          project_code: this.state.finish_product_project_code,
          pour_id: this.state.finsih_product_pour_id,
          mixdesign_code: this.state.finsih_product_mixdesign_code
        };
        console.log(data);
        api("PUT", "supermix", "/finishProduct", "", data, "").then(
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
                finish_product_code: "",
                finish_product_project_code: "",
                finish_product_date: "",
                finsih_product_pour_id: "",
                finsih_product_mixdesign_code: "",

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
          id: this.state.finish_product_code,
          date: this.state.finish_product_date,
          project_code: this.state.finish_product_project_code,
          pour_id: this.state.finsih_product_pour_id,
          mixdesign_code: this.state.finsih_product_mixdesign_code
        };
        console.log(data);
        api("POST", "supermix", "/finishproduct", "", data, "")
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
                  finish_product_code: "",
                  finish_product_date: "",
                  finish_product_project_code: "",
                  finsih_product_pour_id: "",
                  finsih_product_mixdesign_code: "",
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

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.editPlantData);
    this.setState({
      visible: nextProps.visible,

      finish_product_date: moment(nextProps.editPlantData.date, "DD-MM-YYYY"),
      finish_product_project_code: nextProps.editPlantData.project_code,
      finsih_product_pour_id: nextProps.editPlantData.pour_id,
      finsih_product_mixdesign_code: nextProps.editPlantData.mixdesign_code,
      type: nextProps.type
    });
  }

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
        pour_id: errors.pour_id,
        project_code: errors.project_code,
        mixdesign_code: errors.mixdesign_code,
        date: ""
      }
    });
  }

  componentDidMount() {
    this.getAllproject();
    this.getallPour();
    this.getallmixdesign();
    console.log(this.props.screen);
  }
  render() {
    const {
      visible,
      loading,
      errors,
      errorCount,
      finish_product_date,
      finish_product_project_code,
      finsih_product_pour_id,
      finsih_product_mixdesign_code
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
          Add FinishProduct Sample
        </PrimaryButton>
        <Modal
          width="500px"
          visible={visible}
          okType="default"
          closable={false}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <PrimaryButton
              key="submit"
              // loading={loading}
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
                  ? "Edit Finish Product"
                  : "Add Finish Product"}
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
            {/* <div className='input_wrapper'>
              <label for='code' className='label'>
                Code:
              </label>
              <Form.Item>
                {getFieldDecorator("code", {
                  // rules: [{ required: true, message: "Please enter a code!" }]
                })(
                  <Input
                    id='code'
                    name='code'
                    // placeholder='Enter the Code '
                    disabled
                  />
                )}
              </Form.Item>
            </div> */}

            <div className="input_wrapper">
              <label for="finsih_product_mixdesign_code" className="label">
                Mix Design:
              </label>

              <Select
                showSearch
                style={{ width: 180 }}
                id="finsih_product_mixdesign_code"
                name="finsih_product_mixdesign_code"
                placeholder="Select a Mix Design"
                optionFilterProp="children"
                onChange={value =>
                  this.handleSelect("finsih_product_mixdesign_code", value)
                }
                // onFocus={onFocus}
                value={this.state.mixdesignEdit}
                // onBlur={onBlur}
                // onSearch={onSearch}
              >
                {this.state.SelectMixDesign}
              </Select>
              {errors.mixdesign_code.length > 0 && (
                <div style={error}>{errors.mixdesign_code}</div>
              )}
              <div style={error}>{this.state.errormgs}</div>
              <div style={{ height: "12px" }}></div>
            </div>

            <div className="input_wrapper">
              <label for="finish_product_project_code" className="label">
                Project:
              </label>

              <Select
                showSearch
                style={{ width: 180 }}
                id="finish_product_project_code"
                name="finish_product_project_code"
                placeholder="Select a Project"
                optionFilterProp="children"
                onChange={value =>
                  this.handleSelect("finish_product_project_code", value)
                }
                // onFocus={onFocus}
                value={this.state.projectEdit}
                // onBlur={onBlur}
                // onSearch={onSearch}
              >
                {this.state.SelectProject}
              </Select>
              {errors.project_code.length > 0 && (
                <div style={error}>{errors.project_code}</div>
              )}
              <div style={error}>{this.state.errormgs}</div>
              <div style={{ height: "12px" }}></div>
            </div>

            <div className="input_wrapper">
              <label for="finsih_product_pour_id" className="label">
                Pour:
              </label>

              <Select
                showSearch
                style={{ width: 180 }}
                id="finsih_product_pour_id"
                name="finsih_product_pour_id"
                placeholder="Select a Pour"
                optionFilterProp="children"
                onChange={value =>
                  this.handleSelect("finsih_product_pour_id", value)
                }
                // onFocus={onFocus}
                value={this.state.pourEdit}
                // onBlur={onBlur}
                // onSearch={onSearch}
              >
                {this.state.SelectPour}
              </Select>
              {errors.pour_id.length > 0 && (
                <div style={error}>{errors.pour_id}</div>
              )}
              <div style={error}>{this.state.errormgs}</div>
              <div style={{ height: "12px" }}></div>
            </div>

            <div className="input_wrapper">
              <label for="finish_product_date" className="label">
                Date:
              </label>

              <DatePicker
                id="finish_product_date"
                name="finish_product_date"
                format={"YYYY-MM-DD"}
                style={{ width: 170 }}
                value={this.state.date}
                onChange={(dateString, field) =>
                  this.handleDates("finish_product_date", dateString, field)
                }
                showToday
              />
              {errors.date.length > 0 && <div style={error}>{errors.date}</div>}
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
    setfinishproductVisiblity: () => {
      dispatch({ type: DISABLE_EDIT_MODE });
      console.log("edit modal closed");
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddFinishProduct);
