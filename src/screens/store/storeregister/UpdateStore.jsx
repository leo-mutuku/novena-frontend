import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { Stack, Button } from "@mui/material";

const UpdateStore = () => {
  const [] = useState("");
  return (
    <>
      <Row>
        <p>** Update Supplier **</p>
      </Row>
      <Row>
        <Col>
          <Form.Group className="my-2" controlId="Item_Name">
            <Form.Label>Item Unit Value</Form.Label>
            <Form.Control
              disabled
              type="number"
              required
              placeholder="Item Name"
              value={""}
              onChange={""}
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="my-2" controlId="Store Name">
            <Form.Label>Store Name</Form.Label>
            <Form.Control
              disabled
              type="number"
              required
              placeholder="Store Name"
              value={""}
              onChange={""}
            ></Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="my-2" controlId="Item_quantity">
            <Form.Label>Item quantity</Form.Label>
            <Form.Control
              type="number"
              required
              placeholder="Item quantity"
              value={""}
              onChange={""}
            ></Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <br></br>
      <Row>
        <Col></Col>
        <Col></Col>
        <Col>
          <Stack>
            <Button variant="outlined">Update</Button>
          </Stack>
        </Col>
      </Row>
    </>
  );
};

export default UpdateStore;
