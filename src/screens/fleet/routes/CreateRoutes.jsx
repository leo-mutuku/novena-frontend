import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAddRouteMutation } from "../../../slices/fleet/routesApiSlice";
import Loader from "../../../components/Loader";

function CreateRoutes() {
  const [name, setName] = useState("");
  const [start_location, setStartLocation] = useState("");
  const [end_location, setEndLocation] = useState("");
  const [distance_km, setDistanceKm] = useState("");

  //call route add mutation
  const [addRoute, { isLoading }] = useAddRouteMutation();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await addRoute({
        name,
        start_location,
        end_location,
        distance_km,
      }).unwrap(); //extract the actual payload from the action
      if (res.status === "failed") {
        toast.error(res.message);
      } else {
        toast.success(res.message);
        navigate("../allroutes");
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <span>*** Add Route ***</span>
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
              <Form.Label>Route Name</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Route name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            {/* */}
            <Form.Group className="my-2" controlId="start_location">
              <Form.Label>Start Location</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Start Location"
                value={start_location}
                onChange={(e) => setStartLocation(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="my-2" controlId="end_location">
              <Form.Label>End Location</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="End Location"
                value={end_location}
                onChange={(e) => setEndLocation(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            {/* */}
            <Form.Group className="my-2" controlId="distance_km">
              <Form.Label>Distance (KM)</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Distance in km"
                value={distance_km}
                onChange={(e) => setDistanceKm(e.target.value)}
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

export default CreateRoutes;
