import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useCreateCustomerMutation } from "../../../slices/administration/customersApiSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateCustomer() {
  const [customer_email, set_customer_email] = useState("");
  const [customer_contact_person, set_customer_contact_person] = useState("");
  const [customer_outlet_name, set_customer_outlet_name] = useState("");
  const [customer_contact, set_customer_contact] = useState("");
  const [customer_location, set_customer_location] = useState("");
  const [created_by, set_created_by] = useState("");

  const [createCustomer, { isLoading }] = useCreateCustomerMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      set_created_by(userInfo.first_name);
    }
    navigate();
  }, [navigate, userInfo]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createCustomer({
        customer_email,
        customer_contact_person,
        customer_outlet_name,
        customer_contact,
        customer_location,
        created_by,
      }).unwrap();
      if (res.status == "failed") {
        toast.error(err?.data?.message || err.error);
      } else {
        navigate("../allcustomers");
        toast.success("Customer created successfully");
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <span>*** Create Customer ***</span>
      <Row>
        <div>
          {" "}
          <hr />
        </div>
      </Row>
      <Form onSubmit={handleSubmit}>
        {/* */}

        <Row>
          <Col>
            <Form.Group className="my-2" controlId="customer_email">
              <Form.Label>Customer Email</Form.Label>
              <Form.Control
                type="email"
                required
                placeholder="Customer email"
                value={customer_email}
                onChange={(e) => set_customer_email(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            {/* */}

            <Form.Group className="my-2" controlId="customer_name">
              <Form.Label>Customer Contact Person</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="customer_contact_person"
                value={customer_contact_person}
                onChange={(e) => set_customer_contact_person(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            {/* staff_number field */}
            <Form.Group className="my-2" controlId="customer contact">
              <Form.Label>Customer Phone number</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="customer Phone Number"
                value={customer_contact}
                onChange={(e) => set_customer_contact(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            {/* staff_number field */}
            <Form.Group className="my-2" controlId="Customer Outlet Name">
              <Form.Label>Customer Outlet Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Customer Outlet Name"
                value={customer_outlet_name}
                onChange={(e) => set_customer_outlet_name(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="my-2" controlId="customer_location">
              <Form.Label>Customer location</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Customer location"
                value={customer_location}
                onChange={(e) => set_customer_location(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit" variant="primary" className="mt-3">
          submit
        </Button>

        {/* {isLoading && <Loader />} */}
      </Form>
    </>
  );
}

export default CreateCustomer;
