import React, { Component } from "react";
import { FlexContainer } from "../../../styledcomponents/container/FlexGrid";
import TestParameterTable from "./../tables/TestParameterTable";
import "../styleEquationConfiguration.css";
import { MiniCard } from "../../../styledcomponents/card/MiniCard";
import Paragraph from "antd/lib/typography/Paragraph";
import TextArea from "antd/lib/input/TextArea";
import { PrimaryButton } from "../../../styledcomponents/button/button";
import { connect } from "react-redux";
import {
  ADD_EQUATION_SYMBOLS,
  ADD_TEXT_BODY_WITH_KEYPRESS
} from "../../../../redux/action/testconfiguration/TestConfiguration";

class AddTestEquation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      equations: [],
      textBoxEquation: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.textBody);
    this.setState({
      textBoxEquation: nextProps.textBody
    });
  }

  // sum = (a, b) => {
  //   return `${a} ${b}`;
  // };

  // handleCalculate = value => {
  //   console.log(value);
  //   // // let prevState = this.state.textBoxEquation;
  //   this.state.equations.push(value);
  //   console.log(this.state.equations);
  //   // let eq = this.state.equations.map(post => post);
  //   // console.log(eq);
  //   // let splicedEd = eq.pop();
  //   // console.log(splicedEd);

  //   let eq = this.sum(...this.state.equations);
  //   let stringEq = JSON.stringify(eq);
  //   console.log(eq);
  //   console.log(stringEq);
  //   this.setState({
  //     textBoxEquation: eq
  //   });
  // };

  // onChangeTextBox = event => {
  //   console.log(event.target.value);
  //   this.state.equations.push(event.target.value);
  //   this.setState({
  //     textBoxEquation: this.state.equations
  //   });
  // };

  render() {
    const { textBoxEquation } = this.state;
    return (
      <FlexContainer column>
        <div style={{ height: "20px" }}></div>
        <FlexContainer normal>
          <TestParameterTable />
        </FlexContainer>
        <div style={{ height: "25px" }}></div>
        <FlexContainer normal className='equation_wrapper'>
          <TextArea
            className='equation_playground textEmph'
            value={textBoxEquation}
            onChange={event => this.props.onChangeTextBox(event)}
            style={{ fontSize: "20px" }}
          ></TextArea>
          <div className='calculators'>
            <MiniCard
              equal
              onClick={value => this.props.handleCalculate("=", value)}
            ></MiniCard>

            <MiniCard>
              <Paragraph
                className='backImg'
                onClick={value => this.props.handleCalculate("+", value)}
              >
                +
              </Paragraph>
            </MiniCard>

            <MiniCard>
              <Paragraph
                className='backImg'
                onClick={value => this.props.handleCalculate("-", value)}
              >
                -
              </Paragraph>
            </MiniCard>

            <MiniCard>
              <Paragraph
                className='backImg'
                onClick={value => this.props.handleCalculate("*", value)}
              >
                *
              </Paragraph>
            </MiniCard>

            <MiniCard>
              <Paragraph
                className='backImg'
                onClick={value => this.props.handleCalculate("/", value)}
              >
                /
              </Paragraph>
            </MiniCard>

            <MiniCard>
              <Paragraph
                className='backImg'
                onClick={value => this.props.handleCalculate(".", value)}
              >
                .
              </Paragraph>
            </MiniCard>

            <MiniCard>
              <Paragraph
                className='backImg'
                onClick={value => this.props.handleCalculate("(", value)}
              >
                (
              </Paragraph>
            </MiniCard>

            <MiniCard>
              <Paragraph
                className='backImg'
                onClick={value => this.props.handleCalculate(")", value)}
              >
                )
              </Paragraph>
            </MiniCard>

            <MiniCard
              squareroot
              onClick={value => this.props.handleCalculate("√", value)}
            ></MiniCard>

            <MiniCard
              pie
              onClick={value => this.props.handleCalculate("π", value)}
            ></MiniCard>

            <MiniCard
              greaterthan
              onClick={value => this.props.handleCalculate(">", value)}
            ></MiniCard>

            <MiniCard
              lowerthan
              onClick={value => this.props.handleCalculate("<", value)}
            ></MiniCard>

            <MiniCard
              square
              onClick={value => this.props.handleCalculate("²", value)}
            ></MiniCard>
          </div>
          <PrimaryButton
            style={{
              background: "#001328",
              color: "white",
              marginTop: "100px",
              marginLeft: "10px"
            }}
          >
            Submit
          </PrimaryButton>
        </FlexContainer>
      </FlexContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    textBody:
      state.testConfigurationReducers.equationConfigurationReducer.textBody
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleCalculate: value => {
      dispatch({ type: ADD_EQUATION_SYMBOLS, payload: value });
      console.log(value);
    },
    onChangeTextBox: event => {
      dispatch({
        type: ADD_TEXT_BODY_WITH_KEYPRESS,
        payload: event.target.value
      });
      // console.log(event.target.value);
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddTestEquation);
