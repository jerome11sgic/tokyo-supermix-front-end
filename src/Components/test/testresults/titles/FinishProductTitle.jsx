import React, { Component } from "react";
import { FlexContainer } from "../../../styledcomponents/container/FlexGrid";
import { PrimaryButton } from "../../../styledcomponents/button/button";
import theme from "../../../../theme";
import { connect } from "react-redux";
import {
  TOGGLE_FINISH_PRODUCT_DRAWER,
  CLOSE_FINISH_PRODUCT_DRAWER
} from "../../../../redux/action/testresults/TestResults";
import { Drawer, Select, Input } from "antd";

const Option = Select;

class FinishProductTitle extends Component {
  state = {
    accuracy: "accurate"
  };
  onChange = value => {
    console.log(value);
    this.setState({
      accuracy: value
    });
  };

  render() {
    return (
      <FlexContainer>
        <h3>Finish Product Test Results</h3>
        <PrimaryButton
          type='primary'
          style={{
            background: theme.colors.primary,
            outline: "none",
            border: "none"
          }}
          onClick={this.props.toggleFinishProductFilterDrawer}
        >
          Filter
        </PrimaryButton>
        <Drawer
          title='Customize Filter'
          placement='right'
          closable={false}
          onClose={this.props.onCloseFinishProductFilterDrawer}
          visible={this.props.visible}
          width={520}
        >
          <FlexContainer column style={{ height: "130px" }}>
            <div>
              <h4>Filter By</h4>
              <Select
                id='filter_by'
                name='filter_by'
                placeholder='Select Filter'
                style={{ width: "180px" }}
              >
                <Option value='strength_test'>Strength Test</Option>
                <Option value='slumptest'>Slump Test</Option>
                <Option value='grade'>Grade</Option>
                <Option value='pass/fail'>Pass / Fail</Option>
                <Option value='plant'>Plant</Option>
                <Option value='sample'>Sample</Option>
                <Option value='duration'>Duration</Option>
              </Select>
            </div>
            <FlexContainer
              style={{ background: "#D6E3F8", height: "50px", padding: "10px" }}
            >
              <Select
                id='accuracy'
                name='accuracy'
                style={{ width: "120px" }}
                defaultValue='accurate'
                value={this.state.accuracy}
                onChange={this.onChange}
              >
                <Option value='between'>Between</Option>
                <Option value='accurate'>Accurate</Option>
              </Select>
              {this.state.accuracy === "accurate" ? (
                <Input
                  id='grade'
                  name='grade'
                  style={{ width: "180px" }}
                  placeholder='Grade'
                />
              ) : (
                <div style={{ marginLeft: "-5px" }}>
                  <Input
                    id='max'
                    name='max'
                    placeholder='Maximum'
                    style={{ width: "100px" }}
                  />
                  <PrimaryButton disabled>~</PrimaryButton>
                  <Input
                    id='min'
                    name='min'
                    placeholder='Minimum'
                    style={{ width: "100px" }}
                  />
                </div>
              )}
              <PrimaryButton
                type='primary'
                style={{ background: theme.colors.primary, border: "none" }}
              >
                Search
              </PrimaryButton>
            </FlexContainer>
          </FlexContainer>
        </Drawer>
      </FlexContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    visible: state.testResultsReducers.ToggleFilterDrawers.FPvisible
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleFinishProductFilterDrawer: () => {
      dispatch({ type: TOGGLE_FINISH_PRODUCT_DRAWER });
      console.log("toggle finish product filter drawer");
    },
    onCloseFinishProductFilterDrawer: () => {
      dispatch({ type: CLOSE_FINISH_PRODUCT_DRAWER });
      console.log("close finish product filter drawer");
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FinishProductTitle);
