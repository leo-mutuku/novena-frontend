import React from "react";
import { Grid } from "@mui/material";
import { Card, Container } from "react-bootstrap";
import { useGetAllDailySalesQuery } from "../../slices/sales/salesOrderHeadersApiSlice";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

// Colors for each section of the pie
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const SalesDashboard = () => {
  const { data: dailySales, isLoading, isSuccess } = useGetAllDailySalesQuery();

  // Sample data
  const datay = [
    { name: "Group A", value: 0 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];
  console.log(datay);
  const data = [
    { name: "Group A", value: 0 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];

  const datax = [
    { day: "Monday", lastWeekSales: 300, currentWeekSales: 400 },
    { day: "Tuesday", lastWeekSales: 200, currentWeekSales: 300 },
    { day: "Wednesday", lastWeekSales: 278, currentWeekSales: 500 },
    { day: "Thursday", lastWeekSales: 189, currentWeekSales: 200 },
    { day: "Friday", lastWeekSales: 239, currentWeekSales: 300 },
    { day: "Saturday", lastWeekSales: 349, currentWeekSales: 700 },
    { day: "Sunday", lastWeekSales: 400, currentWeekSales: 600 },
  ];

  return (
    <>
      <Grid container gap={3} sx={{ marginTop: "20px" }}>
        <Grid
          item
          sx={{
            flex: { xs: "1 0 20rem", md: "1 0 20rem" },
            height: { xs: "20rem", md: "20rem" },
            background: "#E7EEFE",
          }}
        >
          <p
            style={{
              position: "absolute",
              padding: "10px",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            Daily Total Sales
          </p>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <ResponsiveContainer
              width="100%"
              height={400}
              style={{ marginTop: -40, backgroundPositionX: "center" }}
            >
              <PieChart>
                <Pie
                  data={datay}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={0}
                  dataKey="value"
                >
                  {datay.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </Grid>
        <Grid
          item
          sx={{
            flex: { xs: "1 0 20rem", md: "1 0 20rem" },
            height: { xs: "20rem", md: "20rem" },
            background: "#E7EEFE",
          }}
        >
          <p
            style={{
              position: "absolute",
              padding: "10px",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            Weekly Sales Comparison
          </p>
          <ResponsiveContainer
            width="100%"
            height={250}
            style={{ marginTop: 40, marginLeft: -10 }}
          >
            <LineChart
              width={500}
              height={250}
              data={datax}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="lastWeekSales"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="currentWeekSales"
                stroke="#82ca9d"
              />
            </LineChart>
          </ResponsiveContainer>
        </Grid>
        <Grid
          item
          sx={{
            flex: { xs: "1 0 20rem", md: "1 0 20rem" },
            height: { xs: "20rem", md: "20rem" },
            background: "#E7EEFE",
          }}
        ></Grid>
        <Grid
          item
          sx={{
            flex: { xs: "1 0 20rem", md: "1 0 20rem" },
            height: { xs: "20rem", md: "20rem" },
            background: "#E7EEFE",
          }}
        ></Grid>
        <Grid
          item
          sx={{
            flex: { xs: "1 0 20rem", md: "1 0 20rem" },
            height: { xs: "20rem", md: "20rem" },
            background: "#E7EEFE",
          }}
        ></Grid>
        <Grid
          item
          sx={{
            flex: { xs: "1 0 20rem", md: "1 0 20rem" },
            height: { xs: "20rem", md: "20rem" },
            background: "#E7EEFE",
          }}
        ></Grid>
      </Grid>
      <div className=" py-4">
        <Container className="d-flex justify-content-center">
          <Card
            className="p-5 d-flex flex-row align-items-center  hero-card bg-light w-100"
            style={{ width: "100%" }}
          >
            <div
              className=" flex align-items-center"
              style={{ textAlign: "center" }}
            >
              <p>
                {" "}
                &copy; 2024 : All rights reserved: Novena Maize Miller ltd ***{" "}
              </p>
              <p>ROSA CORN&trade;</p>
            </div>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default SalesDashboard;
