import { Container, Card, Row, Col, Toast } from "react-bootstrap";
import { useState, useEffect } from "react";
import { TbBuildingFactory } from "react-icons/tb";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { LiaWarehouseSolid } from "react-icons/lia";
import { BiPurchaseTag } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { FaTrailer } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import { GiWallet } from "react-icons/gi";
import { RiSecurePaymentFill } from "react-icons/ri";
import SalesProduction from "../components/graph/SalesProduction";
import Grid from "@mui/material/Grid";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Item from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { useSelector } from "react-redux";

const SecuredHomeComponent = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [accessDenied, setAccessDenied] = useState(false);
  const [roles, setRoles] = useState([]);
  console.log(roles);

  const moduleMenu = [
    {
      module_name: "Production",
      to: "/production",
      Icon: TbBuildingFactory,
      role: 1000,
    },
    {
      module_name: "Sales",
      to: "/sales",
      Icon: HiOutlineShoppingCart,
      role: 2000,
    },
    {
      module_name: "Finance",
      to: "/finance",
      Icon: FaRegMoneyBillAlt,
      role: 3000,
    },
    { module_name: "Store", to: "/store", Icon: LiaWarehouseSolid, role: 4000 },
    {
      module_name: "Purchase",
      to: "/purchase",
      Icon: BiPurchaseTag,
      role: 5000,
    },
    { module_name: "Admin", to: "/administration", Icon: FiUsers, role: 6000 },
    { module_name: "Fleet", to: "/fleet", Icon: FaTrailer, role: 7000 },
    { module_name: "Payroll", to: "/payroll", Icon: GiWallet, role: 8000 },
    {
      module_name: "Payment",
      to: "/payment",
      Icon: RiSecurePaymentFill,
      role: 9000,
    },
  ];

  return (
    <>
      <div className=" py-4">
        <Container className="d-flex justify-content-center">
          <Card
            className="p-5 d-flex flex-row align-items-center  hero-card bg-light w-100"
            style={{ width: "100%" }}
          >
            {moduleMenu.map((module) => (
              <Card className="w-75 m-2 " key={module.module_name}>
                <Link
                  to={userInfo.roles?.includes(module.role) ? module.to : "#"}
                >
                  <Card.Body>
                    <Card.Title
                      style={{ fontSize: "12px", textAlign: "center" }}
                    >
                      {module.module_name}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {module.module_sub_title}
                    </Card.Subtitle>
                    <Card.Text>{<module.Icon size={50} />}</Card.Text>
                  </Card.Body>
                </Link>
              </Card>
            ))}
          </Card>
        </Container>
      </div>
      <Grid container gap={3} sx={{ marginTop: "20px" }}>
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
      <Outlet />
    </>
  );
};
export default SecuredHomeComponent;
