import React from "react";
import { Chart } from "react-charts";

function MyChart(props) {
  const { monthlyIncome, monthlySavings } = props;
  const data = React.useMemo(
    () => [
      {
        label: "Brent's Savings",
        data: [
          [0, 3],
          [1, 1],
          [2, 5],
          [3, 6],
          [4, 4]
        ]
      }
    ],
    []
  );

  const axes = React.useMemo(
    () => [
      { primary: true, type: "linear", position: "bottom" },
      { type: "linear", position: "left" }
    ],
    []
  );

  const lineChart = (
    // A react-chart hyper-responsively and continuusly fills the available
    // space of its parent element automatically
    <div
      style={{
        width: "400px",
        height: "300px"
      }}
    >
      <Chart data={data} axes={axes} />
    </div>
  );

  return lineChart;
}

export default MyChart;
