import React, { useEffect, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { Stack, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCustomerByIdQuery } from "../../../slices/administration/customersApiSlice";

const UpdateCustomer = () => {
  const { id: _new_id } = useParams();
  const id = parseInt(_new_id);
  const [customer_outlet_name, set_customer_outlet_name] = useState("");
  const [customer_contact_person, set_customer_contact_person] = useState("");
  const [customer_contact, set_customer_contact] = useState("");
  const [customer_location, set_customer_location] = useState("");
  const [customer_buy_on_credit, set_customer_buy_oncredit] = useState("");
  const { data: customer } = useGetCustomerByIdQuery(id);
  useEffect(() => {
    if (id) {
      toast.error(`Error occured `);
    }
  }, [id, customer]);

  useEffect(() => {
    if (id) {
    }
  }, [id, customer]);

  return (
    <>
      <Row>
        <p>** Update Customers **</p>
      </Row>
      <Row>
        <Col>
          <Form.Group className="my-2" controlId="Item_Name">
            <Form.Label>Outlet Name</Form.Label>
            <Form.Control
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
            <Form.Label>Customer contact Person</Form.Label>
            <Form.Control
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
            <Form.Label>Customer contact</Form.Label>
            <Form.Control
              type="number"
              required
              placeholder="Item quantity"
              value={""}
              onChange={""}
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="my-2" controlId="Store Name">
            <Form.Label>Customer location/ Route</Form.Label>
            <Form.Control
              type="number"
              required
              placeholder="Store Name"
              value={""}
              onChange={""}
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="my-2" controlId="Store Name">
            <Form.Label>Buy On Credit</Form.Label>
            <Form.Control
              type="number"
              required
              placeholder="Store Name"
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

export default UpdateCustomer;
