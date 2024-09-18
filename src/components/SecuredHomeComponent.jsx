import { Container, Card, Row, Col, Toast } from "react-bootstrap";
import { useState, useEffect } from "react";
import { TbBuildingFactory } from "react-icons/tb";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { LiaWarehouseSolid } from "react-icons/lia";
import { BiFontColor, BiPurchaseTag } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { FaTrailer } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import { GiWallet } from "react-icons/gi";
import { RiSecurePaymentFill } from "react-icons/ri";
import SalesProduction from "../components/graph/SalesProduction";
import Grid from "@mui/material/Grid";
import { GrTechnology } from "react-icons/gr";

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
      bg: "#93c741",
      fontColor: "#fff",
    },
    {
      module_name: "Sales",
      to: "/sales",
      Icon: HiOutlineShoppingCart,
      role: 2000,
      bg: "#5dade2",
      fontColor: "#fff",
    },
    {
      module_name: "Finance",
      to: "/finance",
      Icon: FaRegMoneyBillAlt,
      role: 9999,
      bg: "#f39c12",
      fontColor: "#fff",
    },
    {
      module_name: "Store",
      to: "/store",
      Icon: LiaWarehouseSolid,
      role: 4000,
      bg: "#2ecc71",
      fontColor: "#fff",
    },
    {
      module_name: "Purchase",
      to: "/purchase",
      Icon: BiPurchaseTag,
      role: 5000,
      bg: "#70B8DB",
      fontColor: "#fff",
    },
    {
      module_name: "Admin",
      to: "/administration",
      Icon: FiUsers,
      role: 6000,
      bg: "#43DDD5 ",
      fontColor: "#fff",
    },

    {
      module_name: "Fleet",
      to: "/fleet",
      Icon: FaTrailer,
      role: 5000,
      bg: "#B1B100",
      fontColor: "#fff",
    },
    {
      module_name: "Payroll",
      to: "/payroll",
      Icon: GiWallet,
      role: 8000,
      bg: "#1A928C",
      fontColor: "#fff",
    },
    {
      module_name: "Payment",
      to: "/payment",
      Icon: RiSecurePaymentFill,
      role: 9999,
      bg: "#FF6262",
      fontColor: "#fff",
    },
    {
      module_name: "ICT",
      to: "/ict",
      Icon: GrTechnology,
      role: 9999,
      bg: "#3498db",
      fontColor: "#fff",
    },
  ];

  return (
    <>
      {/* <div className=" py-4">
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
      </div> */}
      <Grid container gap={3} sx={{ marginTop: "20px" }}>
        {moduleMenu.map((module) => (
          <Grid
            item
            sx={{
              flex: { xs: "1 0 18rem", md: "1 0 18rem" },
              height: { xs: "10rem", md: "10rem" },
              background: module?.bg ? module.bg : "#Efffff",
              backgroundImage: module?.bgIcon
                ? `url(${module.bgIcon})`
                : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <Link to={userInfo.roles?.includes(module.role) ? module.to : "#"}>
              <Card
                className="w-100  bg-transparent border-0"
                key={module.module_name}
                style={{
                  color: module?.fontColor ? module.fontColor : "#000",
                  fontSize: "20px",
                  fontWeight: "bold",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                }}
              >
                <Card.Body
                  style={{
                    padding: "2rem", // Increase padding for more space inside the card
                    height: "auto", // You can set a specific height, e.g., '15rem', if needed
                    width: "100%", // Ensure it takes the full width of the parent container
                  }}
                >
                  <Card.Title
                    style={{
                      fontSize: "12px",
                      textAlign: "center",
                      whiteSpace: "nowrap", // Prevent wrapping
                      overflow: "hidden", // Hide overflow
                      textOverflow: "ellipsis", // Show ellipsis if text overflows
                      maxWidth: "200%", // Ensure it doesn't overflow outside the card
                    }}
                  >
                    <h3>{module.module_name}</h3>
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {module.module_sub_title}
                  </Card.Subtitle>
                  <Card.Text>{<module.Icon size={50} />}</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Grid>
        ))}
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
              <p style={{ color: "red" }}>MOGULAFRIC&trade;</p>
            </div>
          </Card>
        </Container>
      </div>
      <Outlet />
    </>
  );
};
export default SecuredHomeComponent;
