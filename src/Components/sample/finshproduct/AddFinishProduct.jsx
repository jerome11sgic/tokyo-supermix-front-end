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
        project: "",
        pour: "",
        mixdesign: ""
      },
      loading: false,
      visible: false,
      code: "",
      date: "",
      project: "",
      pour: "",
      mixdesign: "",
      projectEdit: "",
      pourEdit: "",
      mixdesignEdit: "",
      errormgs: "",
      type: "add",
      errorvalmegss: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.editPlantData);
    this.setState({
      visible: nextProps.visible,
      code: nextProps.editPlantData.id,
      date: moment(nextProps.editPlantData.date, "DD-MM-YYYY"),
      project: nextProps.editPlantData.project,
      pour: nextProps.editPlantData.pour,
      mixdesign: nextProps.editPlantData.mixdesign,
      projectEdit: nextProps.editPlantData.projectName,
      pourEdit: nextProps.editPlantData.pourName,
      mixdesignEdit: nextProps.editPlantData.mixdesignName,
      type: nextProps.type
    });
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
      date: "",
      project: "",
      pour: "",
      mixdesign: ""
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    if (this.state.type === "edit") {
      this.props.setEmployeeVisibility();
    }
    this.setState({
      visible: false,
      errors: {
        date: "",
        project: "",
        pour: "",
        mixdesign: ""
      },
      code: "",
      date: "",
      project: "",
      pour: "",
      mixdesign: "",
      projectEdit: "",
      pourEdit: "",
      mixdesignEdit: "",
      errormgs: "",
      type: "add",
      errorvalmegss: ""
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
      case "code":
        errors.code =
          value.length === 0
            ? "Code can't be empty"
            : value.length < 1
            ? "Code must be one characters long!"
            : "";
        break;
      case "date":
        errors.date =
          value.length === 0
            ? "Date can't be empty"
            : value.length < 3
            ? "Date allow only letters"
            : "";
        break;
      case "project":
        errors.project =
          value.length === 0
            ? "Project  can't be empty"
            : value.length < 3
            ? "Project must be 3 characters long!"
            : "";
        break;
      case "pour":
        errors.pour =
          value.length === 0
            ? `Pour must be a number`
            : value.length === 0
            ? "Pour can't be empty"
            : value.length < 9
            ? `Pour must be 10 characters long!`
            : "";
        break;
      case "mixdesign":
        errors.mixdesign =
          value.length === 0
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
    if (name === "project") {
      this.setState({
        project: value,
        projectEdit: value
      });

      if (value.length !== 0) {
        this.setState({
          errors: {
            // code: this.state.errors.code,
            // code: this.state.errors.code,
            project: "",
            pour: this.state.errors.pour,
            mixdesign: this.state.errors.mixdesign,
            date: this.state.errors.date
          }
        });
      }
    }

    //handle select for designation
    if (name === "pour") {
      this.setState({
        pour: value,
        pourEdit: value
      });

      if (value.length !== 0) {
        this.setState({
          errors: {
            // code: this.state.errors.code,
            project: this.state.errors.project,
            pour: "",
            mixdesign: this.state.errors.mixdesign,
            date: this.state.errors.date
          }
        });
      }
    }

    if (name === "mixdesign") {
      this.setState({
        mixdesign: value,
        mixdesignEdit: value
      });

      if (value.length !== 0) {
        this.setState({
          errors: {
            // code: this.state.errors.code,
            project: this.state.errors.project,
            pour: this.state.errors.pour,
            mixdesign: "",
            date: this.state.errors.date
          }
        });
      }
    }
  };

  //dropdown data
  getAllproject = () => {
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
  };

  getallPour = () => {
    // console.log("api");

    api("GET", "supermix", "/pours", "", "", "").then(res => {
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

  getallMixdesign = () => {
    console.log("api");
    api("GET", "supermix", "/mixdesigns", "", "", "").then(res => {
      console.log(res);
      if (res.data.results.mixdesigns.length > 0) {
        let SelectMix = res.data.results.mixdesigns.map((post, index) => {
          return (
            <Option value={post.id} key={index}>
              {post.name}
            </Option>
          );
        });
        this.setState({
          SelectMix
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
      date: "",
      project: "",
      pour: "",
      mixdesign: "",
      errors: {
        date: "",
        project: "",
        pour: "",
        mixdesign: ""
      },
      errormgs: ""
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    if (
      this.state.date.length === 0 &&
      this.state.project.length === 0 &&
      this.state.pour.length === 0 &&
      this.state.mixdesign.length === 0
    ) {
      this.setState({
        errors: {
          date: "Date can't be empty",
          project: "Project can't be empty",
          pour: "Pour can't be empty",
          mixdesign: "Mixdesign can't be empty"
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      this.state.date.length === 0 &&
      this.state.errors.date.length === 0
    ) {
      this.setState({
        errors: {
          date: this.state.errors.date || "Date can't be empty",
          project: this.state.errors.project,
          pour: this.state.errors.pour,
          mixdesign: this.state.errors.mixdesign
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      this.state.project.length === 0 &&
      this.state.errors.project.length === 0
    ) {
      this.setState({
        errors: {
          date: this.state.errors.date,
          project: this.state.errors.project || "Project can't be empty",
          pour: this.state.errors.pour,
          mixdesign: this.state.errors.mixdesign
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      this.state.pour.length === 0 &&
      this.state.errors.pour.length === 0
    ) {
      this.setState({
        errors: {
          date: this.state.errors.date,
          project: this.state.errors.project,
          pour: this.state.errors.pour || "Pour can't be empty",
          mixdesign: this.state.errors.mixdesign
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      this.state.mixdesign.length === 0 &&
      this.state.errors.mixdesign.length === 0
    ) {
      this.setState({
        errors: {
          date: this.state.errors.date,
          project: this.state.errors.project,
          pour: this.state.errors.pour,
          mixdesign: this.state.errors.mixdesign || "Mix Design can't be empty"
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    } else if (
      this.state.date.length === 0 &&
      this.state.project.length === 0 &&
      this.state.pour.length === 0 &&
      this.state.mixdesign.length === 0
    ) {
      this.setState({ formValid: this.validateForm(this.state.errors) });
      this.setState({ errorCount: this.countErrors(this.state.errors) });
      console.log(this.state.designation_name);
      const data = {
        // i: this.state.designation_code,
        date: this.state.date,
        project: this.state.project,
        pour: this.state.pour,
        mixdesign: this.state.mixdesign
      };
      if (this.state.type === "edit") {
        const data = {
          id: this.state.code,
          date: this.state.date,
          project: this.state.project,
          pour: this.state.pour,
          mixdesign: this.state.mixdesign
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
                code: "",
                project: "",
                date: "",
                pour: "",
                mixdesign: "",

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
          id: this.state.code,
          date: this.state.date,
          project: this.state.project,
          pour: this.state.pour,
          mixdesign: this.state.mixdesign
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
                  code: "",
                  date: "",
                  project: "",
                  pour: "",
                  mixdesign: "",
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
        pour: errors.pour,
        project: errors.project,
        mixdesign: errors.mixdesign,
        date: ""
      }
    });
  }

  componentDidMount() {
    this.getAllproject();
    this.getallPour();
    this.getallMixdesign();
    console.log(this.props.screen);
  }
  render() {
    const { visible, loading, errors, errorCount } = this.state;
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
          width='500px'
          visible={visible}
          okType='default'
          closable={false}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key='back' onClick={this.handleCancel}>
              Cancel
            </Button>,
            <PrimaryButton
              key='submit'
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
            <div className='input_wrapper'>
              <label for='mixdesign' className='label'>
                Mix Design:
              </label>

              <Select
                showSearch
                style={{ width: 180 }}
                id='mixdesign'
                name='mixdesign'
                placeholder='Select a Mix Design'
                optionFilterProp='children'
                onChange={value => this.handleSelect("plant", value)}
                // onFocus={onFocus}
                value={this.state.mixdesignEdit}
                // onBlur={onBlur}
                // onSearch={onSearch}
              >
                {this.state.SelectMix}
              </Select>
              {errors.mixdesign.length > 0 && (
                <div style={error}>{errors.mixdesign}</div>
              )}
              <div style={error}>{this.state.errormgs}</div>
              <div style={{ height: "12px" }}></div>
            </div>

            <div className='input_wrapper'>
              <label for='project' className='label'>
                Project:
              </label>

              <Select
                showSearch
                style={{ width: 180 }}
                id='project'
                name='project'
                placeholder='Select a Project'
                optionFilterProp='children'
                onChange={value => this.handleSelect("plant", value)}
                // onFocus={onFocus}
                value={this.state.projectEdit}
                // onBlur={onBlur}
                // onSearch={onSearch}
              >
                {this.state.SelectProject}
              </Select>
              {errors.project.length > 0 && (
                <div style={error}>{errors.project}</div>
              )}
              <div style={error}>{this.state.errormgs}</div>
              <div style={{ height: "12px" }}></div>
            </div>

            <div className='input_wrapper'>
              <label for='pour' className='label'>
                Pour:
              </label>

              <Select
                showSearch
                style={{ width: 180 }}
                id='pour'
                name='pour'
                placeholder='Select a Pour'
                optionFilterProp='children'
                onChange={value => this.handleSelect("plant", value)}
                // onFocus={onFocus}
                value={this.state.pourEdit}
                // onBlur={onBlur}
                // onSearch={onSearch}
              >
                {this.state.SelectPour}
              </Select>
              {errors.pour.length > 0 && <div style={error}>{errors.pour}</div>}
              <div style={error}>{this.state.errormgs}</div>
              <div style={{ height: "12px" }}></div>
            </div>

            <div className='input_wrapper'>
              <label for='date' className='label'>
                Date:
              </label>

              <DatePicker
                id='date'
                name='date'
                format={"YYYY-MM-DD"}
                style={{ width: 170 }}
                value={this.state.date}
                onChange={(dateString, field) =>
                  this.handleDates("date", dateString, field)
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
