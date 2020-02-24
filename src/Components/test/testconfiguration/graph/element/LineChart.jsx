import React, { Component } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const data = [
  { name: "0 days", uv: 0 },
  { name: "7 days", uv: 1 },
  { name: " 14 days", uv: 2 },
  { name: "21 days", uv: 4 },
  { name: "28 days", uv: 6 },
  { name: "35 days ", uv: 8 }
];
export default class LineChartConfig extends Component {
  render() {
    return (
      <div style={{ marginLeft: "-30px" }}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis name="Force (N)" />
          <Tooltip />
          <Legend />
          {/* <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} /> */}
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </div>
    );
  }
}
