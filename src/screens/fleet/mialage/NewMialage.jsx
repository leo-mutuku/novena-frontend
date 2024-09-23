import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useGetVendorsQuery } from "../../../slices/fleet/vendorApiSlice";
import { useCreateFuelExpenseMutation } from "../../../slices/fleet/fuelExpenseApiSlice";
import { useGetAllDriversQuery } from "../../../slices/fleet/driverApislice";

import { useGetAllVehiclesQuery } from "../../../slices/fleet/vehicleApiSlice";
import { useGetAllItemRegisterQuery } from "../../../slices/store/itemregisterApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function NewMialage() {
  const { userInfo } = useSelector((state) => state.auth);
  const [driver_id, set_driver_id] = useState("");
  const [vehicle_id, set_vehicle_id] = useState("");
  const [mialage_date, set_mialage_date] = useState("");
  const [start_mileage, set_start_mileage] = useState("");
  const [end_mileage, set_end_mileage] = useState("");
  const [amount, set_amount] = useState("");

  const [createFuelExpense, { isLoading }] = useCreateFuelExpenseMutation();
  const { data: drivers } = useGetAllDriversQuery();
  const { data: vehicles } = useGetAllVehiclesQuery();
  const navigate = useNavigate();
  useEffect(() => {
    navigate();
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createFuelExpense({
        driver_id,
        vehicle_id,
        mialage_date,
        start_mileage,
        end_mileage,
        created_by: userInfo.first_name,
      }).unwrap();

      if (res.status == "success") {
        toast.success("vendor created successfully");
        navigate("../allfuelexpenses");
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
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
              <Form.Control
                required
                type="date"
                placeholder="Vendor Phone Number"
                value={mialage_date}
                onChange={(e) => set_mialage_date(e.target.value)}
              ></Form.Control>
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
                placeholder="amount"
                value={amount}
                onChange={(e) => set_amount(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="supplier_location">
              <Form.Label>End Mialage</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="amount"
                value={amount}
                onChange={(e) => set_amount(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="my-2" controlId="supplier_location">
              <Form.Label>Distance (Km)</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="amount"
                value={amount}
                onChange={(e) => set_amount(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="supplier_location">
              <Form.Label>Fuel (Lts)</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="amount"
                value={amount}
                onChange={(e) => set_amount(e.target.value)}
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

export default NewMialage;
