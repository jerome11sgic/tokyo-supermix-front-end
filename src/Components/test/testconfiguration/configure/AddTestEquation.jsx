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
  ADD_TEXT_BODY_WITH_KEYPRESS,
  ADD_PARAMETERS
} from "../../../../redux/action/testconfiguration/TestConfiguration";

class AddTestEquation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      equations: [],
      textBoxEquation: "",
      cards: []
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      textBoxEquation: nextProps.textBody
    });
  }

  //render mini cards as per cards in the redux state
  // renderMiniCards = () => {
  //   this.state.cards.map((post, index) => {
  //     return (
  //       <MiniCard letters key={index}>
  //         <Paragraph className='backImg'>{post}</Paragraph>
  //       </MiniCard>
  //     );
  //   });
  // };

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
    console.log(this.props.cards);
    return (
      <FlexContainer style={{ width: "600px" }}>
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
        </FlexContainer>

        <FlexContainer className='letters_area'>
          {this.props.cards.map((post, index) => (
            <MiniCard
              letters
              key={index}
              name={post}
              onClick={name => this.props.selectParameters(post, name)}
            >
              <Paragraph className='backImg'>{post}</Paragraph>
            </MiniCard>
          ))}
          {/* {this.renderMiniCards()} */}
        </FlexContainer>
      </FlexContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    textBody:
      state.testConfigurationReducers.equationConfigurationReducer.textBody,
    cards: state.testConfigurationReducers.equationConfigurationReducer.cards
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
    },
    selectParameters: post => {
      console.log(post);
      dispatch({ type: ADD_PARAMETERS, payload: post });
      console.log("record pushed " + post);
    }
    //test parameter
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddTestEquation);
