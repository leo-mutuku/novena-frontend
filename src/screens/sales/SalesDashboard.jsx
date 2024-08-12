import React from "react";
import { Row, Col, Table } from "react-bootstrap";

import {
  Button,
  Card,
  Container,
  Grid,
  Box,
  Typography,
  Divider,
  Stack,
  Chip,
  Alert,
} from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import CheckIcon from "@mui/icons-material/Check";
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
import SalesCard from "../../components/dashboard/SalesCard";
import { IoIosCart, IoIosPricetag } from "react-icons/io";
import { GrMoney } from "react-icons/gr";
import { MdAttachMoney } from "react-icons/md";
import { FcDebt } from "react-icons/fc";

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
            flex: { xs: "1 0 15rem", md: "1 0 15rem" },
            height: { xs: "5rem", md: "5rem" },
            background: "transparent",
            border: "1px solid #E2EEFE",
            borderRadius: "10px",
          }}
        >
          <Grid flexDirection={"row"} sx={{ padding: "5px" }}>
            <IoIosCart
              size={20}
              style={{
                padding: "2px",
                color: "white",
                background: "#443dfb",
                borderRadius: "10px",
              }}
            />{" "}
            <span variant="h6">Total Sales</span>
          </Grid>
          <Divider sx={{ margin: "3px" }} />
          <Stack>
            <Row style={{ padding: "5px" }}>
              <Col>
                <p>Ksh. 23084773.</p>
              </Col>
              <Col xs={4} style={{ fontSize: "9px" }}>
                <p style={{ margin: "-3px 0px" }}>25%</p>
                <p>This Week</p>
              </Col>
            </Row>
          </Stack>
          <Stack></Stack>
        </Grid>
        <Grid
          item
          sx={{
            flex: { xs: "1 0 15rem", md: "1 0 15rem" },
            height: { xs: "5rem", md: "5rem" },
            background: "transparent",
            border: "1px solid #E2EEFE",
            borderRadius: "10px",
          }}
        >
          <Grid flexDirection={"row"} sx={{ padding: "5px" }}>
            <GrMoney
              size={20}
              style={{
                padding: "4px",
                color: "white",
                background: "lightgreen",
                borderRadius: "10px",
              }}
            />{" "}
            <span variant="h6">Total Payments</span>
          </Grid>
          <Divider sx={{ margin: "3px" }} />
          <Stack>
            <Row style={{ padding: "5px" }}>
              <Col>
                <p>Ksh. 23084773.</p>
              </Col>
              <Col xs={4} style={{ fontSize: "9px" }}>
                <p style={{ margin: "-3px 0px" }}>25%</p>
                <p>This Week</p>
              </Col>
            </Row>
          </Stack>
          <Stack></Stack>
        </Grid>
        <Grid
          item
          sx={{
            flex: { xs: "1 0 15rem", md: "1 0 15rem" },
            height: { xs: "5rem", md: "5rem" },
            background: "transparent",
            border: "1px solid #E2EEFE",
            borderRadius: "10px",
          }}
        >
          <Grid flexDirection={"row"} sx={{ padding: "5px" }}>
            <FcDebt
              size={20}
              style={{
                padding: "2px",
                color: "white",
                background: "#8f8fba",
                borderRadius: "10px",
              }}
            />{" "}
            <span variant="h6">Total Receivable</span>
          </Grid>
          <Divider sx={{ margin: "3px" }} />
          <Stack>
            <Row style={{ padding: "5px" }}>
              <Col>
                <p>Ksh. 23084773.</p>
              </Col>
              <Col xs={4} style={{ fontSize: "9px" }}>
                <p style={{ margin: "-3px 0px" }}>25%</p>
                <p>This Week</p>
              </Col>
            </Row>
          </Stack>
          <Stack></Stack>
        </Grid>

        {/* <Grid
          item
          sx={{
            flex: { xs: "1 0 25rem", md: "1 0 25rem" },
            height: { xs: "40rem", md: "40rem" },
            background: "transparent",
            border: "1px solid #E2EEFE",
            borderRadius: "10px",
          }}
        >
          <SalesCard />
        </Grid> */}
        <Grid
          item
          sx={{
            flex: { xs: "1 0 35rem", md: "1 0 35rem" },
            height: { xs: "13rem", md: "13rem" },
          }}
        >
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Table>
              <thead>
                <tr>
                  <th>Name.</th>
                  <th>T. Sales</th>
                  <th>T. Payment.</th>
                  <th>T. Receivables.</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Sales .P</td>
                  <td>Ksh. 28937846</td>
                  <td>Ksh. 28937846</td>
                  <td>Ksh. 28937846</td>
                </tr>
                <tr>
                  <td>Customers</td>
                  <td>Ksh. 28937846</td>
                  <td>Ksh. 28937846</td>
                  <td>Ksh. 28937846</td>
                </tr>
                <tr>
                  <td>Institutions</td>
                  <td>Ksh. 28937846</td>
                  <td>Ksh. 28937846</td>
                  <td>Ksh. 28937846</td>
                </tr>
              </tbody>
            </Table>
          </Stack>
        </Grid>
        <Grid
          item
          sx={{
            flex: { xs: "1 0 10rem", md: "1 0 10rem" },
            height: { xs: "13rem", md: "13rem" },
            background: "#E7EEFE",
          }}
        ></Grid>

        <Grid
          item
          sx={{
            flex: { xs: "1 0 50rem", md: "1 0 50rem" },
            height: { xs: "20rem", md: "20rem" },
          }}
        >
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert
              severity="success"
              action={
                <Button color="inherit" size="small">
                  23876
                </Button>
              }
            >
              ROSA CORN G1 101
            </Alert>
            <Alert
              severity="success"
              action={
                <Button color="inherit" size="small">
                  23876
                </Button>
              }
            >
              ROSA CORN G1 1KG BALE 101
            </Alert>
            <Alert
              severity="success"
              action={
                <Button color="inherit" size="small">
                  23876
                </Button>
              }
            >
              ROSA CORN G1 101
            </Alert>
            <Alert
              severity="success"
              action={
                <Button color="inherit" size="small">
                  23876
                </Button>
              }
            >
              EMAS 1KG BALE 102
            </Alert>
          </Stack>
        </Grid>
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
