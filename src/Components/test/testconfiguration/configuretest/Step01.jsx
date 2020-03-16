import React, { Component } from "react";
import { FlexContainer } from "../../../styledcomponents/container/FlexGrid";
import AddTestName from "../configure/AddTestName";
import AddTestEquation from "../configure/AddTestEquation";
import TestParameterTable from "../tables/TestParameterTable";
import { connect } from "react-redux";
import { Modal, Button } from "antd";
import HandelError from "../../../Constant/HandleError";
import theme from "../../../../theme";
import {
  TRIGGER_BACK_EQUATIONS_AREA,
  CLEAR_STATES_WHILE_CANCEL
} from "../../../../redux/action/testconfiguration/TestConfiguration";
import AddTestParameter from "../configure/AddTestParameter";
import { PrimaryButton } from "../../../styledcomponents/button/button";
import { api } from "../../../services/AxiosService";
import Notification from "../../../Constant/Notification";

class Step01 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      justifyStyle: "center",
      showSecondColumn: false,
      visible: false,
      lastIndexOfEquation: "",
      parameterData: this.props.paramsData
    };
  }

  // api("POST", "supermix", "/test", "", data, "").then(
  //   res => {
  //     console.log(res.data);
  //     if (res.data.status === "VALIDATION_FAILURE") {
  //       console.log("add");
  //       this.responeserror(res.data.results.name.message);
  //     } else {
  //       Notification("success", res.data.message);
  //       // this.props.reload();

  //       this.setState({
  //         test_name: "",
  //         equation: "",
  //         test_type: "",
  //         plant: [],
  //         errors: {
  //           test_name: "",
  //           equation: "",
  //           test_type: ""
  //         },
  //         errormsgs: ""
  //       });
  //     }
  //   },
  //   error => {
  //     this.setState({
  //       errorvalmegss: error.validationFailures[0]
  //     });
  //     console.log("DEBUG34: ", error);
  //     console.log(HandelError(error.validationFailures[0]));
  //   }
  // );

  handleSubmit = () => {
    let testParameter = [];
    let lastEquationData;
    const saveEquations = {
      formula: this.props.textBody
    };
    // const testParameter = {
    //   equationId: 1,
    //   parameterId: 61
    // };

    console.log(testParameter);
    const { parameterData } = this.state;
    function saveEquationParameterAfterAwait() {
      return new Promise(resolve => {
        setTimeout(() => {
          api("GET", "supermix", "/equations", "", "", "").then(res => {
            console.log(res.data.results.equations);
            console.log(res.data.results.equations.length);
            console.log(
              res.data.results.equations[res.data.results.equations.length - 1]
                .id
            );

            lastEquationData =
              res.data.results.equations[res.data.results.equations.length - 1]
                .id;
            for (let k = 0; k < parameterData.length; k++) {
              testParameter.push({
                equationId: lastEquationData,
                parameterId: parameterData[k]
              });
            }
            api(
              "POST",
              "supermix",
              "/equation-parameter",
              "",
              testParameter,
              ""
            ).then(res => {
              console.log(res.data);
              Notification("success", res.data.message);
              // this.props.reload();
              // this.setState({});
            });
            // res.data
            // for (let j = 0; j < res.data.results.equations.length; j++) {

            // }
          });

          resolve("resolved");
        }, 4000);
      });
    }

    async function saveEquation() {
      console.log("calling");

      console.log(saveEquations);
      api("POST", "supermix", "/equation", "", saveEquations, "").then(res => {
        console.log(res.data);
        Notification("success", res.data.message);

        // this.props.reload();
        // this.setState({});
      });
      const result = await saveEquationParameterAfterAwait();
      console.log(result);

      // expected output: 'resolved'
    }

    saveEquation();
    if (saveEquation) {
      setTimeout(() => {
        this.props.handleCancelEquationArea();
      }, 5000);
    }
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
            width: "55%",
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
            width='1250px'
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
            <FlexContainer normal style={{ width: "100%" }}>
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
