import React, { Component } from "react";
import { FlexContainer } from "../../../styledcomponents/container/FlexGrid";
import { Input, Select, InputNumber, DatePicker } from "antd";
import { PrimaryButton } from "../../../styledcomponents/button/button";
import theme from "../../../../theme";
import moment from "moment";

const { Option } = Select;
const error = {
  color: "red",
  fontSize: "12px",
  width: "100px",
  height: "0.2px"
};
const error2 = {
  color: "red",
  fontSize: "12px",
  width: "160px",
  height: "0.2px"
};
export default class MaterialTestTrial extends Component {
  constructor(props) {
    super(props);

    this.state = {
      test_name: "75 Micron Test",
      incoming_sample: "River Sand",
      date: undefined,
      material_state: undefined,
      no_of_trial: undefined,
      status: "",
      errors: {
        date: "",
        material_state: "",
        no_of_trial: "",
        status: ""
      },
      errormsgs: ""
    };
  }

  handleSelect = (field, value) => {
    const { errors } = this.state;
    console.log(value + " of " + field);
    if (field === "material_state") {
      this.setState({
        material_state: value,
        errors: {
          date: errors.date,
          material_state: "",
          no_of_trial: errors.no_of_trial,
          status: errors.status
        }
      });
    }
  };

  handleDates(name, dateString, field) {
    const { errors } = this.state;
    console.log(name);
    console.log(dateString);
    console.log(field);
    let convertedDate = moment(dateString).format("YYYY-MM-DD");
    console.log(convertedDate);
    if (name === "date") {
      this.setState({
        date: dateString,
        errors: {
          date: "",
          material_state: errors.material_state,
          no_of_trial: errors.no_of_trial,
          status: errors.status
        }
      });
    }
  }

  handleChangeNumber = value => {
    const { errors } = this.state;
    console.log(value);
    this.setState({
      no_of_trial: value,
      errors: {
        date: errors.date,
        material_state: errors.material_state,
        no_of_trial: "",
        status: errors.status
      }
    });
  };

  handleChange = (event, field) => {
    this.setState({ [field]: event.target.value });
    this.setState({ errormgs: "" });
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    console.log(name + " is \n" + value);
    switch (name) {
      case "status":
        errors.status =
          value.length === 0
            ? "status can't be empty"
            : value.length < 2
            ? "status \n must be 2 characters long!"
            : !isNaN(value)
            ? "status won't allow only letters"
            : "";
        break;

      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  handleSubmit = e => {
    let eM = "can't be empty";
    e.preventDefault();
    const { errors, date, material_state, no_of_trial, status } = this.state;
    if (
      date === undefined &&
      material_state === undefined &&
      no_of_trial === undefined &&
      status.length === 0
    ) {
      this.setState({
        errors: {
          date: `date ${eM}`,
          material_state: `material state ${eM}`,
          no_of_trial: `no of trial ${eM}`,
          status: `status ${eM}`
        }
      });
    } else if (date === undefined && errors.date.length === 0) {
      this.setState({
        errors: {
          date: errors.date || `date ${eM}`,
          material_state: errors.material_state,
          no_of_trial: errors.no_of_trial,
          status: errors.status
        }
      });
    } else if (
      material_state === undefined &&
      errors.material_state.length === 0
    ) {
      this.setState({
        errors: {
          date: errors.date,
          material_state: errors.material_state || `material state ${eM}`,
          no_of_trial: errors.no_of_trial,
          status: errors.status
        }
      });
    } else if (no_of_trial === undefined && errors.no_of_trial.length === 0) {
      this.setState({
        errors: {
          date: errors.date,
          material_state: errors.material_state,
          no_of_trial: errors.no_of_trial || `no of trial ${eM}`,
          status: errors.status
        }
      });
    } else if (status.length === 0 && errors.status.length === 0) {
      this.setState({
        errors: {
          date: errors.date,
          material_state: errors.material_state,
          no_of_trial: errors.no_of_trial,
          status: errors.status || `status ${eM}`
        }
      });
    } else if (
      errors.date.length === 0 &&
      errors.material_state.length === 0 &&
      errors.no_of_trial.length === 0 &&
      errors.status.length === 0
    ) {
      console.log("form is valid");
      const data = {
        date: moment(date).format("YYYY-MM-DD"),
        materialState: material_state,
        noOfTrial: no_of_trial,
        status: status
      };
      console.log(data);
    }
  };

  render() {
    const {
      test_name,
      incoming_sample,
      material_state,
      date,
      no_of_trial,
      status,
      errors
    } = this.state;
    return (
      <FlexContainer style={{ justifyContent: "center" }}>
        <FlexContainer column>
          <FlexContainer
            column
            style={{
              background: "white",
              padding: "15px",
              borderRadius: "15px"
            }}
          >
            <FlexContainer home>
              <div className='input_wrapper'>
                <h4>{test_name}</h4>
              </div>
              <div className='input_wrapper'>
                <h4>{incoming_sample}</h4>
              </div>
            </FlexContainer>

            <FlexContainer>
              <div className='input_wrapper'>
                <label htmlFor='date' className='label'>
                  Date
                </label>
                <DatePicker
                  id='date'
                  name='date'
                  value={date}
                  onChange={(dateString, field) =>
                    this.handleDates("date", dateString, field)
                  }
                />
                {errors.date.length > 0 && (
                  <div style={error2}>{errors.date}</div>
                )}
                <div style={{ height: "22px" }} />
              </div>
              <div className='input_wrapper'>
                <label htmlFor='material_state' className='label'>
                  Material State
                </label>
                <Select
                  id='material_state'
                  name='material_state'
                  placeholder='Select Material State'
                  style={{ width: 180 }}
                  value={material_state}
                  onChange={value => this.handleSelect("material_state", value)}
                >
                  <Option value='cement'>Cement</Option>
                  <Option value='concrete'>Concrete</Option>
                </Select>
                {errors.material_state.length > 0 && (
                  <div style={error2}>{errors.material_state}</div>
                )}
                <div style={{ height: "22px" }} />
              </div>
              <div className='input_wrapper'>
                <label htmlFor='no_of_trial' className='label'>
                  No of Trial
                </label>
                <InputNumber
                  id='no_of_trial'
                  name='no_of_trial'
                  style={{ width: 110 }}
                  placeholder='Enter number'
                  value={no_of_trial}
                  onChange={this.handleChangeNumber}
                />
                {errors.no_of_trial.length > 0 && (
                  <div style={error}>{errors.no_of_trial}</div>
                )}
                <div style={{ height: "22px" }} />
              </div>
              <div className='input_wrapper'>
                <label htmlFor='status' className='label'>
                  Status
                </label>
                <Input
                  id='status'
                  name='status'
                  value={status}
                  placeholder='Enter Status'
                  onChange={this.handleChange}
                />
                {errors.status.length > 0 && (
                  <div style={error2}>{errors.status}</div>
                )}
                <div style={{ height: "22px" }} />
              </div>
              <div className='input_wrapper'>
                <PrimaryButton
                  type={"primary"}
                  primary
                  style={{
                    background: theme.colors.primary,
                    color: theme.colors.white,
                    border: "none"
                  }}
                  onClick={this.handleSubmit}
                >
                  Submit
                </PrimaryButton>
              </div>
            </FlexContainer>
          </FlexContainer>
          <FlexContainer>
            <FlexContainer column></FlexContainer>
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
    );
  }
}
