import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetDriverQuery,
  useUpdateDriverMutation,
} from "../../../slices/fleet/driverApislice";
import Loader from "../../../components/Loader";

function EditDriver() {
  const [name, setName] = useState("");
  const [license_number, setLicenseNumber] = useState("");
  const [contact_number, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [updateDriver] = useUpdateDriverMutation();
  const { id } = useParams();
  const navigate = useNavigate();

  //call driver get query
  const { data: driver, error, isLoading } = useGetDriverQuery(id);

  useEffect(() => {
    if (error && id) {
      toast.error("Something went wrong: " + error.message);
      console.log(JSON.stringify(error.message));

    }
  }, [id, error]);

  useEffect(() => {
    if (id) {
      if (driver) {
        setName(driver.data.name);
        setContactNumber(driver.data.contact_number);
        setLicenseNumber(driver.data.license_number);
        setEmail(driver.data.email);
      }
    }
  }, [id, driver]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name && !license_number && !email && !contact_number) {
      toast.error("Please provide value into each input field");
    } else {

      const dataDriver = {

      await updateDriver(id, { 
       name,
        license_number,
        contact_number,
        email,
      };
      
      try {
        const result = await updateDriver({
          id,
          data: dataDriver,
        }).unwrap();

        toast.success(result.message);

        navigate("../alldrivers");
      } catch (error) {
        toast.error(error.message);
        console.error("Failed to update driver:", error);
      }
      });
      navigate("../alldrivers");
      toast.success("Driver Updated Successfully");
    }
  };
  return (
    <>
      <span>*** Edit Driver ***</span>
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
          Update
        </Button>

        {isLoading && <Loader />}
      </Form>
    </>
  );
}

export default EditDriver;
