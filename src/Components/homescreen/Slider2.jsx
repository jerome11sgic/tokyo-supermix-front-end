import React, { Component } from "react";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";

import LineBarChart from "./LineBarChart";
import LineChart from "./LineChart";
import "./sliders.css";

const AutoplaySlider = withAutoplay(AwesomeSlider);

export default class Slider2 extends Component {
  render() {
    return (
      <div className="wrapper">
        <AutoplaySlider
          play={true}
          organicArrows={false}
          bullets={false}
          cancelOnInteraction={false} // should stop playing on user interaction
          interval={6000}
          className="slider2"
        >
          <div style={{ borderRadius: "15px" }}>
            <h1 className="slider2_heading1">Plant Productivity Meter</h1>
            <LineBarChart />
          </div>
          <div style={{ borderRadius: "15px" }}>
            <h1 className="slider2_heading2">Suppliers</h1>
            <LineChart />
          </div>
        </AutoplaySlider>
      </div>
    );
  }
}
