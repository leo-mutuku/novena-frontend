import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";
import { useGetRouteQuery, useUpdateRouteMutation } from "../../../slices/fleet/routesApiSlice";

function EditRoute() {
  const [name, setName] = useState("");
  const [start_location, setStartLocation] = useState("");
  const [end_location, setEndLocation] = useState("");
  const [distance_km, setDistanceKm] = useState("");
  
  const [updateRoute, { isError, isSuccess, error: errorUpdate }] =
    useUpdateRouteMutation();

  const { id } = useParams();
  const navigate = useNavigate();

  //call Route get query
  const { data: Route, error, isLoading } = useGetRouteQuery(id);

  useEffect(() => {
    if (error && id) {
      toast.error("Something went wrong: " + error.message);
      console.log(JSON.stringify(error.message));
    }
  }, [id, error]);

  useEffect(() => {
    if (id) {
      if (Route) {
        setName(Route.data.name);
        setStartLocation(Route.data.start_location);
        setEndLocation(Route.data.end_location);
        setDistanceKm(Route.data.distance_km);
      }
    }
  }, [id, Route]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name && !start_location && !end_location && !distance_km) {
      toast.error("Please provide value into each input field");
    } else {
      const dataRoute = {
        name,
        start_location,
        end_location,
        distance_km,
      };
      try {
        const result = await updateRoute({
          id,
          data: dataRoute,
        }).unwrap();

        toast.success(result.message);

        navigate("../allroutes");
      } catch (error) {
        toast.error(error.message);
        console.error("Failed to update route:", error);
      }
    }
  };
  return (
    <>
      <span>*** Edit Route ***</span>
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
          Update
        </Button>

        {isLoading && <Loader />}
      </Form>
    </>
  );
}

export default EditRoute;
