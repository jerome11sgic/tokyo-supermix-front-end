import React, { Component } from "react";
import AddGraph from "./graph/AddGraph";
import ManageGraph from "./graph/ManageGraph";

export default class GraphConfiguration extends Component {
  render() {
    return (
      <div
        style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}
      >
        <AddGraph />
        <ManageGraph />
      </div>
    );
  }
}
