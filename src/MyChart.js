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

const getRandomHexColor = () => '#'+(Math.random()*0xFFFFFF<<0).toString(16);

const calculateSavingsPoints = (finances) => {
  if (!!finances) {
    const dataPoints = [];
    let months = 12
    for (let i = 0; i < months; i++) {
      const dataPoint = {}
      dataPoint['name'] = `Month ${i + 1}`;
      Object.values(finances).forEach((finance) => {
        dataPoint[finance.id] = finance.amount * (i + 1)
      })
      dataPoints.push(dataPoint);
    }
    return dataPoints;
  }
};

const generateLines = (finances) => {
  if (finances) {
    const lines = []
    Object.values(finances).forEach((finance) =>
      lines.push(<Line
        type="monotone"
        key={ finance.id }
        dataKey={ finance.id }
        stroke={ finance.color || getRandomHexColor() }
        name={ finance.title }
      />)
    )
    return lines
  }
  return null
}

function MyChart(props) {
  const { finances } = props;
  // React.useMemo ?
  const data = calculateSavingsPoints(finances);
  console.log(generateLines(finances))

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
        { generateLines(finances) }
      </LineChart>
    </ResponsiveContainer>
  );

  return lineChart;
}

export default MyChart;
