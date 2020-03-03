import React, { Component } from "react";
import { Steps, Button, message } from "antd";
import "antd/dist/antd.css";
import "./styleTestConfig.css";
import TestConfig from "./TestConfiguration";
import ParameterConfig from "./ParameterConfiguration";
import EquationConfiguration from "./EquationConfiguration";
import GraphConfiguration from "./GraphConfiguration";
import ManageTestConfiguration from "./ManageTestConfiguration";
import AddTestName from "./configure/AddTestName";
import AddTestParameter from "./configure/AddTestParameter";
import AddTestEquation from "./configure/AddTestEquation";
import AddTestAcceptedValue from "./configure/AddTestAcceptedValue";

const { Step } = Steps;

const steps = [
  {
    title: "First",
    content: <AddTestName />
  },
  {
    title: "Second",
    content: <AddTestParameter />
  },
  {
    title: "Third",
    content: <AddTestEquation />
  },
  {
    title: "Fourth",
    content: <AddTestAcceptedValue />
  },
  {
    title: "Fifth",
    content: <GraphConfiguration />
  },
  {
    title: "Last",
    content: <ManageTestConfiguration />
  }
];

export default class TestConfigurationMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 2
    };
  }

  onChange = current => {
    console.log("onChange:", current);
    this.setState({ current });
  };

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { current } = this.state;
    return (
      <div>
        <Steps
          labelPlacement='horizontal'
          current={current}
          size='default'
          className='step-area'
          onChange={this.onChange}
        >
          {steps.map(item => (
            <Step
              key={item.title}
              title={item.title}
              style={{ color: "#001328" }}
            />
          ))}
        </Steps>
        <div>{steps[current].content}</div>
        <div className='steps-action'>
          {current < steps.length - 1 && (
            <Button
              type='primary'
              onClick={() => this.next()}
              style={{
                backgroundColor: "#001328",
                color: "white",
                border: "none"
              }}
            >
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type='primary'
              onClick={() => message.success("Processing complete!")}
              style={{
                background: "#001328",
                color: "white",
                border: "none"
              }}
            >
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
          )}
        </div>
      </div>
    );
  }
}
