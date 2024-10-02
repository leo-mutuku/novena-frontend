import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useGetVendorsQuery } from "../../../slices/fleet/vendorApiSlice";
import { useCreateFuelExpenseMutation } from "../../../slices/fleet/fuelExpenseApiSlice";

import { useGetAllVehiclesQuery } from "../../../slices/fleet/vehicleApiSlice";
import { useGetAllItemRegisterQuery } from "../../../slices/store/itemregisterApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useGetAllDriversQuery } from "../../../slices/fleet/driverApislice";
import { useGetAllRoutesQuery } from "../../../slices/fleet/routesApiSlice";
import { useCreateMialageMutation } from "../../../slices/fleet/mialageApiSlice";

function NewMialage() {
  const { userInfo } = useSelector((state) => state.auth);
  const [driver_id, set_driver_id] = useState("");
  const [vehicle_id, set_vehicle_id] = useState("");
  const [mialage_date, set_mialage_date] = useState(0);
  const [start_mileage, set_start_mileage] = useState(0);
  const [end_mileage, set_end_mileage] = useState(0);
  const [distance, set_distance] = useState(0);

  const [route_id, set_route_id] = useState("");

  const [createFuelExpense, { isLoading }] = useCreateFuelExpenseMutation();
  const { data: routes } = useGetAllRoutesQuery();
  const { data: drivers } = useGetAllDriversQuery();
  const { data: vehicles } = useGetAllVehiclesQuery();
  const [createMialage, { isLoading: loading }] = useCreateMialageMutation();
  const navigate = useNavigate();
  useEffect(() => {
    navigate();
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (distance < 0) {
        toast.error(
          "Distance cannot be negative, adjust the start and end mileage"
        );
        return;
      }
      const res = await createMialage({
        driver_id,
        vehicle_id,
        mialage_date,
        start_mileage,
        end_mileage,

        distance,
        created_by: userInfo.first_name,
        route_id,
      }).unwrap();

      if (res.status == "success") {
        toast.success("Mialage created successfully");
        navigate("../mialagehistory");
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleStartMialage = (e) => {
    set_start_mileage(e.target.value);
    set_distance((end_mileage - e.target.value) * 1.609344);
  };

  const handleEndMialage = (e) => {
    set_end_mileage(e.target.value);
    set_distance((e.target.value - start_mileage) * 1.609344);
  };
  return (
    <>
      <span>*** Fleet Mialage Entry ***</span>
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
            <Form.Group className="my-2" controlId="supplier_email">
              <Form.Label>Vehicle</Form.Label>
              <Form.Select
                type="text"
                required
                placeholder="Vendor "
                value={vehicle_id}
                onChange={(e) => set_vehicle_id(e.target.value)}
              >
                <option value="">Select Vehicle</option>
                {vehicles?.data.map((vehicle) => (
                  <option key={vehicle.vehicle_id} value={vehicle.vehicle_id}>
                    {vehicle.registration_number}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            {/* */}
            <Form.Group className="my-2" controlId="supplier_name">
              <Form.Label>Driver</Form.Label>
              <Form.Select
                type="text"
                required
                placeholder="Vendor "
                value={driver_id}
                onChange={(e) => set_driver_id(e.target.value)}
              >
                <option value="">Select Driver</option>
                {drivers?.data.map((driver) => (
                  <option key={driver.driver_id} value={driver.driver_id}>
                    {driver.driver_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            {/* staff_number field */}
            <Form.Group className="my-2" controlId="vendor_phone_number">
              <Form.Label>Route</Form.Label>
              <Form.Select
                required
                type="date"
                placeholder="Vendor Phone Number"
                value={route_id}
                onChange={(e) => set_route_id(e.target.value)}
              >
                <option value="">Select route</option>
                {routes?.data.map((route) => (
                  <option key={route.route_id} value={route.route_id}>
                    {route.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            {/* staff_number field */}
            <Form.Group className="my-2" controlId="vendor_phone_number">
              <Form.Label>Mialage date</Form.Label>
              <Form.Control
                required
                type="date"
                placeholder="Vendor Phone Number"
                value={mialage_date}
                onChange={(e) => set_mialage_date(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="my-2" controlId="supplier_location">
              <Form.Label>Start Mialage</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Start mialage"
                value={start_mileage}
                onChange={handleStartMialage}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="supplier_location">
              <Form.Label>End Mialage</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="End mialage"
                value={end_mileage}
                onChange={handleEndMialage}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="my-2" controlId="supplier_location">
              <Form.Label>Distance (Km)</Form.Label>
              <Form.Control
                disabled
                required
                type="number"
                placeholder="Distance (Km)"
                value={distance}
                onChange={(e) => {
                  (end_mileage - start_mileage) * 1.60934;
                }}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            {/* <Form.Group className="my-2" controlId="supplier_location">
              <Form.Label>Fuel (Lts)</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Fuel in lts"
                value={fuel_lts}
                onChange={(e) => set_fuel_lts(e.target.value)}
              ></Form.Control>
            </Form.Group> */}
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

export default NewMialage;
