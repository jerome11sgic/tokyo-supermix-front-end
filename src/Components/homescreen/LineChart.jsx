import React, { Component } from "react";
import Chart from "react-apexcharts";

class LineChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: "250",
      height: "190",
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }
      ]
    };
  }

  componentWillMount() {
    if (window.screen.width > 1900) {
      console.log("resized for large screen");
      this.setState({
        height: "250",
        width: "800"
      });
    } else if (window.screen.width < 1440) {
      console.log("resized for medium screen");
      this.setState({
        height: "240",
        width: "400"
      });
    }
  }

  render() {
    return (
      <div
        className='app'
        style={{ background: "#fffbed", borderRadius: "15px" }}
      >
        <div className='row'>
          <div className='mixed-chart'>
            <Chart
              options={this.state.options}
              series={this.state.series}
              type='area'
              width={this.state.width}
              height={this.state.height}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default LineChart;
