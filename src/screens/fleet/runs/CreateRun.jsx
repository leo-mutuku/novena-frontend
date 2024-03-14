import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Loader from "../../../components/Loader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetAllRoutesQuery } from "../../../slices/fleet/routesApiSlice";
import { useGetAllVehiclesQuery } from "../../../slices/fleet/vehicleApiSlice";
import { useAddVehicleRunMutation } from "../../../slices/fleet/runsApiSlice";

function CreateRun() {
  const [start_mileage, setStartMileage] = useState();
  const [start_fuel_capacity, setStartFuelCap] = useState();
  const [route_id, setRouteId] = useState();
  const [vehicle_id, setVehicleId] = useState();
  const { data: routes } = useGetAllRoutesQuery();
  const { data: vehicles } = useGetAllVehiclesQuery();
  const [addVehicleRun, { isLoading }] = useAddVehicleRunMutation();
  const navigate = useNavigate();

  const handleVehicle = (e) => {
    let x = vehicles?.data?.filter((a) => {
      if (a.vehicle_id == e.target.value) {
        return a.registration_number;
      }
    });
    setVehicleId(x[0].vehicle_id);
  };

  const handleRoute = (e) => {
    let x = routes?.data?.filter((a) => {
      if (a.route_id == e.target.value) {
        return a.name;
      }
    });
    setRouteId(x[0].route_id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await addVehicleRun({
        vehicle_id,
        route_id,
        start_mileage,
        start_fuel_capacity,
      }).unwrap();
      if (res.status === "failed") {
        toast.error(res.message);
      } else {
        toast.success(res.message);
        navigate("../allruns");
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <span>*** Vehicle Start Journey ***</span>
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
            <Form.Group className="my-2" controlId="vehicle_id">
              <Form.Label>Vehicle Name</Form.Label>
              <Form.Select
                type="text"
                required
                value={vehicle_id}
                onChange={handleVehicle}
              >
                <option value="">Select Vehicle Name</option>
                {vehicles?.data?.map((item) => (
                  <option key={item.vehicle_id} value={item.vehicle_id}>
                    {item.registration_number}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="route_id">
              <Form.Label>Route Name</Form.Label>
              <Form.Select
                type="text"
                required
                value={route_id}
                onChange={handleRoute}
              >
                <option value="">Select Route Name</option>
                {routes?.data?.map((item) => (
                  <option key={item.route_id} value={item.route_id}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            {/* */}
            <Form.Group className="my-2" controlId="start_mileage">
              <Form.Label>Start Mileage</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Start Mileage"
                value={start_mileage}
                onChange={(e) => setStartMileage(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            {/* */}
            <Form.Group className="my-2" controlId="start_fuel_capacity">
              <Form.Label>Start Fuel Capacity</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Start Fuel Capacity"
                value={start_fuel_capacity}
                onChange={(e) => setStartFuelCap(e.target.value)}
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

export default CreateRun;
