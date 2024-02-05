import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAddDriverMutation } from "../../../slices/fleet/driverApislice";
import Loader from "../../../components/Loader";

function CreateDrivers() {
  const [name, setName] = useState("");
  const [license_number, setLicenseNumber] = useState("");
  const [contact_number, setContactNumber] = useState("");
  const [email, setEmail] = useState("");

  //call driver add mutation
  const [addDriver, { isLoading }] = useAddDriverMutation();
  const navigate = useNavigate();
  // useEffect(() => {
  //   navigate();
  // }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await addDriver({
        name,
        license_number,
        contact_number,
        email,
      }).unwrap();
      toast.success("Driver Added Successfully");
      navigate("../alldrivers");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <span>*** Add Driver ***</span>
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
            <Form.Group className="my-2" controlId="name">
              <Form.Label>Driver Name</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Driver name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            {/* */}
            <Form.Group className="my-2" controlId="license_number">
              <Form.Label>License Number</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="License Number"
                value={license_number}
                onChange={(e) => setLicenseNumber(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="my-2" controlId="contact_number">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="number"
                required
                placeholder="Phone Number"
                value={contact_number}
                onChange={(e) => setContactNumber(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            {/* */}
            <Form.Group className="my-2" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                required
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Button type="submit" variant="primary" className="mt-3">
          Submit
        </Button>

        {isLoading && <Loader />}
      </Form>
    </>
  );
}

export default CreateDrivers;
