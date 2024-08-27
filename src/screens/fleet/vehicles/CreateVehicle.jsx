import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";
import { useAddVehicleMutation } from "../../../slices/fleet/vehicleApiSlice";

function CreateVehicle() {
  const [registration_number, setRegNumber] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");

  //call vehicle add mutation
  const [addVehicle, { isLoading, error }] = useAddVehicleMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error("Something went wrong: " + error.message);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await addVehicle({
        registration_number,
        model,
        year,
      }).unwrap(); //extract the actual payload from the action
      if (res.status == "failed") {
        toast.error(res.message);
      } else {
        toast.success(res.message);
        navigate("../allvehicles");
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <span>*** Add Vehicle ***</span>
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
            <Form.Group className="my-2" controlId="registration_number">
              <Form.Label>Vehicle Registration</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Registration Number"
                value={registration_number}
                onChange={(e) => setRegNumber(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            {/* */}
            <Form.Group className="my-2" controlId="model">
              <Form.Label>Vehicle Model</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Vehicle Model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="my-2" controlId="year">
              <Form.Label>Year of Manufacture</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Year of Manufacture"
                value={year}
                onChange={(e) => setYear(e.target.value)}
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

export default CreateVehicle;
