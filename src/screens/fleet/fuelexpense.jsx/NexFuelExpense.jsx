import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useGetVendorsQuery } from "../../../slices/fleet/vendorApiSlice";
import { useCreateFuelExpenseMutation } from "../../../slices/fleet/fuelExpenseApiSlice";

import { useGetAllVehiclesQuery } from "../../../slices/fleet/vehicleApiSlice";
import { useGetAllItemRegisterQuery } from "../../../slices/store/itemregisterApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function NexFuelExpense() {
  const { userInfo } = useSelector((state) => state.auth);
  const [vendor_id, set_vendor_id] = useState("");
  const [vehicle_id, set_vehicle_id] = useState("");
  const [expense_date, set_expense_date] = useState("");
  const [amount, set_amount] = useState("");
  const [description, set_description] = useState("");

  const [createFuelExpense, { isLoading }] = useCreateFuelExpenseMutation();
  const { data: vendors } = useGetVendorsQuery();
  const { data: vehicles } = useGetAllVehiclesQuery();
  const navigate = useNavigate();
  useEffect(() => {
    navigate();
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createFuelExpense({
        vendor_id,
        vehicle_id,
        expense_date,
        amount,
        created_by: userInfo.first_name,
        description,
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
      <span>*** Fleet Fuel Expense Entry ***</span>
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
              <Form.Label>Vendor</Form.Label>
              <Form.Select
                type="text"
                required
                placeholder="Vendor "
                value={vendor_id}
                onChange={(e) => set_vendor_id(e.target.value)}
              >
                <option value="">Select Vendor</option>
                {vendors?.data.map((vendor) => (
                  <option key={vendor.vendor_id} value={vendor.vendor_id}>
                    {vendor.vendor_name}
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
              <Form.Label>Expense date</Form.Label>
              <Form.Control
                required
                type="date"
                placeholder="Vendor Phone Number"
                value={expense_date}
                onChange={(e) => set_expense_date(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="supplier_location">
              <Form.Label>Amount</Form.Label>
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
              <Form.Label>Expense Description</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="amount"
                value={description}
                onChange={(e) => set_description(e.target.value)}
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

export default NexFuelExpense;
