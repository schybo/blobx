import React from "react";
import { Chart } from "react-charts";

const calculateSavingsPoints = (savings, months) => {
  const dataPoints = []
  for (let i = 0; i < months; i++) {
    dataPoints.push([i, savings * (i+1)])
  }
  return dataPoints
}

function MyChart(props) {
  const { monthlyIncome, monthlySavings, months } = props;
  const data = React.useMemo(
    () => [
      {
        label: "Brent's Savings",
        data: calculateSavingsPoints(monthlySavings, months)
      }
    ],
    // []
    [monthlySavings, months]
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
