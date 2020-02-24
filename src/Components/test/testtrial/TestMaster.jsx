import React, { Component } from "react";
import Test from "./Test";
import { Report } from "./Report";

export default class TestMaster extends Component {
  render() {
    return (
      <div
      // style={{
      //   height: "600px"
      // }}
      >
        {Report()}
      </div>
    );
  }
}
