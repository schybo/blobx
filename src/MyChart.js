import React from "react";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer
} from "recharts";

const calculateSavingsPoints = (income, savings, months, rent) => {
  const dataPoints = [];
  for (let i = 0; i < months; i++) {
    dataPoints.push({
      name: `Month ${i + 1}`,
      pv: savings * (i + 1),
      uv: income * (i + 1),
      vv: rent * (i + 1)
    });
  }
  return dataPoints;
};

function MyChart(props) {
  const { monthlyIncome, monthlySavings, months, rent } = props;
  // console.log("HERE");
  // const data = React.useMemo(
  //   () => [
  //     {
  //       data: calculateSavingsPoints(monthlySavings, months)
  //     }
  //   ],
  //   // []
  //   [monthlySavings, months]
  // );
  const data = calculateSavingsPoints(
    monthlyIncome,
    monthlySavings,
    months,
    rent
  );

  const lineChart = (
    // A react-chart hyper-responsively and continously fills the available
    // space of its parent element automatically
    <ResponsiveContainer width="90%" height={250}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        <Line type="monotone" dataKey="vv" stroke="#858a9d" />
      </LineChart>
    </ResponsiveContainer>
  );

  return lineChart;
}

export default MyChart;
