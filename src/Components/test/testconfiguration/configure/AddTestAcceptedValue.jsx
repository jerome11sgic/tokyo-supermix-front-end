import React, { Component } from "react";
import { Input, Select, Switch } from "antd";

import TextArea from "antd/lib/input/TextArea";
import { FlexContainer } from "../../../styledcomponents/container/FlexGrid";
import {
  MasterLevelForm,
  MasterLevelFormTitle
} from "../../../styledcomponents/form/MasterLevelForms";
import { TileParagraph } from "../../../styledcomponents/typography/typography";
import { PrimaryButton } from "../../../styledcomponents/button/button";
import theme from "../../../../theme";
import { api } from "../../../services/AxiosService";
import Notification from "../../../Constant/Notification";

const { Option } = Select;
const error = {
  color: "red",
  fontSize: "12px",
  width: "170px",
  height: "0.2px"
};

const minierror = {
  width: "90px",
  color: "red",
  fontSize: "12px",
  height: "0.2px"
};

export default class AddTestAcceptedValue extends Component {
  constructor(props) {
    super(props);

    this.state = {
      switchVal: false,
      test_name: undefined,
      parameter: undefined,
      unit: undefined,
      maximum: "",
      minimum: "",
      subCategory: undefined,
      material: undefined,
      switchValMaximum: "",
      switchValMinimum: "",
      errors: {
        parameter: "",
        unit: "",
        maximum: "",
        minimum: ""
      },
      optErrors: {
        subCategory: "",
        material: "",
        switchValMaximum: "",
        switchValMinimum: ""
      },
      errormsgs: ""
    };
  }

  handleSelect = (name, value) => {
    const { errors, optErrors } = this.state;
    console.log(value + " of " + name);

    //test
    if (name === "test_name") {
      this.setState({
        test_name: value
      });
    }

    //parameter
    if (name === "parameter") {
      this.setState({
        parameter: value,
        errors: {
          parameter: "",
          unit: errors.unit,
          maximum: errors.maximum,
          minimum: errors.minimum
        },
        optErrors: {
          subCategory: optErrors.subCategory,
          material: optErrors.material,
          switchValMaximum: optErrors.switchValMaximum,
          switchValMinimum: optErrors.switchValMinimum
        }
      });
    }

    //unit
    if (name === "unit") {
      this.setState({
        unit: value,
        errors: {
          parameter: errors.parameter,
          unit: "",
          maximum: errors.maximum,
          minimum: errors.minimum
        },
        optErrors: {
          subCategory: optErrors.subCategory,
          material: optErrors.material,
          switchValMaximum: optErrors.switchValMaximum,
          switchValMinimum: optErrors.switchValMinimum
        }
      });
    }

    //subCategory
    if (name === "subCategory") {
      this.setState({
        subCategory: value,
        errors: {
          parameter: errors.parameter,
          unit: errors.unit,
          maximum: errors.maximum,
          minimum: errors.minimum
        },
        optErrors: {
          subCategory: "",
          material: optErrors.material,
          switchValMaximum: optErrors.switchValMaximum,
          switchValMinimum: optErrors.switchValMinimum
        }
      });
    }

    //material
    if (name === "material") {
      this.setState({
        material: value,
        errors: {
          parameter: errors.parameter,
          unit: errors.unit,
          maximum: errors.maximum,
          minimum: errors.minimum
        },
        optErrors: {
          subCategory: optErrors.subCategory,
          material: "",
          switchValMaximum: optErrors.switchValMaximum,
          switchValMinimum: optErrors.switchValMinimum
        }
      });
    }
  };

  handleChange = (event, field) => {
    this.setState({ [field]: event.target.value });
    this.setState({ errormgs: "" });
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    let optErrors = this.state.optErrors;
    // console.log(name + " is \t" + value);
    switch (name) {
      case "maximum":
        errors.maximum =
          value.length === 0
            ? "maximum can't be empty"
            : isNaN(value)
            ? "maximum won't allow only letters"
            : "";
        break;
      case "minimum":
        errors.minimum =
          value.length === 0
            ? "minimum can't be empty"
            : isNaN(value)
            ? "minimum won't allow only letters"
            : "";
        break;
      case "switchValMaximum":
        optErrors.switchValMaximum =
          value.length === 0
            ? "maximum can't be empty"
            : isNaN(value)
            ? "maximum won't allow only letters"
            : "";
        break;
      case "switchValMinimum":
        optErrors.switchValMinimum =
          value.length === 0
            ? "minimum can't be empty"
            : isNaN(value)
            ? "minimum won't allow only letters"
            : "";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  onChange(checked) {
    console.log(`switch to ${checked}`);
    if (checked === true) {
      console.log("true");
      this.setState({
        switchVal: true
      });
    }
    if (checked === false) {
      console.log("false");
      this.setState({
        switchVal: false
      });
    }
  }

  //get all for parameter select
  getAllParameters() {
    api("GET", "supermix", "/parameters", "", "", "").then(res => {
      console.log(res.data.results);
      if (res.data.results.parameters.length > 0) {
        console.log("got parameters");
        let SelectParameter = res.data.results.parameters.map((post, index) => {
          return (
            <Option value={post.id} key={index}>
              {post.name}
            </Option>
          );
        });
        this.setState({
          SelectParameter
        });
      }
    });
  }

  //get all for unit select
  getAllUnits() {
    api("GET", "supermix", "/units", "", "", "").then(res => {
      console.log(res.data.results);
      if (res.data.results.units.length > 0) {
        console.log("got units");
        let SelectUnit = res.data.results.units.map((post, index) => {
          return (
            <Option value={post.id} key={index}>
              {post.unit}
            </Option>
          );
        });
        this.setState({
          SelectUnit
        });
      }
    });
  }

  //get all for materials select
  getAllMaterials() {
    api("GET", "supermix", "/raw-materials", "", "", "").then(res => {
      console.log(res.data.results);
      if (res.data.results.rawMaterial.length > 0) {
        console.log("got materials");
        let SelectMaterial = res.data.results.rawMaterial.map((post, index) => {
          return (
            <Option value={post.id} key={index}>
              {post.name}
            </Option>
          );
        });
        this.setState({
          SelectMaterial
        });
      }
    });
  }
  //get all for sub category select
  getAllSubCategories() {
    api("GET", "supermix", "/material-sub-categories", "", "", "").then(res => {
      console.log(res.data.results);
      if (res.data.results.materialSubCategories.length > 0) {
        console.log("got sub categories");
        let SelectSubCategories = res.data.results.materialSubCategories.map(
          (post, index) => {
            return (
              <Option value={post.id} key={index}>
                {post.name}
              </Option>
            );
          }
        );
        this.setState({
          SelectSubCategories
        });
      }
    });
  }

  //get all for sub category select
  getAllTest() {
    api("GET", "supermix", "/tests", "", "", "").then(res => {
      console.log(res.data.results);
      if (res.data.results.test.length > 0) {
        console.log("got sub categories");
        let SelectTest = res.data.results.test.map((post, index) => {
          return (
            <Option value={post.id} key={index}>
              {post.name}
            </Option>
          );
        });
        this.setState({
          SelectTest,
          test_name: res.data.results.test[res.data.results.test.length - 1].id
        });
      }
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const {
      switchVal,
      errors,
      material,
      maximum,
      minimum,
      parameter,
      subCategory,
      switchValMaximum,
      switchValMinimum,
      unit,
      optErrors,
      test_name
    } = this.state;
    let eM = "can't be empty";

    // Case : SwitchVal is True
    if (switchVal) {
      console.log("validate for all fields");
      if (
        parameter === undefined &&
        unit === undefined &&
        maximum.length === 0 &&
        minimum.length === 0 &&
        subCategory === undefined &&
        material === undefined &&
        switchValMaximum.length === 0 &&
        switchValMinimum.length === 0
      ) {
        this.setState({
          errors: {
            parameter: `parameter ${eM}`,
            unit: `unit ${eM}`,
            maximum: `maximum ${eM}`,
            minimum: `minimum ${eM}`
          },
          optErrors: {
            subCategory: `sub category ${eM}`,
            material: `material ${eM}`,
            switchValMaximum: `maximum ${eM}`,
            switchValMinimum: `minimum ${eM}`
          }
        });
      } else if (parameter === undefined && errors.parameter.length === 0) {
        this.setState({
          errors: {
            parameter: errors.parameter || `parameter ${eM}`,
            unit: errors.unit,
            maximum: errors.maximum,
            minimum: errors.minimum
          },
          optErrors: {
            subCategory: optErrors.subCategory,
            material: optErrors.material,
            switchValMaximum: optErrors.switchValMaximum,
            switchValMinimum: optErrors.switchValMinimum
          }
        });
      } else if (unit === undefined && errors.unit.length === 0) {
        this.setState({
          errors: {
            parameter: errors.parameter,
            unit: errors.unit || `unit ${eM}`,
            maximum: errors.maximum,
            minimum: errors.minimum
          },
          optErrors: {
            subCategory: optErrors.subCategory,
            material: optErrors.material,
            switchValMaximum: optErrors.switchValMaximum,
            switchValMinimum: optErrors.switchValMinimum
          }
        });
      } else if (maximum.length === 0 && errors.maximum.length === 0) {
        this.setState({
          errors: {
            parameter: errors.parameter,
            unit: errors.unit,
            maximum: errors.maximum || `maximum ${eM}`,
            minimum: errors.minimum
          },
          optErrors: {
            subCategory: optErrors.subCategory,
            material: optErrors.material,
            switchValMaximum: optErrors.switchValMaximum,
            switchValMinimum: optErrors.switchValMinimum
          }
        });
      } else if (minimum.length === 0 && errors.minimum.length === 0) {
        this.setState({
          errors: {
            parameter: errors.parameter,
            unit: errors.unit,
            maximum: errors.maximum,
            minimum: errors.minimum || `minimum ${eM}`
          },
          optErrors: {
            subCategory: optErrors.subCategory,
            material: optErrors.material,
            switchValMaximum: optErrors.switchValMaximum,
            switchValMinimum: optErrors.switchValMinimum
          }
        });
      }
      // OptError Area Start
      else if (
        subCategory === undefined &&
        optErrors.subCategory.length === 0
      ) {
        this.setState({
          errors: {
            parameter: errors.parameter,
            unit: errors.unit,
            maximum: errors.maximum,
            minimum: errors.minimum
          },
          optErrors: {
            subCategory: optErrors.subCategory || `sub category ${eM}`,
            material: optErrors.material,
            switchValMaximum: optErrors.switchValMaximum,
            switchValMinimum: optErrors.switchValMinimum
          }
        });
      } else if (material === undefined && optErrors.material.length === 0) {
        this.setState({
          errors: {
            parameter: errors.parameter,
            unit: errors.unit,
            maximum: errors.maximum,
            minimum: errors.minimum
          },
          optErrors: {
            subCategory: optErrors.subCategory,
            material: optErrors.material || `material ${eM}`,
            switchValMaximum: optErrors.switchValMaximum,
            switchValMinimum: optErrors.switchValMinimum
          }
        });
      } else if (
        switchValMaximum.length === 0 &&
        optErrors.switchValMaximum.length === 0
      ) {
        this.setState({
          errors: {
            parameter: errors.parameter,
            unit: errors.unit,
            maximum: errors.maximum,
            minimum: errors.minimum
          },
          optErrors: {
            subCategory: optErrors.subCategory,
            material: optErrors.material,
            switchValMaximum: optErrors.switchValMaximum || `maximum ${eM}`,
            switchValMinimum: optErrors.switchValMinimum
          }
        });
      } else if (
        switchValMinimum.length === undefined &&
        optErrors.switchValMaximum.length === 0
      ) {
        this.setState({
          errors: {
            parameter: errors.parameter,
            unit: errors.unit,
            maximum: errors.maximum,
            minimum: errors.minimum
          },
          optErrors: {
            subCategory: optErrors.subCategory,
            material: optErrors.material,
            switchValMaximum: optErrors.switchValMaximum,
            switchValMinimum: optErrors.switchValMinimum || `minimum ${eM}`
          }
        });
      } else if (
        errors.parameter.length === 0 &&
        errors.unit.length === 0 &&
        errors.maximum.length === 0 &&
        errors.minimum.length === 0 &&
        optErrors.subCategory.length === 0 &&
        optErrors.material.length === 0 &&
        optErrors.switchValMaximum.length === 0 &&
        optErrors.switchValMinimum.length === 0
      ) {
        console.log("form is valid with switch");
        const switchedData = {
          parameterId: parameter,
          unitId: unit,
          maxValue: maximum,
          minValue: minimum,
          materialSubCategoryId: subCategory,
          materialId: material,
          materialMaximum: switchValMaximum,
          materialMinimum: switchValMinimum
        };
        console.log(switchedData);
      }
    }
    // Case : SwitchVal is False
    else {
      console.log("validate for only 4 fields");
      if (
        parameter === undefined &&
        unit === undefined &&
        maximum.length === 0 &&
        minimum.length === 0
      ) {
        this.setState({
          errors: {
            parameter: `parameter ${eM}`,
            unit: `unit ${eM}`,
            maximum: `maximum ${eM}`,
            minimum: `minimum ${eM}`
          },
          optErrors: {
            subCategory: "",
            material: "",
            switchValMaximum: "",
            switchValMinimum: ""
          }
        });
      } else if (parameter === undefined && errors.parameter.length === 0) {
        this.setState({
          errors: {
            parameter: errors.parameter || `parameter ${eM}`,
            unit: errors.unit,
            maximum: errors.maximum,
            minimum: errors.minimum
          },
          optErrors: {
            subCategory: "",
            material: "",
            switchValMaximum: "",
            switchValMinimum: ""
          }
        });
      } else if (unit === undefined && errors.unit.length === 0) {
        this.setState({
          errors: {
            parameter: errors.parameter,
            unit: errors.unit || `unit ${eM}`,
            maximum: errors.maximum,
            minimum: errors.minimum
          },
          optErrors: {
            subCategory: "",
            material: "",
            switchValMaximum: "",
            switchValMinimum: ""
          }
        });
      } else if (maximum.length === 0 && errors.maximum.length === 0) {
        this.setState({
          errors: {
            parameter: errors.parameter,
            unit: errors.unit,
            maximum: errors.maximum || `maximum ${eM}`,
            minimum: errors.minimum
          },
          optErrors: {
            subCategory: "",
            material: "",
            switchValMaximum: "",
            switchValMinimum: ""
          }
        });
      } else if (minimum.length === 0 && errors.minimum.length === 0) {
        this.setState({
          errors: {
            parameter: errors.parameter,
            unit: errors.unit,
            maximum: errors.maximum,
            minimum: errors.minimum || `minimum ${eM}`
          },
          optErrors: {
            subCategory: "",
            material: "",
            switchValMaximum: "",
            switchValMinimum: ""
          }
        });
      } else if (
        errors.parameter.length === 0 &&
        errors.unit.length === 0 &&
        errors.maximum.length === 0 &&
        errors.minimum.length === 0
      ) {
        console.log("form is valid");
        const unSwitchedData = {
          testId: test_name,
          parameterId: parameter,
          unitId: unit,
          maxValue: maximum,
          minValue: minimum
        };
        console.log(unSwitchedData);
        api("POST", "supermix", "/accepted-value", "", unSwitchedData, "").then(
          res => {
            console.log(res.data);
            Notification("success", res.data.message);
            // this.props.reload();
            this.setState({
              switchVal: false,
              test_name: undefined,
              parameter: undefined,
              unit: undefined,
              maximum: "",
              minimum: "",
              subCategory: undefined,
              material: undefined,
              switchValMaximum: "",
              switchValMinimum: "",
              errors: {
                parameter: "",
                unit: "",
                maximum: "",
                minimum: ""
              },
              optErrors: {
                subCategory: "",
                material: "",
                switchValMaximum: "",
                switchValMinimum: ""
              },
              errormsgs: ""
            });
          },
          error => {
            console.log(error);
          }
        );
      }
    }
  };

  componentDidMount() {
    this.getAllParameters();
    this.getAllUnits();
    this.getAllMaterials();
    this.getAllSubCategories();
    this.getAllTest();
  }

  render() {
    const {
      switchVal,
      errors,
      material,
      maximum,
      minimum,
      parameter,
      subCategory,
      switchValMaximum,
      switchValMinimum,
      unit,
      optErrors,
      test_name
    } = this.state;
    return (
      <FlexContainer stepsarea style={{ marginTop: "40px" }}>
        <div testconfig>
          <MasterLevelFormTitle nomargin>
            <TileParagraph>Accepted Value</TileParagraph>
          </MasterLevelFormTitle>
          {/* <Divider style={{marginTop:'-5px'}}/> */}

          <MasterLevelForm
            filled
            borderRadiused
            style={{
              justifyContent: "space-around",
              paddingBottom: "20px",
              paddingLeft: "40px",
              paddingRight: "60px",
              paddingTop: "10px",
              width: "700px"
            }}
          >
            {/* Test */}
            <div className='input_wrapper'>
              <label for='test_name' className='label'>
                Test
              </label>
              <Select
                id='test_name'
                name='test_name'
                placeholder='Select Test'
                style={{ width: 170 }}
                value={test_name}
                onChange={value => this.handleSelect("test_name", value)}
              >
                {this.state.SelectTest}
              </Select>
              <div style={{ height: "6px" }}></div>
            </div>

            {/* Parameter */}
            <div className='input_wrapper'>
              <label for='parameter' className='label'>
                Parameter
              </label>
              <Select
                id='parameter'
                name='parameter'
                placeholder='Select Parameter'
                style={{ width: 170 }}
                value={parameter}
                onChange={value => this.handleSelect("parameter", value)}
              >
                {this.state.SelectParameter}
              </Select>
              {errors.parameter.length > 0 && (
                <div style={error}>{errors.parameter}</div>
              )}
              <div style={{ height: "6px" }}></div>
            </div>

            {/* Unit */}
            <div className='input_wrapper'>
              <label for='unit' className='label'>
                Unit
              </label>
              <Select
                id='unit'
                name='unit'
                placeholder='Select Unit'
                style={{ width: 170 }}
                value={unit}
                onChange={value => this.handleSelect("unit", value)}
              >
                {this.state.SelectUnit}
              </Select>
              {errors.unit.length > 0 && <div style={error}>{errors.unit}</div>}
              <div style={{ height: "6px" }}></div>
            </div>

            <FlexContainer home>
              <div className='input_wrapper'>
                <PrimaryButton type='ghost'>Between</PrimaryButton>
                <div style={{ height: "18px" }}></div>
              </div>
              {/* Maximum  */}
              <div className='input_wrapper'>
                <Input
                  id='maximum'
                  name='maximum'
                  placeholder='Maximum'
                  style={{ width: 90 }}
                  value={maximum}
                  onChange={this.handleChange}
                />
                {errors.maximum.length > 0 && (
                  <div style={minierror}>{errors.maximum}</div>
                )}
                <div style={{ height: "12px" }}></div>
              </div>

              <div className='input_wrapper'>
                <PrimaryButton type='ghost'>To</PrimaryButton>
                <div style={{ height: "12px" }}></div>
              </div>

              {/* Minimum  */}
              <div className='input_wrapper'>
                <Input
                  id='minimum'
                  name='minimum'
                  placeholder='Minimum'
                  style={{ width: 90 }}
                  value={minimum}
                  onChange={this.handleChange}
                />
                {errors.minimum.length > 0 && (
                  <div style={minierror}>{errors.minimum}</div>
                )}
                <div style={{ height: "12px" }}></div>
              </div>
              {/* Material */}
              <div className='input_wrapper' style={{ marginTop: "5px" }}>
                <label for='material_switch' className='label'>
                  Material
                </label>
                <Switch
                  onChange={checked => this.onChange(checked)}
                  value={switchVal}
                />
                <div style={{ height: "12px" }}></div>
              </div>
            </FlexContainer>

            {switchVal === true ? (
              <FlexContainer home>
                {/* Sub Category */}
                <div className='input_wrapper'>
                  <label for='subCategory' className='label'>
                    Sub Category
                  </label>
                  <Select
                    id='subCategory'
                    name='subCategory'
                    placeholder='Select Sub Category'
                    style={{ width: 170 }}
                    value={subCategory}
                    onChange={value => this.handleSelect("subCategory", value)}
                  >
                    {this.state.SelectSubCategories}
                  </Select>
                  {optErrors.subCategory.length > 0 && (
                    <div style={error}>{optErrors.subCategory}</div>
                  )}
                  <div style={{ height: "12px" }}></div>
                </div>

                {/* Material */}
                <div className='input_wrapper'>
                  <label for='material' className='label'>
                    Material
                  </label>
                  <Select
                    id='material'
                    name='material'
                    placeholder='Select Material'
                    style={{ width: 160 }}
                    value={material}
                    onChange={value => this.handleSelect("material", value)}
                  >
                    {this.state.SelectMaterial}
                  </Select>
                  {optErrors.material.length > 0 && (
                    <div style={error}>{optErrors.material}</div>
                  )}
                  <div style={{ height: "12px" }}></div>
                </div>
              </FlexContainer>
            ) : (
              ""
            )}
            {switchVal === true ? (
              <FlexContainer home>
                <div className='input_wrapper'>
                  <PrimaryButton type='ghost'>Between</PrimaryButton>
                  <div style={{ height: "12px" }}></div>
                </div>
                {/* Maximum  */}
                <div className='input_wrapper'>
                  <Input
                    id='switchValMaximum'
                    name='switchValMaximum'
                    placeholder='maximum'
                    style={{ width: 90 }}
                    value={switchValMaximum}
                    onChange={this.handleChange}
                  />
                  {optErrors.switchValMaximum.length > 0 && (
                    <div style={minierror}>{optErrors.switchValMaximum}</div>
                  )}
                  <div style={{ height: "12px" }}></div>
                </div>

                <div className='input_wrapper'>
                  <PrimaryButton type='ghost'>To</PrimaryButton>
                  <div style={{ height: "12px" }}></div>
                </div>

                {/* Minimum  */}
                <div className='input_wrapper'>
                  <Input
                    id='switchValMinimum'
                    name='switchValMinimum'
                    placeholder='minimum'
                    style={{ width: 90 }}
                    value={switchValMinimum}
                    onChange={this.handleChange}
                  />
                  {optErrors.switchValMinimum.length > 0 && (
                    <div style={minierror}>{optErrors.switchValMinimum}</div>
                  )}
                  <div style={{ height: "12px" }}></div>
                </div>
              </FlexContainer>
            ) : (
              ""
            )}
          </MasterLevelForm>
          <FlexContainer
            style={{
              justifyContent: "center",
              background: "white",
              borderBottomRightRadius: "15px",
              borderBottomLeftRadius: "15px",
              padding: "10px",
              marginTop: "-1px"
            }}
          >
            <PrimaryButton
              type={"primary"}
              primary
              style={{
                background: theme.colors.primary,
                border: "none",
                color: "white"
              }}
              onClick={this.handleSubmit}
            >
              Submit
            </PrimaryButton>
          </FlexContainer>
        </div>
      </FlexContainer>
    );
  }
}
