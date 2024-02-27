import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";

import { useGetAllRoutesQuery } from "../../../slices/fleet/routesApiSlice";
import {
  useGetAllVehicleRunsQuery,
  useGetVehicleRunQuery,
  useUpdateVehicleRunMutation,
} from "../../../slices/fleet/runsApiSlice";
function EditRuns() {
  const [start_mileage, setStartMileage] = useState();
  const [start_fuel_capacity, setStartFuelCap] = useState();
  const [end_mileage, setEndMileage] = useState();
  const [end_fuel_capacity, setEndFuelCap] = useState();
  const [route_id, setRouteId] = useState();
  const [vehicle_id, setVehicleId] = useState();
  const { data: routes } = useGetAllRoutesQuery();
  const { data: vehicles } = useGetAllVehicleRunsQuery();
  const [updateVehicleRun, { isError, isSuccess, error: errorUpdate }] =
    useUpdateVehicleRunMutation();

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

  const { id } = useParams();
  //call run get query
  const { data: vehicleRun, error, isLoading } = useGetVehicleRunQuery(id);

  useEffect(() => {
    if (errorUpdate && id) {
      toast.error("Something went wrong: " + error.message);
      console.log(JSON.stringify(error.message));
    }
  }, [id, error]);
  // console.log(driver.data.staff_id);
  useEffect(() => {
    if (id) {
      if (vehicleRun) {
        setRouteId(vehicleRun.data.route_id);
        setVehicleId(vehicleRun.data.vehicle_id);
        setStartMileage(vehicleRun.data.start_mileage);
        setStartFuelCap(vehicleRun.data.start_fuel_capacity);
        setEndMileage(vehicleRun.data.end_mileage);
        setEndFuelCap(vehicleRun.data.end_fuel_capacity);
      }
    }
  }, [id, vehicleRun]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !route_id &&
      !vehicle_id &&
      !start_mileage &&
      !start_fuel_capacity &&
      !end_mileage &&
      !end_fuel_capacity
    ) {
      toast.error("Please provide value into each input field");
    } else {
      const dataRun = {
        route_id,
        vehicle_id,
        start_mileage,
        start_fuel_capacity,
        end_mileage,
        end_fuel_capacity,
      };
      try {
        const res = await updateVehicleRun({
          id,
          data: dataRun,
        }).unwrap();
        if (res.status === "failed") {
          toast.error(res.message);
        } else {
          toast.success(res.message);
        }
        navigate("../allruns");
      } catch (error) {
        toast.error(error.message);
        console.error("Failed to update end vehicle run:", error);
      }
    }
  };
  return (
    <>
      <span>*** Edit Vehicle End Journey ***</span>
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
        <Row>
          <Col>
            {/* */}
            <Form.Group className="my-2" controlId="start_mileage">
              <Form.Label>End Mileage</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="End Mileage"
                value={end_mileage}
                onChange={(e) => setEndMileage(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            {/* */}
            <Form.Group className="my-2" controlId="end_fuel_capacity">
              <Form.Label>End Fuel Capacity</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="End Fuel Capacity"
                value={end_fuel_capacity}
                onChange={(e) => setEndFuelCap(e.target.value)}
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

export default EditRuns;
