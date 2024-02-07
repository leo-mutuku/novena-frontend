import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAddDriverMutation } from "../../../slices/fleet/driverApislice";
import { useGetAllStaffQuery } from "../../../slices/administration/staffApiSlice";

function CreateDrivers() {
  const [name, setName] = useState("");
  const [license_number, setLicenseNumber] = useState("");
  const [contact_number, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const { data: staff } = useGetAllStaffQuery();
  //call driver add mutation
  const [addDriver, { isLoading }] = useAddDriverMutation();
  const navigate = useNavigate();

  const handleStaff = (e) => {
    let x = staff?.data?.filter((a) => {
      if (a.staff_number == e.target.value) {
        return a.first_name;
      }
    });
    setName(x[0].staff_number +" "+ x[0].first_name + " " + x[0].last_name)
    set_first_name(x[0].first_name);
    set_last_name(x[0].last_name);

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await addDriver({
        name,
        license_number,
        contact_number,
        email,
      }).unwrap();
      toast.success(res.message);
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
              <Form.Select
                type="number"
                required
                placeholder="Driver Name"
                value={name}
                onChange={handleStaff}
              >
                {staff?.data?.map((item) => (
                  <option value={item.staff_number}>
                    {item.staff_number} | {item.first_name}
                  </option>
                ))}
              </Form.Select>
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
