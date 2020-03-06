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
      parameter: "",
      unit: "",
      maximum: "",
      minimum: "",
      subCategory: "",
      material: "",
      switchValMaximum: "",
      swithchValMinimum: "",
      errors: {
        parameter: "",
        unit: "",
        maximum: "",
        minimum: "",
        subCategory: "",
        material: ""
      },
      errormsgs: ""
    };
  }

  handleChange = (event, field) => {
    this.setState({ [field]: event.target.value });
    this.setState({ errormgs: "" });
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
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
      swithchValMinimum,
      unit
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
              borderBottomRightRadius: "15px",
              borderBottomLeftRadius: "15px",
              width: "570px"
            }}
          >
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
              />
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
              />
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
            </FlexContainer>
            <FlexContainer home>
              {/* Material */}
              <div className='input_wrapper'>
                <label for='material_switch' className='label'>
                  Material
                </label>
                <Switch
                  onChange={checked => this.onChange(checked)}
                  value={switchVal}
                />
                <div style={{ height: "12px" }}></div>
              </div>

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
                />
                {errors.subCategory.length > 0 && (
                  <div style={error}>{errors.subCategory}</div>
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
                />
                {errors.material.length > 0 && (
                  <div style={error}>{errors.material}</div>
                )}
                <div style={{ height: "12px" }}></div>
              </div>
            </FlexContainer>
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
                  />
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
                    value={swithchValMinimum}
                    onChange={this.handleChange}
                  />
                  <div style={{ height: "12px" }}></div>
                </div>
              </FlexContainer>
            ) : switchVal === false ? (
              ""
            ) : (
              ""
            )}
            <PrimaryButton
              type={"primary"}
              primary
              style={{
                background: theme.colors.primary,
                border: "none",
                color: "white"
              }}
            >
              Submit
            </PrimaryButton>
          </MasterLevelForm>
        </div>
      </FlexContainer>
    );
  }
}
