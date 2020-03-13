import React, { Component } from "react";
import { Checkbox, Select } from "antd";
import { AntTable } from "../../../styledcomponents/table/AntTabl";
import { TestTitle } from "../titles/TestTitle";
import {
  ADD_PARAMETERS,
  POP_PARAMETERS
} from "../../../../redux/action/testconfiguration/TestConfiguration";
import { connect } from "react-redux";
import theme from "../../../../theme";
import { FlexContainer } from "../../../styledcomponents/container/FlexGrid";
import { api } from "../../../services/AxiosService";
import { PrimaryButton } from "../../../styledcomponents/button/button";
import Notification from "../../../Constant/Notification";

const { Option } = Select;

class TestParameterTable extends Component {
  state = {
    size: "small",
    parameterList: [],
    selectedTestParams: [],
    test_name: undefined,
    addToTestParams: [],
    unit: "",
    unitData: []
  };
  componentWillMount() {
    if (window.screen.width > 1900) {
      console.log("hooray");
      this.setState({
        size: "large"
      });
    } else if (window.screen.width < 1440) {
      this.setState({
        size: "small"
      });
    }
  }

  //get all for tests select
  getAllTests() {
    api("GET", "supermix", "/tests", "", "", "").then(res => {
      console.log(res.data.results);
      if (res.data.results.test.length > 0) {
        console.log("got tests");
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

  //get all for units select
  getAllUnits() {
    api("GET", "supermix", "/units", "", "", "").then(res => {
      console.log(res.data.results);
      if (res.data.results.units.length > 0) {
        console.log("got tests");
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

  getAllParameters = () => {
    api("GET", "supermix", "/parameters", "", "", "").then(res => {
      console.log(res.data.results);
      this.setState({
        parameterList: res.data.results.parameters
      });
    });
  };
  getAllUnits = () => {
    api("GET", "supermix", "/units", "", "", "").then(res => {
      console.log(res.data.results);
      this.setState({
        unitsList: res.data.results.units[res.data.results.units.length - 1].id
      });
    });
  };

  componentDidMount() {
    this.getAllParameters();
    this.getAllTests();
    this.getAllUnits();
  }

  handleCheck = (record, event) => {
    const { selectedTestParams } = this.state;
    console.log(record);
    console.log(event.target.checked);
    if (event.target.checked === true) {
      selectedTestParams.push(record);
    } else if (event.target.checked === false) {
      for (let i = 0; i < selectedTestParams.length; i++) {
        if (selectedTestParams[i] === record) {
          selectedTestParams.splice(i, 1);
        }
      }
      console.log(selectedTestParams);
    }
  };

  handleSelect = (name, value) => {
    console.log(value);
    this.setState({
      test_name: value
    });
  };

  handleSubmit = e => {
    const { selectedTestParams, addToTestParams, test_name } = this.state;

    e.preventDefault();
    for (let k = 0; k < selectedTestParams.length; k++) {
      addToTestParams.push({
        testId: test_name,
        parameterId: selectedTestParams[k].id,
        unitId: this.state.unitData[selectedTestParams[k].id]
      });
    }
    console.log(addToTestParams);
    console.log(this.state.unitData[1]);

    api("POST", "supermix", "/test-parameter", "", addToTestParams, "").then(
      res => {
        console.log(res.data);
        Notification("success", res.data.message);
        // this.props.reload();
        this.setState({
          selectedTestParams: [],
          test_name: "",
          addToTestParams: [],
          unitData: []
        });
      },
      error => {
        console.log(error);
      }
    );

    console.log("submitted");
  };
  addunit = (record, value) => {
    this.state.unitData[record.id] = value;
  };

  render() {
    // this.state.unitData[0] = this.this.state.length;
    // console.log(this.state.unitData);

    // console.log(this.state.1);

    const testParameterColumns = [
      {
        title: "Parameter",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Abbreviation",
        dataIndex: "abbreviation",
        key: "abbreviation"
      },
      {
        title: "Relevant",
        dataIndex: "action",
        key: "action",
        render: (text, record = this.state.testParameterData) => (
          <Checkbox
            id='check_relevant'
            name='check_relevant'
            onChange={this.handleCheck.bind(this, record)}
          />
        )
      },
      {
        title: "Unit",
        dataIndex: "unit",
        key: "unit",
        render: (text, record = this.state.testParameterData) => (
          <Select
            id='unit'
            name='unit'
            onChange={value => this.addunit(record, value)}
            style={{ width: 80 }}
          >
            {this.state.SelectUnit}
          </Select>
        )
      }
    ];
    return (
      <FlexContainer
        style={{
          width: "800px",
          background: "white",
          marginTop: "20px",
          borderRadius: "15px",
          padding: "10px"
        }}
      >
        <FlexContainer
          style={{
            width: "800px",
            justifyContent: "center",
            marginTop: "10px"
          }}
        >
          <div
            className='input-wrapper'
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label className='label' for='test_name'>
              Test
            </label>
            <Select
              id='test_name'
              name='test_name'
              value={this.state.test_name}
              onChange={value => this.handleSelect("test_name", value)}
              style={{ width: 170, marginLeft: "10px" }}
            >
              {this.state.SelectTest}
            </Select>
          </div>

          {/* <PrimaryButton
            type={"ghost"}
            primary
            style={{
              background: theme.colors.primary,
              border: "none",
              marginLeft: "20px",
              color: "white"
            }}
            onClick={this.openUnitModal}
            disabled={true}
          >
            Add Units
          </PrimaryButton> */}
        </FlexContainer>
        <AntTable
          dataSource={this.state.parameterList}
          size={this.state.size}
          bordered={false}
          columns={testParameterColumns}
          title={() => (
            <div
              style={{
                background: theme.colors.primary,
                color: "white",
                height: "40px",
                fontSize: "16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                margin: "-10px",
                borderTopLeftRadius: "15px",
                borderTopRightRadius: "15px"
              }}
            >
              Test Parameter
            </div>
          )}
          showHeader={true}
          pagination={{ defaultPageSize: 6 }}
          style={{
            height: "auto",
            width: "770px"
          }}
        />
        <FlexContainer
          style={{
            width: "800px",
            justifyContent: "center",
            marginTop: "25px"
          }}
        >
          <PrimaryButton
            type={"primary"}
            primary
            style={{ background: theme.colors.primary, border: "none" }}
            onClick={this.handleSubmit}
          >
            Submit
          </PrimaryButton>
        </FlexContainer>
      </FlexContainer>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     textBody:
//       state.testConfigurationReducers.equationConfigurationReducer.textBody
//   };
// };

const mapDispatchToProps = dispatch => {
  return {
    // selectParameters: (record, event) => {
    //   console.log(event.target.checked);
    //   if (event.target.checked === true) {
    //     dispatch({ type: ADD_PARAMETERS, payload: record.unitName });
    //     console.log("record pushed " + record.unitName);
    //   }
    //   if (event.target.checked === false) {
    //     dispatch({ type: POP_PARAMETERS, payload: record.unitName });
    //     console.log("record spliced " + record.unitName);
    //   }
    // }
  };
};
export default connect(null, mapDispatchToProps)(TestParameterTable);
