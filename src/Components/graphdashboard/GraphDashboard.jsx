import React, { Component } from "react";
import { FlexContainer } from "../styledcomponents/container/FlexGrid";
import LineChart from "../homescreen/LineChart";
import LineBarChart from "../homescreen/LineBarChart";
import BarChart from "../homescreen/BarChart";
import Doughnut from "../homescreen/Doughnut";

export default class GraphDashboard extends Component {
  render() {
    return (
      <FlexContainer normal>
        <LineChart />
        <LineBarChart />
        <BarChart />
        <Doughnut />
      </FlexContainer>
    );
  }
}
