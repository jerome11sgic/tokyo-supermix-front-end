import React, { Component } from "react";
import Chart from "react-apexcharts";
import "./sliders.css";

class BarChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 240,
      width: 450,
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: [
            "Peliyagoda",
            "Jaffna",
            "Trincomalee",
            "Ratmalana",
            "Pinnawala"
          ]
        }
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49]
        }
      ]
    };
  }

  componentWillMount() {
    if (window.screen.width > 1900) {
      console.log("resized for large screen");
      this.setState({
        height: 300,
        width: 800
      });
    } else if (window.screen.width < 1440) {
      console.log("resized for medium screen");
      this.setState({
        height: 245,
        width: 450
      });
    }
  }

  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type='bar'
        className='barchart'
        height={this.state.height}
        width={this.state.width}
        style={{ background: "#fffbed", height: "200px" }}
      />
    );
  }
}

export default BarChart;
