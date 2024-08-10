import React from "react";
import { Grid } from "@mui/material";
import { Card, Container } from "react-bootstrap";

const PurchaseDashboard = () => {
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
    </>
  );
};

export default PurchaseDashboard;
