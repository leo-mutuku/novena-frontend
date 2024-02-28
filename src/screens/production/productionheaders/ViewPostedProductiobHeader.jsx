import React from "react";
import { Row, Col, Table } from "react-bootstrap";
import { Stack, Button } from "@mui/material";

const ViewPostedProductiobHeader = () => {
  const handleExcel = (e) => {};
  const handleA4PDF = (e) => {};
  const handleA5PDF = (e) => {};
  return (
    <>
      <Row>
        <Col>
          <p>** Production Report </p>
        </Col>
      </Row>
      <Row>
        <Col>Batch Number {}</Col>
        <Col>Date{}</Col>
        <Col> Input{}</Col>
        <Col>OutPut{}</Col>
        <Col>Expected{}</Col>
        <Col> Variance{}</Col>
      </Row>
      <hr></hr>
      <Row>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Output</th>
              <th> Weiht kgs</th>
              <th> Weiht 90 kgs</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>{}</th>
              <th>{}</th>
              <th> {}</th>
              <th> {}</th>
            </tr>
          </tbody>
        </Table>
      </Row>
      <Row>
        <Col>Raw Material Cost {}</Col>
        <Col>Packaging Cost {}</Col>
        <Col>Production Value{}</Col>
      </Row>
      <hr></hr>

      <Row>
        <Col></Col>

        <Col>
          <Stack spacing={2} direction="row">
            <Button variant="outlined" onClick={handleExcel}>
              Excel
            </Button>
            <Button variant="outlined" onClick={handleA4PDF}>
              PDF Grid
            </Button>
            <Button variant="outlined" onClick={handleA5PDF}>
              PDF Plain
            </Button>
          </Stack>
        </Col>
      </Row>
    </>
  );
};

export default ViewPostedProductiobHeader;
