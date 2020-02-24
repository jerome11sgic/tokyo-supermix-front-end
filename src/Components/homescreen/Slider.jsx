import React, { Component } from "react";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
import Graph from "./BarChart";
import Doughnut from "./Doughnut";
import "./sliders.css";

const AutoplaySlider = withAutoplay(AwesomeSlider);

export default class Slider extends Component {
  render() {
    return (
      <div className="wrapper">
        <AutoplaySlider
          play={true}
          organicArrows={false}
          bullets={false}
          cancelOnInteraction={false} // should stop playing on user interaction
          interval={7000}
          className="slider"
        >
          <div style={{ borderRadius: "15px" }}>
            <h1 className="slider1_heading1">Plant Productivity Meter</h1>
            <Graph />
          </div>
          <div style={{ borderRadius: "15px" }}>
            <h1 className="slider1_heading2">Suppliers</h1>
            <Doughnut />
          </div>
        </AutoplaySlider>
      </div>
    );
  }
}
