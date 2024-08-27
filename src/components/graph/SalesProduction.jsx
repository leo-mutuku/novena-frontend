import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";

const data = [
  {
    name: "Jan",
    sales: 4000,
    prod: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
    sales: 3000,
    prod: 1398,
    amt: 2210,
  },
  {
    name: "Mar",
    sales: 0,
    prod: 0,
    amt: 0,
  },
  {
    name: "Apr",
    sales: 0,
    prod: 0,
    amt: 0,
  },
  {
    name: "May",
    sales: 0,
    prod: 0,
    amt: 0,
  },
  {
    name: "June",
    sales: 0,
    prod: 0,
    amt: 0,
  },
  {
    name: "July",
    sales: 0,
    prod: 0,
    amt: 0,
  },
  {
    name: "Aug",
    sales: 0,
    prod: 0,
    amt: 0,
  },
  {
    name: "Sept",
    sales: 0,
    prod: 0,
    amt: 0,
  },
  {
    name: "Oct",
    sales: 0,
    prod: 0,
    amt: 0,
  },
  {
    name: "Nov",
    sales: 0,
    prod: 0,
    amt: 0,
  },
  {
    name: "Dec",
    sales: 0,
    prod: 0,
    amt: 0,
  },
];

export default function SalesProduction() {
  return (
    <div className="d-flex align-items-center">
      <LineChart
        width={960}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 50,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <ReferenceLine x="Mar" stroke="red" label="First Quarter" />
        <ReferenceLine y={9800} label="Max" stroke="red" />
        <ReferenceLine x="June" stroke="red" label="Second Quarter" />
        <ReferenceLine x="Sept" stroke="red" label="Third Quarter" />
        <ReferenceLine x="Dec" stroke="red" label="Last Quarter" />
        <Line type="monotone" dataKey="prod" stroke="#8884d8" />
        <Line type="monotone" dataKey="sales" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
}
