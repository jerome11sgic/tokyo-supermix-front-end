import React, { Component } from "react";
import { Checkbox, Select } from "antd";
import { AntTable } from "../../../styledcomponents/table/AntTabl";
import { FlexContainer } from "../../../styledcomponents/container/FlexGrid";
import { connect } from "react-redux";
import {
  REMOVE_MINI_CARD,
  CREATE_MINI_CARD,
  SELECT_UNIT,
  TICK_CHECKBOX
} from "../../../../redux/action/testconfiguration/TestConfiguration";

const { Option } = Select;

class AddTestParameter extends Component {
  state = {
    size: "small",
    unit: [],
    checked: false,
    testParameterData: [
      {
        parameterId: 1,
        parameterName: "Cement",
        parameterAbbr: "A"
      },
      {
        parameterId: 2,
        parameterName: "Sand",
        parameterAbbr: "B"
      }
      // {
      //   parameterName: "Concrete",
      //   parameterAbbr: "C"
      // }
    ]
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

  onChangeUnit = (value, record) => {
    console.log(value);
    console.log(record);
  };

  // stateCheck = e => {
  //   console.log("checked in state" + e.target.checked);
  //   this.setState({
  //     checked: e.target.checked
  //   });
  // };

  handleChange = value => {
    console.log(`selected ${value}`);
  };

  render() {
    console.log("DEBUG4142", this.props.cards);
    const testParameterColumns = [
      {
        title: "Parameter",
        dataIndex: "parameterName",
        key: "parameterName"
      },
      {
        title: "Abbreviation",
        dataIndex: "parameterAbbr",
        key: "parameterAbbr"
      },
      // {
      //   title: "Unit",
      //   dataIndex: "unit",
      //   key: "unit",
      //   render: (text, record = this.state.unit) => (
      //     <Select
      //       id='unit_select'
      //       name='unit_select'
      //       onChange={this.props.onChangeUnit.bind(this, record)}
      //       style={{ width: 100 }}
      //     >
      //       <Option value='kg'>Kg</Option>
      //       <Option value='lb'>Lb</Option>
      //     </Select>
      //   )
      // },
      {
        title: "Relevant",
        dataIndex: "testParameterCheck",
        key: "testParameterCheck",
        render: (text, record = this.state.testParameterData) => (
          <Checkbox
            id='relevant_check'
            name='relevant_check'
            key={this.state.testParameterData.parameterName}
            onChange={this.props.selectCreateMiniCard.bind(this, record)}
          />
        )
      }
    ];

    return (
      <FlexContainer>
        <AntTable
          dataSource={this.state.testParameterData}
          size={this.state.size}
          bordered={false}
          columns={testParameterColumns}
          //   title={() => TestTitle("Select Parameter")}
          showHeader={true}
          style={{
            width: "700px",
            background: "white",
            boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
            justifyContent: "right"
          }}
          pagination={{ defaultPageSize: 2 }}
        />
      </FlexContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    cards: state.testConfigurationReducers.equationConfigurationReducer.cards
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // onChangeUnit: (record, value) => {
    //   dispatch({
    //     type: SELECT_UNIT,
    //     payload: { record: record, value: value }
    //   });
    //   console.log("unit selected = " + value);
    // },
    // onCheckRelevant: record => {
    //   dispatch({
    //     type: TICK_CHECKBOX,
    //     payload: record
    //   });
    //   console.log("relevant ticked");
    // }
    // selectParameters: (record, event) => {
    //   console.log(event.target.checked);
    //   if (event.target.checked === true) {
    //     dispatch({ type: ADD_PARAMETERS, payload: record.parameterAbbr });
    //     console.log("record pushed " + record.parameterAbbr);
    //   }
    //   if (event.target.checked === false) {
    //     dispatch({ type: POP_PARAMETERS, payload: record.parameterAbbr });
    //     console.log("record spliced " + record.parameterAbbr);
    //   }
    // }
    selectCreateMiniCard: (record, event) => {
      console.log(event.target.checked);
      if (event.target.checked === true) {
        dispatch({ type: CREATE_MINI_CARD, payload: record });
        console.log("created mini card " + record.parameterAbbr);
        // dispatch({
        //   type: TICK_CHECKBOX,
        //   payload: record
        // });
      } else if (event.target.checked === false) {
        dispatch({ type: REMOVE_MINI_CARD, payload: record });
        console.log("removed mini card " + record.parameterAbbr);
      }
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTestParameter);
