import React, { Component } from "react";
import { Input, Modal, Icon, Button, Select } from "antd";

import {
  MasterLevelFormTitle,
  MasterLevelForm
} from "../../../styledcomponents/form/MasterLevelForms";
import { api } from "../../../services/AxiosService";
import { connect } from "react-redux";
import Notification from "../../../Constant/Notification";
import HandelError from "../../../Constant/HandleError";
import { PrimaryButton } from "../../../styledcomponents/button/button";
import TextArea from "antd/lib/input/TextArea";
import { DISABLE_EDIT_MODE } from "../../../../redux/action/master/plantlevel/PlantLevel";

const Option = Select;

const error = {
  color: "red",
  fontSize: "12px",
  width: "160px",
  height: "0.2px"
};

class AddPourForm extends Component {
  state = {
    loading: false,
    visible: false,
    type: "add",
    errors: {
      pour_name: "",
      project: ""
    },
    code: "",
    pour_name: "",
    project: "",
    description: "",
    projectEdit: "",
    project_code: "",
    projectsList: []
  };

  showModal = () => {
    this.setState({
      visible: true
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
      case "pour_name":
        errors.pour_name =
          value.length === 0
            ? "Pour No can't be empty"
            : value.length < 3
            ? "Pour No \n must be 3 characters long!"
            : // : !isNaN(value)
              // ? "Pour No won't allow only letters"
              "";
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
    // handle select for  plant
    if (name === "project") {
      this.setState({
        project: value,
        projectEdit: value
      });

      if (value.length !== 0) {
        this.setState({
          errors: {
            pour_name: errors.pour_name,
            project: ""
          }
        });
      }
    }
  };

  handleCancel = () => {
    if (this.state.type === "edit") {
      this.props.setPourVisibility();
    }
    this.setState({
      visible: false,
      type: "add",
      errors: {
        pour_name: "",
        project: ""
      },
      code: "",
      pour_name: "",
      project: "",
      description: "",
      projectEdit: "",
      project_code: ""
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      errors,
      code,
      pour_name,
      project,
      description,
      project_code
    } = this.state;
    if (pour_name.length === 0 && project.length === 0) {
      this.setState({
        errors: {
          pour_name: "Pour No can't be empty",
          project: "Project can't be empty"
        }
      });
    } else if (pour_name.length === 0 && errors.pour_name.length === 0) {
      this.setState({
        errors: {
          pour_name: errors.pour_name || "Pour No can't be empty",
          project: errors.project
        }
      });
    } else if (project.length === 0 && errors.project.length === 0) {
      this.setState({
        errors: {
          pour_name: errors.pour_name,
          project: errors.project || "Project can't be empty"
        }
      });
    } else if (errors.pour_name.length === 0 && errors.project.length === 0) {
      console.log("form is valid");
      if (this.state.type === "edit") {
        const data = {
          id: code,
          name: pour_name,
          description: description,
          projectCode: project_code
          // projectName: project
        };
        console.log(data);
        api("PUT", "supermix", "/pour", "", data, "")
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
                  code: "",
                  pour_name: "",
                  project: "",
                  description: "",
                  errormgs: ""
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
          name: pour_name,
          description: description,
          projectCode: project
        };
        console.log(data);
        api("POST", "supermix", "/pour", "", data, "").then(
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
                code: "",
                pour_name: "",
                project: "",
                description: "",
                errormgs: ""
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

  componentDidMount() {
    this.getAllProjects();
  }

  getAllProjects = () => {
    api("GET", "supermix", "/projects", "", "", "").then(res => {
      console.log(res.data);

      if (res.data.results.projects.length > 0) {
        let projectsList = res.data.results.projects.map((post, index) => {
          console.log(post.name);
          console.log("kkkkkkkkkk");
          return (
            <Option value={post.code} key={index}>
              {post.name}
            </Option>
          );
        });
        this.setState({
          projectsList
        });
      }
    });
  };
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.type);
    this.setState({
      visible: nextProps.visible,
      code: nextProps.editPlantData.id,
      pour_name: nextProps.editPlantData.name,
      project: nextProps.editPlantData.projectName,
      project_code: nextProps.editPlantData.projectCode,
      description: nextProps.editPlantData.description,
      type: nextProps.type
    });
  }

  render() {
    const {
      visible,
      loading,
      type,
      code,
      pour_name,
      project,
      project_code,
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
          Add Pour
        </PrimaryButton>
        <Modal
          visible={visible}
          closable={false}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key='back' onClick={this.handleCancel}>
              Return
            </Button>,
            <PrimaryButton
              key='submit'
              loading={loading}
              onClick={e => this.handleSubmit(e)}
              style={{ background: "#001328", color: "white", border: "none" }}
            >
              Submit
            </PrimaryButton>
          ]}
          title={
            <MasterLevelFormTitle>
              <p
                style={{
                  color: "white"
                }}
              >
                Add Pour
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
                  value={code}
                  // placeholder='Enter the Code '
                  disabled
                />
                <div style={{ height: "8px" }}></div>
              </div>
            ) : (
              ""
            )}

            <div className='input_wrapper'>
              <label for='pour_name' className='label'>
                Pour Name:
              </label>

              <Input
                id='pour_name'
                name='pour_name'
                placeholder=' Enter Pour No'
                value={pour_name}
                onChange={this.handleChange}
              />
              {errors.pour_name.length > 0 && (
                <div style={error}>{errors.pour_name}</div>
              )}
              <div style={{ height: "8px" }}></div>
            </div>

            <div className='input_wrapper' style={{ width: "200px" }}>
              <label for='project' className='label'>
                Project:
              </label>
              <Select
                id='project'
                name='project'
                placeholder=' Select Project'
                value={project}
                onChange={value => this.handleSelect("project", value)}
              >
                {this.state.projectsList}
              </Select>
              {errors.project.length > 0 && (
                <div style={error}>{errors.project}</div>
              )}
              <div style={{ height: "8px" }}></div>
            </div>
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
                style={{ width: "410px" }}
              />
              <div style={{ height: "8px" }}></div>
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
    setPourVisibility: () => {
      dispatch({ type: DISABLE_EDIT_MODE });
      console.log("edit modal closed");
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPourForm);
