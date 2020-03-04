import React, { PureComponent, Component } from "react";
import "./strengthchart.css";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label
} from "recharts";

const data = [
  {
    name: "Day 3",
    uv: 15
  },
  {
    name: "Day 5",
    uv: 25
  },
  {
    name: "Day 7",
    uv: 55
  },
  {
    name: "Day 14",
    uv: 45
  },
  {
    name: "Day 28",
    uv: 25
  }
];

const style = {
  margin: "5px",
  color: "red"
};

export default class StrengthTest extends PureComponent {
  render() {
    return (
      <div className='chartStyle'>
        <h3>Strength Test</h3>
        <ResponsiveContainer>
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' label={{ value: "Dates", position: "top" }} />
            <YAxis />
            <Tooltip />

            <Area
              type='monotone'
              dataKey='uv'
              stroke='#8884d8'
              fill='#8884d8'
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
