import React, { Component } from "react";
import { FlexContainer } from "../../../styledcomponents/container/FlexGrid";
import AddTestName from "../configure/AddTestName";
import AddTestEquation from "../configure/AddTestEquation";
import TestParameterTable from "../tables/TestParameterTable";
import { connect } from "react-redux";
import { Modal, Button } from "antd";

import theme from "../../../../theme";
import {
  TRIGGER_BACK_EQUATIONS_AREA,
  CLEAR_STATES_WHILE_CANCEL
} from "../../../../redux/action/testconfiguration/TestConfiguration";
import AddTestParameter from "../configure/AddTestParameter";
import { PrimaryButton } from "../../../styledcomponents/button/button";

class Step01 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      justifyStyle: "center",
      showSecondColumn: false,
      visible: false
    };
  }

  handleSubmit = () => {
    const saveEquation = {
      formula: this.props.textBody
    };
    const testParameter = {
      equation_id: 1,
      parameter_id: this.props.paramsData
    };
    console.log(saveEquation);
    console.log(testParameter);
  };

  render() {
    console.log(this.props.paramsData);
    return (
      <FlexContainer style={{ justifyContent: "center" }}>
        <FlexContainer
          column
          style={{
            // backgroundColor: "rgba(220, 220, 220, 0.9)",
            padding: "10px",
            width: "50%",
            justifyContent: "center"
          }}
        >
          <FlexContainer
            column
            style={{
              background: theme.colors.primary,
              color: "white",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
              height: "50px",
              justifyContent: "center",
              verticalAlign: "middle",
              marginTop: "10px",
              fontSize: "16px",
              fontWeight: 480
            }}
          >
            Add Test
          </FlexContainer>

          <AddTestName />
          <Modal
            width='800px'
            style={{ height: "auto", marginTop: "-40px" }}
            title='Equation Area'
            visible={this.props.visible}
            onCancel={this.props.handleCancelEquationArea}
            footer={[
              <Button key='back' onClick={this.props.handleCancelEquationArea}>
                Cancel
              </Button>,
              <PrimaryButton
                key='submit'
                onClick={this.handleSubmit}
                style={{
                  background: "#001328",
                  color: "white",
                  border: "none"
                }}
              >
                Save
              </PrimaryButton>
            ]}
          >
            <FlexContainer>
              <AddTestParameter />
              <AddTestEquation />
            </FlexContainer>
          </Modal>
        </FlexContainer>
      </FlexContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    visible: state.testConfigurationReducers.triggerEquationAreaReducer.visible,
    cards: state.testConfigurationReducers.equationConfigurationReducer.cards,
    paramsData:
      state.testConfigurationReducers.equationConfigurationReducer.paramsData,
    textBody:
      state.testConfigurationReducers.equationConfigurationReducer.textBody
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleCancelEquationArea: () => {
      dispatch({ type: TRIGGER_BACK_EQUATIONS_AREA });
      dispatch({ type: CLEAR_STATES_WHILE_CANCEL });
      console.log("triggered back equation area");
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Step01);
