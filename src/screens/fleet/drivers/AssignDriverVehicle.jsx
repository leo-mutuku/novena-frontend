import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Loader from "../../../components/Loader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetAllDriversQuery } from "../../../slices/fleet/driverApislice";
import { useGetAllVehiclesQuery } from "../../../slices/fleet/vehicleApiSlice";
import { useAddDriverVehicleAssignMutation } from "../../../slices/fleet/driverVehicleAssignApiSlice";
import DriverVehicleAssignmentsList from "./DriverVehicleAssignmentsList";

function AssignDriverVehicle() {
  const [driver_id, setDriverId] = useState();
  const [vehicle_id, setVehicleId] = useState();
  const { data: drivers } = useGetAllDriversQuery();
  const { data: vehicles } = useGetAllVehiclesQuery();
  //call driver vehicle assign add mutation
  const [addDriverVehicleAssign, { isLoading }] = useAddDriverVehicleAssignMutation();
  const navigate = useNavigate();

  const handleDriver = (e) => {
    let x = drivers?.data?.filter((a) => {
      if (a.driver_id == e.target.value) {
        return a.driver_name;
      }
    });
    setDriverId(x[0].driver_id);
  };

  const handleVehicle = (e) => {
    let x = vehicles?.data?.filter((a) => {
      if (a.vehicle_id == e.target.value) {
        return a.registration_number;
      }
    });
    setVehicleId(x[0].vehicle_id);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addDriverVehicleAssign({
        driver_id,
        vehicle_id,
      }).unwrap();
      toast.success(res.message);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <span>*** Add Driver Vehicle Assignment ***</span>
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
            <Form.Group className="my-2" controlId="driver_name">
              <Form.Label>Driver Name</Form.Label>
              <Form.Select
                type="text"
                required
                value={driver_id}
                onChange={handleDriver}
              >
                <option value="">Select Driver Name</option>
                {drivers?.data?.map((item) => (
                  <option key={item.driver_id} value={item.driver_id}>
                    {item.driver_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
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
       
        </Row>

        <Button type="submit" variant="primary" className="mt-3">
          Assign
        </Button>

        {isLoading && <Loader />}
      </Form>
      <br />
      <DriverVehicleAssignmentsList />
    </>
  );
}

export default AssignDriverVehicle;

