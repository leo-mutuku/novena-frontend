import React, { useEffect, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { Stack, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetCustomerByIdQuery,
  useUpdateCustomerMutation,
} from "../../../slices/administration/customersApiSlice";
import { toast } from "react-toastify";

const UpdateCustomer = () => {
  const navigate = useNavigate();
  const { id: _new_id } = useParams();
  const id = parseInt(_new_id);
  const [customer_id, set_customer_id] = useState(0);
  const [customer_email, set_customer_email] = useState("");
  const [customer_outlet_name, set_customer_outlet_name] = useState("");
  const [customer_contact_person, set_customer_contact_person] = useState("");
  const [customer_contact, set_customer_contact] = useState("");
  const [customer_location, set_customer_location] = useState("");

  const { data: customer } = useGetCustomerByIdQuery(id);
  const [Update] = useUpdateCustomerMutation();

  useEffect(() => {
    if (id) {
      set_customer_id(parseInt(id));
      set_customer_email(customer?.data.customer_email);
      set_customer_contact(customer?.data.customer_contact);
      set_customer_contact_person(customer?.data.customer_contact_person);
      set_customer_outlet_name(customer?.data.customer_outlet_name);
      set_customer_location(customer?.data.customer_location);
    }
  }, [id, customer]);

  const handleUpdateCustomer = async (e) => {
    try {
      e.preventDefault();
      const res = await Update({
        customer_id,
        customer_email,
        customer_contact,
        customer_contact_person,
        customer_location,
        customer_outlet_name,
      }).unwrap();
      if (res.status == "success") {
        toast.success(" updated successfully");
        navigate("../allcustomers");
      }
    } catch (error) {}
  };

  return (
    <>
      <Row>
        <p>** Update Customers **</p>
      </Row>
      <Row>
        <Col>
          <Form.Group className="my-2" controlId="Item_Name">
            <Form.Label>Customer Email</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Item Name"
              value={customer_email}
              onChange={(e) => set_customer_email(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="my-2" controlId="Store Name">
            <Form.Label>Customer contact Person</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Contact person name"
              value={customer_contact_person}
              onChange={(e) => set_customer_contact_person(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="my-2" controlId="Item_quantity">
            <Form.Label>Customer Phone number</Form.Label>
            <Form.Control
              type="number"
              required
              placeholder=""
              value={customer_contact}
              onChange={(e) => set_customer_contact(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="my-2" controlId="Store Name">
            <Form.Label>Customer Outlet Name</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder=""
              value={customer_outlet_name}
              onChange={(e) => set_customer_outlet_name(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="my-2" controlId="Store Name">
            <Form.Label>Customer location</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Store Name"
              value={customer_location}
              onChange={(e) => set_customer_location(e.target.value)}
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
            <Button onClick={handleUpdateCustomer} variant="outlined">
              Update
            </Button>
          </Stack>
        </Col>
      </Row>
    </>
  );
};

export default UpdateCustomer;
