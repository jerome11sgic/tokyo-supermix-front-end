import React, { Component } from "react";
import { Input, Modal, Button, Icon, Select } from "antd";
import {
  MasterLevelForm,
  MasterLevelFormTitle
} from "../../styledcomponents/form/MasterLevelForms";
import { PrimaryButton } from "../../styledcomponents/button/button";
import { api } from "../../services/AxiosService";
import { connect } from "react-redux";
import Notification from "../../Constant/Notification";
// import HandelError from "../../../Constant/HandleError";
import { DISABLE_EDIT_MODE } from "../../../redux/action/master/plantlevel/PlantLevel";
const { Option } = Select;
const error = {
  color: "red",
  fontSize: "12px",
  width: "160px",
  height: "2px"
};
class ConcreteTest extends Component {
  state = {
    visible: false,
    errors: {
      mix_design_code: "",
      plant_code: "",
      slump: "",
      temperature: "",
      water_content: "",
      status: ""
    },
    mix_design_code: "",
    plant_code: "",
    slump: "",
    temperature: "",
    water_content: "",
    status: "",
    type: "add",
    SelectPlants: "",
    selectMix: "",
    concreteTestId: "",
    edit_mix_design_code: "",
    edit_plant_code: ""
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({
      visible: nextProps.visible,
      concreteTestId: nextProps.editPlantData.id,
      mix_design_code: nextProps.editPlantData.mixDesignCode,
      plant_code: nextProps.editPlantData.plantCode,
      slump: nextProps.editPlantData.slump,
      temperature: nextProps.editPlantData.temperature,
      water_content: nextProps.editPlantData.waterContent,
      status: nextProps.editPlantData.status,
      edit_mix_design_code: nextProps.editPlantData.mixDesignCode,
      edit_plant_code: nextProps.editPlantData.plantName,
      type: nextProps.type
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
      errors: {
        mix_design_code: "",
        plant_code: "",
        slump: "",
        temperature: "",
        water_content: "",
        status: ""
      },
      mix_design_code: "",
      plant_code: "",
      slump: "",
      temperature: "",
      water_content: "",
      status: "",
      errormgs: ""
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      errors: {
        mix_design_code: "",
        plant_code: "",
        slump: "",
        temperature: "",
        water_content: "",
        status: ""
      },
      mix_design_code: "",
      plant_code: "",
      slump: "",
      temperature: "",
      water_content: "",
      status: "",
      errormgs: ""
    });
  };

  handleSelect = (name, value) => {
    console.log(name);
    console.log(value);
    // handle select for  plant
    if (name === "plant") {
      this.setState({
        plant_code: value,
        edit_plant_code: value
      });

      if (value.length !== 0) {
        this.setState({
          errors: {
            mix_design_code: this.state.errors.mix_design_code,
            plant_code: "",
            slump: this.state.errors.slump,
            temperature: this.state.errors.temperature,
            water_content: this.state.errors.water_content,
            status: this.state.errors.status
          }
        });
      }
    }

    //handle select for designation
    if (name === "mixdesign") {
      this.setState({
        mix_design_code: value,
        edit_mix_design_code: value
      });

      if (value.length !== 0) {
        this.setState({
          errors: {
            mix_design_code: "",
            plant_code: this.state.errors.plant_code,
            slump: this.state.errors.slump,
            temperature: this.state.errors.temperature,
            water_content: this.state.errors.water_content,
            status: this.state.errors.status
          }
        });
      }
    }

    if (name === "status") {
      this.setState({
        status: value
        // desiginationEdit: value
      });

      if (value.length !== 0) {
        this.setState({
          errors: {
            mix_design_code: this.state.errors.mix_design_code,
            plant_code: this.state.errors.plant_code,
            slump: this.state.errors.slump,
            temperature: this.state.errors.temperature,
            water_content: this.state.errors.water_content,
            status: ""
          }
        });
      }
    }
  };

  handleChange = (event, field) => {
    this.setState({ [field]: event.target.value });
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    console.log(name + " is \t" + value);
    switch (name) {
      case "mix_design_code":
        errors.mix_design_code =
          value.length === 0
            ? "mixdesign code can't be empty"
            : value.length < 2
            ? "mixdesign code must be one characters long!"
            : "";
        break;
      case "plant_code":
        errors.plant_code =
          value.length === 0
            ? "plant code can't be empty"
            : value.length < 2
            ? "plant code \n must be 3 characters long!"
            : "";
        break;
      case "slump":
        errors.slump =
          value.length === 0
            ? "slump can't be empty"
            : value.length < 1
            ? "slump must be 3 characters long!"
            : value.length > 20
            ? "slump \n must not be exceeded than 20 characters"
            : "";
        break;
      case "temperature":
        errors.temperature = value.length === 0 ? "Plant can't be empty" : "";
        break;
      case "water_content":
        errors.water_content =
          value.length === 0 ? "temperature can't be empty" : "";
        break;
      case "status":
        errors.status =
          value.length === 0
            ? "status can't be empty"
            : value.length < 1
            ? "status must be 6 characters long!"
            : "";
        break;

      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  getAllplant() {
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

  getallMixdesigns = () => {
    api("GET", "supermix", "/mix-designs", "", "", "").then(res => {
      console.log(res.data);
      let selectMix = res.data.results.mixDesigns.map((post, index) => {
        return (
          <Option value={post.code} key={index}>
            {post.code}
          </Option>
        );
      });
      this.setState({
        selectMix
      });
    });
  };
  componentDidMount() {
    this.getAllplant();
    this.getallMixdesigns();
  }
  handleSubmit = event => {
    event.preventDefault();
    if (
      // this.state.employee_code.length === 0 &&
      this.state.mix_design_code.length === 0 &&
      this.state.plant_code.length === 0 &&
      this.state.slump.length === 0 &&
      this.state.temperature.length === 0 &&
      this.state.water_content.length === 0 &&
      this.state.status.length === 0
    ) {
      this.setState({
        errors: {
          mix_design_code: "mix design code can't be empty",
          plant_code: "plant code can't be empty",
          slump: "slump can't be empty",
          temperature: "temperature can't be empty",
          water_content: "water content can't be empty",
          status: "status No can't be empty"
        }
      });
    } else if (
      this.state.mix_design_code.length === 0 &&
      this.state.errors.mix_design_code.length === 0
    ) {
      this.setState({
        errors: {
          mix_design_code:
            this.state.errors.mix_design_code ||
            "mix design code can't be empty",
          plant_code: this.state.errors.plant_code,
          slump: this.state.errors.slump,
          temperature: this.state.errors.temperature,
          water_content: this.state.errors.water_content,
          status: this.state.errors.status
        }
      });
    } else if (
      this.state.plant_code.length === 0 &&
      this.state.errors.plant_code.length === 0
    ) {
      this.setState({
        errors: {
          mix_design_code: this.state.errors.mix_design_code,
          plant_code:
            this.state.errors.plant_code || "plant code can't be empty",
          slump: this.state.errors.slump,
          temperature: this.state.errors.temperature,
          water_content: this.state.errors.water_content,
          status: this.state.errors.status
        }
      });
    } else if (
      this.state.slump.length === 0 &&
      this.state.errors.slump.length === 0
    ) {
      this.setState({
        errors: {
          mix_design_code: this.state.errors.mix_design_code,
          plant_code: this.state.errors.plant_code,
          slump: this.state.errors.slump || "slump  can't be empty",
          temperature: this.state.errors.temperature,
          water_content: this.state.errors.water_content,
          status: this.state.errors.status
        }
      });
    } else if (
      this.state.temperature.length === 0 &&
      this.state.errors.temperature.length === 0
    ) {
      this.setState({
        errors: {
          mix_design_code: this.state.errors.mix_design_code,
          plant_code: this.state.errors.plant_code,
          slump: this.state.errors.slump,
          temperature:
            this.state.errors.temperature || "temperature can't be empty",
          water_content: this.state.errors.water_content,
          status: this.state.errors.status
        }
      });
    } else if (
      this.state.water_content.length === 0 &&
      this.state.errors.water_content.length === 0
    ) {
      this.setState({
        errors: {
          mix_design_code: this.state.errors.mix_design_code,
          plant_code: this.state.errors.plant_code,
          slump: this.state.errors.slump,
          temperature: this.state.errors.temperature,
          water_content:
            this.state.errors.water_content || "water content  can't be empty",
          status: this.state.errors.status
        }
      });
    } else if (
      this.state.status.length === 0 &&
      this.state.errors.status.length === 0
    ) {
      this.setState({
        errors: {
          mix_design_code: this.state.errors.mix_design_code,
          plant_code: this.state.errors.plant_code,
          slump: this.state.errors.slump,
          temperature: this.state.errors.temperature,
          water_content: this.state.errors.water_content,
          status: this.state.errors.status || " status  can't be empty"
        }
      });
    } else if (
      // this.state.code.length === 0 &&
      this.state.errors.mix_design_code.length === 0 &&
      this.state.errors.plant_code.length === 0 &&
      this.state.errors.slump.length === 0 &&
      this.state.errors.temperature.length === 0 &&
      this.state.errors.water_content.length === 0 &&
      this.state.errors.status.length === 0
    ) {
      console.log(this.state.errors);

      if (this.state.type === "edit") {
        const data = {
          id: this.state.concreteTestId,
          mixDesignCode: this.state.mix_design_code,
          plantCode: this.state.plant_code,
          slump: this.state.slump,
          temperature: this.state.temperature,
          waterContent: this.state.water_content,
          status: this.state.status
        };
        console.log(data);
        api("PUT", "supermix", "/concrete-test", "", data, "")
          .then(
            res => {
              console.log(res.data);
              if (res.data.status === "VALIDATION_FAILURE") {
                console.log("update");
                this.responeserror(res.data.results.name.message);
              } else {
                Notification("success", res.data.message);
                this.props.reload();
                this.setState({ loading: true });
                this.setState({
                  errors: {
                    mix_design_code: "",
                    plant_code: "",
                    slump: "",
                    temperature: "",
                    water_content: "",
                    status: ""
                  },
                  mix_design_code: "",
                  plant_code: "",
                  slump: "",
                  temperature: "",
                  water_content: "",
                  status: "",
                  errormgs: ""
                });
                setTimeout(() => {
                  this.setState({ loading: false, visible: false });
                }, 200);
              }
            },
            error => {
              //   this.setState({
              //     errorvalmegss: error.validationFailures[0]
              //   });
              console.log("DEBUG34: ", error);
              //   console.log(HandelError(error.validationFailures[0]));
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
          mixDesignCode: this.state.mix_design_code,
          plantCode: this.state.plant_code,
          slump: this.state.slump,
          temperature: this.state.temperature,
          waterContent: this.state.water_content,
          status: this.state.status
        };
        console.log(data);
        api("POST", "supermix", "/concrete-test", "", data, "").then(
          res => {
            console.log(res.data);
            if (res.data.status === "VALIDATION_FAILURE") {
              console.log("add");
            } else {
              Notification("success", res.data.message);
              this.props.reload();
              this.setState({ loading: true });
              this.setState({
                errors: {
                  mix_design_code: "",
                  plant_code: "",
                  slump: "",
                  temperature: "",
                  water_content: "",
                  status: ""
                },
                mix_design_code: "",
                plant_code: "",
                slump: "",
                temperature: "",
                water_content: "",
                status: "",
                errormgs: ""
              });
              setTimeout(() => {
                this.setState({ loading: false, visible: false });
              }, 200);
            }
          },
          error => {
            // this.setState({
            //   errorvalmegss: error.validationFailures[0]
            // });
            console.log("DEBUG34: ", error);
            // console.log(HandelError(error.validationFailures[0]));
          }
        );
      }

      // console.log(data);
      console.log("form is valid");
    }
  };

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
            width: "120px",
            marginLeft: "-10px"
          }}
        >
          Add Test Details
        </PrimaryButton>
        <Modal
          width="850px"
          visible={visible}
          closable={false}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          title={
            <MasterLevelFormTitle>
              <p
                style={{
                  color: "white"
                }}
              >
                {this.state.type === "edit" ? "Edit " : "Add Test Details"}
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
              {this.state.type === "edit" ? "Edit" : "Save"}
            </PrimaryButton>
          ]}
        >
          <MasterLevelForm>
            <div className="input_wrapper">
              <label for="plant" className="label">
                Mix Design Code
              </label>

              <Select
                showSearch
                style={{ width: 180 }}
                id="mix_design_code"
                name="mix_design_code"
                placeholder="Select a Code"
                onChange={value => this.handleSelect("mixdesign", value)}
                value={this.state.edit_mix_design_code}
              >
                {this.state.selectMix}
              </Select>
              {errors.mix_design_code.length > 0 && (
                <div style={error}>{errors.mix_design_code}</div>
              )}

              <div style={{ height: "12px" }}></div>
            </div>
            <div className="input_wrapper">
              <label for="plant code" className="label">
                Plant Code
              </label>

              <Select
                showSearch
                style={{ width: 180 }}
                id="plant_code"
                name="plant_code"
                placeholder="Select a Code"
                onChange={value => this.handleSelect("plant", value)}
                value={this.state.edit_plant_code}
              >
                {this.state.SelectPlants}
              </Select>
              {errors.plant_code.length > 0 && (
                <div style={error}>{errors.plant_code}</div>
              )}
              <div style={{ height: "12px" }}></div>
            </div>
            {/* Code */}
            <div className="input_wrapper">
              <label for="slump" className="label">
                Slump:
              </label>

              <Input
                id="slump"
                name="slump"
                placeholder="Enter the Slump "
                onChange={this.handleChange}
                value={this.state.slump}
              />
              {errors.slump.length > 0 && (
                <div style={error}>{errors.slump}</div>
              )}
              <div style={{ height: "12px" }}></div>
            </div>

            {/* Plant Name */}
            <div className="input_wrapper">
              <label for="temperature" className="label">
                Temperature:
              </label>

              <Input
                id="temperature"
                name="temperature"
                placeholder="Enter the Temperature"
                onChange={this.handleChange}
                value={this.state.temperature}
              />
              {errors.temperature.length > 0 && (
                <div style={error}>{errors.temperature}</div>
              )}
              <div style={{ height: "12px" }}></div>
            </div>

            {/* Place */}
            <div className="input_wrapper">
              <label for="last_name" className="label">
                Water Content:
              </label>

              <Input
                id="water_content"
                name="water_content"
                placeholder="Enter the water content"
                onChange={this.handleChange}
                value={this.state.water_content}
              />
              {errors.water_content.length > 0 && (
                <div style={error}>{errors.water_content}</div>
              )}
              <div style={{ height: "12px" }}></div>
            </div>

            <div className="input_wrapper">
              <label for="status" className="label">
                Status:
              </label>
              <Select
                id="status"
                name="status"
                placeholder="Enter the status"
                style={{ width: 180 }}
                value={this.state.status}
                onChange={value => this.handleSelect("status", value)}
              >
                <Option value="PASS">Pass</Option>
                <Option value="FAIL">Fail</Option>
                <Option value="PROCESS">Process</Option>
              </Select>
              {errors.status.length > 0 && (
                <div style={error}>{errors.status}</div>
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
    setConcreteTestVisibility: () => {
      dispatch({ type: DISABLE_EDIT_MODE });
      console.log("edit modal closed");
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConcreteTest);
