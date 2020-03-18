import React, { Component } from "react";
import { FlexContainer } from "../../../styledcomponents/container/FlexGrid";
import { Input, Select, InputNumber, DatePicker } from "antd";
import { PrimaryButton } from "../../../styledcomponents/button/button";
import history from "../../../../Components/Constant/history";
import theme from "../../../../theme";
import moment from "moment";
import { api } from "../../../services/AxiosService";
import FormGenerator from "../../../Constant/FormGenerator";
import Notification from "../../../Constant/Notification";
import "./materialtesttrialstyle.scss";
import { AntTable } from "../../../styledcomponents/table/AntTabl";

const materialTestData = [
  {
    id: 1,
    testId: 2,
    date: "2020-03-21",
    incomingSampleId: "sam01",
    materialId: 1,
    materialStateId: 2,
    noOfTrial: 3,
    test_level: "LAB_LEVEL",
    average: 0,
    status: "PASS"
  }
];

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
      testId: this.props.match.params.testId,
      sampleId: this.props.match.params.sampleId,
      test_name: "",
      materialCategoryName: "",
      incoming_sample: "River Sand",
      incomingSampleId: "",
      date: undefined,
      material_state: undefined,
      no_of_trial: 3,
      test_level: "LAB_LEVEL",
      status: "",
      errors: {
        date: "",
        material_state: "",
        no_of_trial: "",
        status: "",
        code: ""
      },
      errormsgs: "",
      equationId: "",
      equationParameters: "",
      formParameter: "",
      code: "",
      trialCount: 1,
      submitMeg: "",
      materialId: "",
      disible: true,
      columns: [
        {
          title: "Parameter",
          dataIndex: "parameter",
          key: "parameter"
        }
      ],
      trailParameter: [],
      trailData: {},
      trailColumns: [],
      statusCode: "",
      MaterialTestTrialCode: ""
    };
  }
  componentDidMount() {
    console.log(this.state.testId);
    this.gettestById();
    this.getsampleById();
    this.getAllMatrialState();
  }

  gettestById = () => {
    api("GET", "supermix", "/test", "", "", this.state.testId).then(res => {
      console.log(res.data);
      console.log(res.data.results.test.equation.id);
      this.setState({
        test_name: res.data.results.test.name,
        equationId: res.data.results.test.equation.id
      });
      this.gettestParameterById(res.data.results.test.id);
    });
  };
  getsampleById = () => {
    api(
      "GET",
      "supermix",
      "/incoming-sample",
      "",
      "",
      this.state.sampleId
    ).then(res => {
      console.log(res.data);

      this.setState({
        materialCategoryName:
          res.data.results.incomingSample.rawMaterial.materialSubCategory
            .materialCategoryName,
        incomingSampleId: res.data.results.incomingSample.code,
        materialId: res.data.results.incomingSample.rawMaterial.id
      });
    });
  };
  gettestParameterById = id => {
    console.log(id);
    api("GET", "supermix", "/test-parameter/test", "", "", id).then(res => {
      console.log(res.data);
      // this.createEquationParameters(res.data.results.equationParameters);
      this.setState({
        equationParameters: res.data.results.testparameters
      });
    });
  };
  createEquationParameters = equationParameters => {
    console.log(equationParameters);
    let para = [];

    for (let i = 0; i < equationParameters.length; i++) {
      para.push({
        name: `${equationParameters[i].parameter.abbreviation}`,
        label: `${equationParameters[i].parameter.name}  (${equationParameters[i].parameter.abbreviation})`,
        type: "number",
        placeholder: equationParameters[i].unit.unit
      });
    }
    console.log(para);
    return JSON.stringify(para);
  };
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
          status: errors.status,
          code: errors.code
        }
      });
    }
    if (field === "test_level") {
      this.setState({
        test_level: value
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
          status: errors.status,
          code: errors.code
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
        status: errors.status,
        code: errors.code
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
      case "code":
        errors.code = value.length === 0 ? "code can't be empty" : "";
        break;
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
    const {
      errors,
      date,
      material_state,
      no_of_trial,
      status,
      code
    } = this.state;
    if (
      date === undefined &&
      material_state === undefined &&
      no_of_trial === undefined &&
      status.length === 0 &&
      code.length === 0
    ) {
      this.setState({
        errors: {
          date: `date ${eM}`,
          material_state: `material state ${eM}`,
          no_of_trial: `no of trial ${eM}`,
          status: `status ${eM}`,
          code: `code ${eM}`
        }
      });
    } else if (date === undefined && errors.date.length === 0) {
      this.setState({
        errors: {
          date: errors.date || `date ${eM}`,
          material_state: errors.material_state,
          no_of_trial: errors.no_of_trial,
          status: errors.status,
          code: errors.code
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
          status: errors.status,
          code: errors.code
        }
      });
    } else if (no_of_trial === undefined && errors.no_of_trial.length === 0) {
      this.setState({
        errors: {
          date: errors.date,
          material_state: errors.material_state,
          no_of_trial: errors.no_of_trial || `no of trial ${eM}`,
          status: errors.status,
          code: errors.code
        }
      });
    } else if (status.length === 0 && errors.status.length === 0) {
      this.setState({
        errors: {
          date: errors.date,
          material_state: errors.material_state,
          no_of_trial: errors.no_of_trial,
          status: errors.status || `status ${eM}`,
          code: errors.code
        }
      });
    } else if (code.length === 0 && errors.code.length === 0) {
      this.setState({
        errors: {
          date: errors.date,
          material_state: errors.material_state,
          no_of_trial: errors.no_of_trial,
          status: errors.status,
          code: errors.code || `code ${eM}`
        }
      });
    } else if (
      errors.date.length === 0 &&
      errors.material_state.length === 0 &&
      errors.no_of_trial.length === 0 &&
      errors.status.length === 0 &&
      errors.code.length === 0
    ) {
      console.log("form is valid");

      // private TestLevel testLevel;

      const data = {
        code: code,
        testId: this.state.testId,
        date: moment(date).format("YYYY-MM-DD"),
        materialStateId: 17,
        incomingSampleCode: this.state.incomingSampleId,
        noOfTrial: no_of_trial,
        testLevel: this.state.test_level,
        average: 0,
        status: status
      };
      api("POST", "supermix", "/material-test", "", data, "").then(
        res => {
          console.log(res.data);
          this.setState({
            statusCode: res.data.status
          });
        },
        error => {
          // this.setState({
          //   errorvalmegss: error.validationFailures[0]
          // });
          console.log("DEBUG34: ", error);
          // console.log(HandelError(error.validationFailures[0]));
        }
      );

      console.log(data);

      this.setState({ disible: true });
    }
  };

  getAllMatrialState() {
    api("GET", "supermix", "/material-states", "", "", "").then(res => {
      console.log(res.data.results.materialState);

      console.log("ggg");
      let SelectStates = res.data.results.materialState.map((post, index) => {
        return (
          <Option value={post.id} key={index}>
            {post.materialState}
          </Option>
        );
      });
      this.setState({
        SelectStates
      });
    });
  }

  ParameterformSubmit = data => {
    console.log(Object.keys(data)[0]);
    console.log();

    if (this.state.trialCount <= this.state.no_of_trial) {
      console.log("hit");
      this.setState({
        trialCount: this.state.trialCount + 1
      });
    }
    if (this.state.trialCount <= this.state.no_of_trial) {
      this.setState({
        MaterialTestTrialCode: `${this.state.code}T${this.state.trialCount}`
      });
      const MaterialTestTrialData = {
        code: `${this.state.code}T${this.state.trialCount}`,
        materialTestCode: this.state.code,
        trialNo: this.state.trialCount,
        result: 0
      };
      console.log(MaterialTestTrialData);

      let parameterResults = [];
      for (let i = 0; i < this.state.equationParameters.length; i++) {
        parameterResults.push({
          materialTestTrial: {
            code: MaterialTestTrialData.code
          },
          value: data[this.state.equationParameters[i].parameter.abbreviation],
          testParameterId: this.state.equationParameters[i].id
        });
      }

      console.log(parameterResults);

      api(
        "POST",
        "supermix",
        "/material-test-trial",
        "",
        MaterialTestTrialData,
        ""
      ).then(
        res => {
          console.log(res.data);
          console.log(this.state.MaterialTestTrialCode);
          api(
            "POST",
            "supermix",
            "/parameter-result",
            "",
            parameterResults,
            ""
          ).then(res => {
            console.log(res.data);
            this.updateResult(MaterialTestTrialData.code);
            Notification("success", res.data.message);
          });

          // this.setState({
          //   statusCode: res.data.status
          // });
        },
        error => {
          // this.setState({
          //   errorvalmegss: error.validationFailures[0]
          // });
          console.log("DEBUG34: ", error);
          // console.log(HandelError(error.validationFailures[0]));
        }
      );
    } else {
      this.viewTestResults();
      this.updateAverage();
    }

    this.state.trailColumns.push({
      title: `Trail${this.state.trialCount}`,
      dataIndex: `t${this.state.trialCount}`,
      key: `t${this.state.trialCount}`
    });
    if (this.state.trialCount === 1) {
      for (var i = 0; i < Object.keys(data).length; i++) {
        this.state.trailParameter.push({
          parameter: Object.keys(data)[i],
          [`t${this.state.trialCount}`]: Object.values(data)[i]
        });
      }
    } else {
      for (var i = 0; i < Object.keys(data).length; i++) {
        this.state.trailParameter[i] = {
          ...this.state.trailParameter[i],
          ...{ [`t${this.state.trialCount}`]: Object.values(data)[i] }
        };
      }
    }
  };
  updateAverage = () => {
    api(
      "GET",
      "supermix",
      "/material-test-trial/material-test/average",
      "",
      "",
      this.state.code
    ).then(res => {
      console.log(res.data);
    });
  };

  updateResult = id => {
    api("GET", "supermix", "/parameter-result/calculation", "", "", id).then(
      res => {
        console.log(res.data);
      }
    );
  };
  viewTestResults() {
    history.push(`/testresults/${this.state.code}`);
  }

  trialCountLimt = () => {
    var sub = "";
    if (this.state.trialCount <= this.state.no_of_trial) {
      sub = `Trial ${this.state.trialCount} / ${this.state.no_of_trial}`;
    } else {
      sub = "Submit";
    }
    return sub;
  };

  render() {
    console.log(this.state.trailParameter);
    console.log(this.state.equationParameters);
    const {
      test_name,
      incoming_sample,
      code,
      material_state,
      date,
      no_of_trial,
      status,
      errors,
      materialCategoryName
    } = this.state;
    return (
      <FlexContainer style={{ justifyContent: "center" }}>
        <FlexContainer column>
          <FlexContainer
            column
            style={{
              background: "white",
              padding: "15px",
              borderRadius: "15px",
              width: "1200px",
              height: "auto"
            }}
          >
            <FlexContainer home>
              <div className="input_wrapper">
                <h4>{test_name}</h4>
              </div>
              <div className="input_wrapper">
                <h4>{materialCategoryName}</h4>
              </div>
            </FlexContainer>

            <FlexContainer>
              <div className="input_wrapper">
                <label htmlFor="status" className="label">
                  Code
                </label>
                <Input
                  id="code"
                  name="code"
                  style={{ width: "120px" }}
                  value={code}
                  placeholder="Enter code"
                  onChange={this.handleChange}
                  disabled={this.state.disible}
                />
                {errors.code.length > 0 && (
                  <div style={error2}>{errors.code}</div>
                )}
                <div style={{ height: "22px" }} />
              </div>
              <div className="input_wrapper">
                <label htmlFor="date" className="label">
                  Date
                </label>
                <DatePicker
                  id="date"
                  name="date"
                  value={date}
                  onChange={(dateString, field) =>
                    this.handleDates("date", dateString, field)
                  }
                  disabled={this.state.disible}
                />
                {errors.date.length > 0 && (
                  <div style={error2}>{errors.date}</div>
                )}
                <div style={{ height: "22px" }} />
              </div>
              <div className="input_wrapper">
                <label htmlFor="material_state" className="label">
                  Material State
                </label>
                <Select
                  id="material_state"
                  name="material_state"
                  placeholder="Select Material State"
                  style={{ width: 120 }}
                  value={material_state}
                  onChange={value => this.handleSelect("material_state", value)}
                  disabled={this.state.disible}
                >
                  {this.state.SelectStates}
                </Select>
                {errors.material_state.length > 0 && (
                  <div style={error2}>{errors.material_state}</div>
                )}
                <div style={{ height: "22px" }} />
              </div>
              <div className="input_wrapper">
                <label htmlFor="material_state" className="label">
                  Test Level
                </label>
                <Select
                  id="test_level"
                  name="test_level"
                  placeholder="Select Test Level"
                  style={{ width: 120 }}
                  value={this.state.test_level}
                  onChange={value => this.handleSelect("test_level", value)}
                  disabled={this.state.disible}
                >
                  <Option value="LAB_LEVEL">Lap</Option>
                  <Option value="PLANT_LEVEL">Plant</Option>
                  <Option value="TRUCK_LEVEL">Truck</Option>
                  <Option value="BULK_LEVEL">Bulk</Option>
                </Select>
                {/* {errors.material_state.length > 0 && (
                  <div style={error2}>{errors.material_state}</div>
                )} */}
                <div style={{ height: "22px" }} />
              </div>
              <div className="input_wrapper">
                <label htmlFor="no_of_trial" className="label">
                  No of Trial
                </label>
                <InputNumber
                  id="no_of_trial"
                  name="no_of_trial"
                  style={{ width: 110 }}
                  placeholder="Enter number"
                  value={no_of_trial}
                  onChange={this.handleChangeNumber}
                  disabled={this.state.disible}
                />
                {errors.no_of_trial.length > 0 && (
                  <div style={error}>{errors.no_of_trial}</div>
                )}
                <div style={{ height: "22px" }} />
              </div>
              <div className="input_wrapper">
                <label htmlFor="status" className="label">
                  Status
                </label>
                <Input
                  id="status"
                  name="status"
                  value={status}
                  placeholder="Enter Status"
                  onChange={this.handleChange}
                  disabled={this.state.disible}
                />
                {errors.status.length > 0 && (
                  <div style={error2}>{errors.status}</div>
                )}
                <div style={{ height: "22px" }} />
              </div>
              {this.state.disible ? (
                ""
              ) : (
                <div className="input_wrapper">
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
              )}
            </FlexContainer>
          </FlexContainer>
          <br />
          {this.state.disible ? (
            <FlexContainer>
              <FlexContainer>
                <FlexContainer
                  style={{
                    background: "#F9F5F5 ",
                    padding: "15px",
                    borderRadius: "15px",
                    width: "750px",
                    height: "400px"
                  }}
                >
                  <FlexContainer
                    column
                    style={{
                      background: theme.colors.primary,
                      height: "40px",
                      width: "890px",
                      margin: "-15px",
                      borderTopLeftRadius: "15px",
                      borderTopRightRadius: "15px"
                    }}
                  >
                    <h3
                      style={{
                        marginTop: "3px",
                        marginLeft: "0px",
                        color: "white"
                      }}
                    >
                      Test Trial
                    </h3>
                  </FlexContainer>

                  <FormGenerator
                    form={JSON.parse(
                      this.createEquationParameters(
                        this.state.equationParameters
                      )
                    )}
                    submitButton={{
                      text: this.trialCountLimt(),
                      className: "submit"
                    }}
                    // onChange={form => {
                    //   this.quantityChange(form);
                    // }}
                    onSubmit={form => {
                      this.ParameterformSubmit(form.data.form);
                      console.log(form);
                    }}
                    inputStyle={instyle}
                    buttonStyle={btstyle}
                    formStyle={fostyle}
                    lableStyle={lableStyle}
                    formDriction="column"
                  />
                </FlexContainer>
                &nbsp; &nbsp;
                <FlexContainer
                  row
                  style={{
                    background: "white",
                    padding: "15px",
                    borderRadius: "15px",
                    width: "440px",
                    height: "auto"
                  }}
                >
                  <AntTable
                    normal
                    emptyTableTestTrial
                    columns={[
                      ...this.state.columns,
                      ...this.state.trailColumns
                    ]}
                    dataSource={[
                      ...this.state.trailParameter,
                      this.state.trailData
                    ]}
                    onChange={this.handleChange}
                    pagination={false}
                    size="small"
                    // title={() => <h4>Equipment Related Parameter</h4>}
                  />
                </FlexContainer>
              </FlexContainer>
            </FlexContainer>
          ) : (
            ""
          )}
        </FlexContainer>
      </FlexContainer>
    );
  }
}
const instyle = {
  width: "100px",
  boxShadow: "1px 2px 8px 1px rgba(0,0,0,0.08)"
};

const lableStyle = {
  width: "400px",
  height: "32px",
  color: "black",
  fontWeight: 580
};

const btstyle = {
  marginLeft: "320px",
  height: "auto"
};
const fostyle = {
  marginTop: "-100px",
  display: "flex",
  // background: "#F9F5F5 ",
  flexDirection: "row",
  width: "700px",
  height: "auto",
  flexWrap: "wrap",
  justifyContent: "space-evenly",
  position: "relative",
  // overflowY: "scroll",
  scrollBehavior: "smooth"
};

const btnStylePrimary = {
  background: "black"
};
