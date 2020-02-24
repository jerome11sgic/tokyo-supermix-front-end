import { Chart } from "primereact/chart";
import { render } from "@testing-library/react";
import React from "react";

export const Linechart = data => {
  return <Chart type="line" data={data} />;
};
