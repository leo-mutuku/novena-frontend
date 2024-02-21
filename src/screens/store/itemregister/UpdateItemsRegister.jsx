import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { Stack, Button } from "@mui/material";

const UpdateItemsRegister = () => {
  const [item_name, set_item_name] = useState("");
  const [item_code, set_item_code] = useState("");
  const [account_number, set_account_number] = useState("");
  const [current_price, set_current_price] = useState("");
  const [item_units, set_item_units] = useState("");
  const [item_unit_value, set_item_unit_value] = useState("");
  const handleAccountNumber = () => {};
  return (
    <>
      <Row>
        <p>***Update item register** </p>
      </Row>
      <Row>
        <Col>
          <Form.Group className="my-2" controlId="item_name">
            <Form.Label>Item Name</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="item_name"
              value={item_name}
              onChange={(e) => set_item_name(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="my-2" controlId="item_code">
            <Form.Label>Item code</Form.Label>
            <Form.Control
              disabled
              type="number"
              required
              placeholder="Item code"
              value={item_code}
              onChange={(e) => set_item_code(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="my-2" controlId="item_units">
            <Form.Label>Items Units</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Items Unit"
              value={item_units}
              onChange={(e) => set_item_units(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          {" "}
          <Form.Group className="my-2" controlId="account_number">
            <Form.Label>Account_number</Form.Label>
            <Form.Select
              type="number"
              required
              placeholder="Account Number"
              value={account_number}
              onChange={handleAccountNumber}
            >
              <option>default</option>
              {<option>entries list</option>}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="my-2" controlId="current_price">
            <Form.Label>Current Price</Form.Label>
            <Form.Control
              type="number"
              required
              placeholder="current_price"
              value={current_price}
              onChange={(e) => set_current_price(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="my-2" controlId="">
            <Form.Label>Item Unit Value</Form.Label>
            <Form.Control
              type="number"
              required
              placeholder="Item Unit Value"
              value={item_unit_value}
              onChange={(e) => set_item_unit_value(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <br></br>

      <Row>
        <Col></Col>
        <Col></Col>
        <Col>
          <Stack spacing={2} direction={"left"}>
            <Button variant="outlined">Update</Button>
          </Stack>
        </Col>
      </Row>
    </>
  );
};

export default UpdateItemsRegister;
