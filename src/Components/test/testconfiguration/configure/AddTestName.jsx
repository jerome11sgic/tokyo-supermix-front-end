import React, { Component } from "react";
import { Input, Select } from "antd";

import TextArea from "antd/lib/input/TextArea";
import { FlexContainer } from "../../../styledcomponents/container/FlexGrid";
import {
  MasterLevelForm,
  MasterLevelFormTitle
} from "../../../styledcomponents/form/MasterLevelForms";
import { TileParagraph } from "../../../styledcomponents/typography/typography";
import { PrimaryButton } from "../../../styledcomponents/button/button";
import theme from "../../../../theme";
import { connect } from "react-redux";
import Notification from "../../../Constant/Notification";
import HandelError from "../../../Constant/HandleError";
import {
  TRIGGER_EQUATIONS_AREA,
  TRIGGER_BACK_EQUATIONS_AREA
} from "../../../../redux/action/testconfiguration/TestConfiguration";
import { api } from "../../../services/AxiosService";

const { Option } = Select;

const childrenEquation = [
  { id: 0, name: "(A+B)" },
  { id: 1, name: "(A-B)/100" },
  { id: 2, name: "A*C" }
];

const childrenTestType = [
  { id: 0, name: "type1" },
  { id: 1, name: "type1" },
  { id: 2, name: "type3" }
];

const error = {
  color: "red",
  fontSize: "12px",
  width: "170px",
  height: "0.2px"
};

const error2 = {
  color: "red",
  fontSize: "12px",
  width: "140px",
  height: "0.2px"
};

class AddTestName extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSecondColumn: false,
      icon: "+",
      test_name: "",
      equation: "",
      test_type: "",
      plant: [],
      errors: {
        test_name: "",
        test_type: ""
      },
      errormsgs: ""
    };
  }

  componentDidMount() {
    this.getAllTestType();
    this.getAllPlant();
    this.getAllEquations();
  }

  //get all for test type select
  getAllTestType() {
    api("GET", "supermix", "/test-types", "", "", "").then(res => {
      console.log(res.data.results.testTypes);
      if (res.data.results.testTypes.length > 0) {
        console.log("ggg");
        let SelectTestType = res.data.results.testTypes.map((post, index) => {
          return (
            <Option value={post.id} key={index}>
              {post.type}
            </Option>
          );
        });
        this.setState({
          SelectTestType
        });
      }
    });
  }

  //get all for plant select
  getAllPlant() {
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

  //get all for equations select
  getAllEquations() {
    api("GET", "supermix", "/equations", "", "", "").then(res => {
      console.log(res.data.results.equations);
      if (res.data.results.equations.length > 0) {
        console.log("ggg");
        let SelectEquation = res.data.results.equations.map((post, index) => {
          return (
            <Option value={post.id} key={index}>
              {post.formula}
            </Option>
          );
        });
        this.setState({
          SelectEquation,
          equation:
            res.data.results.equations[res.data.results.equations.length - 1].id
        });
      }
    });
  }

  handleChange = (event, field) => {
    this.setState({ [field]: event.target.value });
    this.setState({ errormgs: "" });
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    // console.log(name + " is \t" + value);
    switch (name) {
      case "test_name":
        errors.test_name =
          value.length === 0
            ? "test name can't be empty"
            : value.length < 3
            ? "test name \n must be 3 characters long!"
            : !isNaN(value)
            ? "test name won't allow only letters"
            : "";
        break;

      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  handleSelect = (name, value) => {
    const { errors } = this.state;
    console.log(value);

    if (name === "equation") {
      this.setState({
        equation: value
      });
    }
    if (name === "test_type" || this.props.icon === "-") {
      this.setState({
        test_type: value,
        errors: {
          test_name: errors.test_name,
          test_type: ""
        }
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const { errors, test_name, test_type, equation } = this.state;
    if (test_name.length === 0 && test_type.length === 0) {
      console.log("form is not valid");
      this.setState({
        errors: {
          test_name: "test name can't be empty",
          test_type: "test type can't be empty"
        }
      });
    } else if (test_name.length === 0 && errors.test_name.length === 0) {
      this.setState({
        errors: {
          test_name: errors.test_name || "test name can't be empty",
          test_type: errors.test_type
        }
      });
    } else if (test_type.length === 0 && errors.test_type.length === 0) {
      this.setState({
        errors: {
          test_name: errors.test_name,

          test_type: errors.test_type || "test type can't be empty"
        }
      });
    } else if (errors.test_name.length === 0 && errors.test_type.length === 0) {
      console.log("form is valid");
      const data = {
        name: test_name,
        equationId: equation,
        testTypeId: test_type
      };
      console.log(data);
      api("POST", "supermix", "/test", "", data, "").then(
        res => {
          console.log(res.data);
          if (res.data.status === "VALIDATION_FAILURE") {
            console.log("add");
            this.responeserror(res.data.results.name.message);
          } else {
            Notification("success", res.data.message);
            // this.props.reload();

            this.setState({
              test_name: "",
              equation: "",
              test_type: "",
              plant: [],
              errors: {
                test_name: "",
                equation: "",
                test_type: ""
              },
              errormsgs: ""
            });
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
  };

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     showSecondColumn: nextProps.showSecondColumn,
  //     icon: nextProps.icon
  //   });
  // }
  render() {
    const { test_name, equation, test_type, plant, errors } = this.state;
    return (
      <FlexContainer
        style={{
          background: "white",
          padding: "15px",
          borderBottomLeftRadius: "15px",
          borderBottomRightRadius: "15px"
        }}
      >
        {/* Code */}
        <div className="input_wrapper">
          <label for="test_name" className="label">
            Test Name
          </label>
          <Input
            id="test_name"
            name="test_name"
            placeholder="Enter Test Name"
            value={test_name}
            onChange={this.handleChange}
          />
          {errors.test_name.length > 0 && (
            <div style={error2}>{errors.test_name}</div>
          )}
          <div style={{ height: "6px" }}></div>
        </div>

        {/* Equation */}
        <div className="input_wrapper">
          <label for="equation" className="label">
            Equation
          </label>
          <FlexContainer>
            <Select
              id="equation"
              name="equation"
              placeholder="Select Equation"
              style={{ width: 150 }}
              value={equation}
              onChange={value => this.handleSelect("equation", value)}
            >
              {this.state.SelectEquation}
              {/* {childrenEquation.map((post, index) => (
                <Option value={post.id} key={index}>
                  {post.name}
                </Option>
              ))} */}
            </Select>

            <div style={{ height: "6px" }}></div>
            <PrimaryButton
              type="primary"
              value={this.props.togglerValue}
              style={{
                background: theme.colors.primary,
                color: "white",
                border: "none",
                marginLeft: "5px",
                fontWeight: 500
              }}
              onClick={this.props.toggleEquationArea}
            >
              {this.props.icon}
            </PrimaryButton>
          </FlexContainer>
          {/* {errors.equation.length > 0 && (
            <div style={error2}>{errors.equation}</div>
          )} */}
          <div style={{ height: "6px", width: "auto" }}></div>
        </div>

        {/* Test Type */}
        <div className="input_wrapper">
          <label for="test_type" className="label">
            Test Type
          </label>
          <Select
            id="test_type"
            name="test_type"
            placeholder="Select Test Type"
            style={{ width: 180 }}
            value={test_type}
            onChange={value => this.handleSelect("test_type", value)}
          >
            {this.state.SelectTestType}
            {/* {childrenTestType.map((post, index) => (
              <Option value={post.id} key={index}>
                {post.name}
              </Option>
            ))} */}
          </Select>
          {errors.test_type.length > 0 && (
            <div style={error2}>{errors.test_type}</div>
          )}
          <div style={{ height: "6px" }}></div>
        </div>

        {/* Plant Multiselect */}
        {/* <div className='input_wrapper'>
          <label className='label' style={{ position: "relative" }}>
            Plant
          </label>
          <Select
            mode='multiple'
            style={{ width: 250 }}
            placeholder='Select Plant'
            id='plant'
            name='plant'
            value={plant}
            onChange={value => this.handleSelect("plant", value)}
          >
            {this.state.SelectPlants}
          </Select>
          {errors.plant.length > 0 && <div style={error}>{errors.plant}</div>}
          <div style={{ height: "6px" }}></div>
        </div> */}

        {/* Description  */}
        {/* <div className='input_wrapper'>
          <label for='description' className='label'>
            Description
          </label>
          <TextArea
            style={{ width: 300 }}
            id='description'
            name='description'
            placeholder=''
          />
        </div> */}

        {/* Procedure */}
        {/* <div className='input_wrapper'>
          <label for='procedure' className='label'>
            Procedure
          </label>
          <TextArea
            className='textarea1'
            style={{ width: 590 }}
            id='procedure'
            name='procedure'
            placeholder='Enter Procedure'
          />
        </div> */}
        <div
          style={{
            marginTop: "30px",
            marginLeft: "20px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignSelf: "center"
          }}
        >
          <PrimaryButton
            type="submit"
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
        </div>
      </FlexContainer>
    );
  }
  // changeAction = () => {
  //   if (this.props.showSecondColumn === false) {
  //     return { type: TRIGGER_EQUATIONS_AREA };
  //   } else {
  //     return { type: TRIGGER_BACK_EQUATIONS_AREA };
  //   }
  // };
}

const mapStateToProps = state => {
  return {
    icon: state.testConfigurationReducers.triggerEquationAreaReducer.icon,
    togglerValue:
      state.testConfigurationReducers.triggerEquationAreaReducer.togglable
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleEquationArea: event => {
      console.log(event.target.value);
      if (event.target.value === "yes") {
        dispatch({ type: TRIGGER_EQUATIONS_AREA });
        console.log("triggered equation area");
      } else {
        dispatch({ type: TRIGGER_BACK_EQUATIONS_AREA });
        console.log("triggered back equation area");
      }
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTestName);
