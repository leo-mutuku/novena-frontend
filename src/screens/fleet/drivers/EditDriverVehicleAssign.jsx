import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";
import { useGetAllDriversQuery } from "../../../slices/fleet/driverApislice";
import { useGetAllVehiclesQuery } from "../../../slices/fleet/vehicleApiSlice";
import {
  useGetDriverVehicleAssignQuery,
  useUpdateDriverVehicleAssignMutation,
} from "../../../slices/fleet/driverVehicleAssignApiSlice";
import DriverVehicleAssignmentsList from "./DriverVehicleAssignmentsList";

function EditDriverVehicleAssign() {
  const [driver_id, setDriverId] = useState();
  const [vehicle_id, setVehicleId] = useState();
  const { data: drivers } = useGetAllDriversQuery();
  const { data: vehicles } = useGetAllVehiclesQuery();

  const [
    updateDriverVehicleAssign,
    { isError, isSuccess, error: errorUpdate },
  ] = useUpdateDriverVehicleAssignMutation();

  const { id } = useParams();
  const navigate = useNavigate();
  //call driver get query
  const {
    data: driverVehicleAssign,
    error,
    isLoading,
  } = useGetDriverVehicleAssignQuery(id);

  useEffect(() => {
    if (errorUpdate && id) {
      toast.error("Something went wrong: " + error.message);
      console.log(JSON.stringify(error.message));
    }
  }, [id, error]);
  // console.log(driver.data.staff_id);
  useEffect(() => {
    if (id) {
      if (driverVehicleAssign) {
        setDriverId(driverVehicleAssign.data.driver_id);
        setVehicleId(driverVehicleAssign.data.vehicle_id);
      }
    }
  }, [id, driverVehicleAssign]);

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
    if (!driver_id && !vehicle_id) {
      toast.error("Please provide value into each input field");
    } else {
      const dataDriver = {
        driver_id,
        vehicle_id,
      };
      try {
        const res = await updateDriverVehicleAssign({
          id,
          data: dataDriver,
        }).unwrap();

        if (res.status === "failed") {
          toast.error(res.message);
        } else {
          toast.success(res.message);
        }
        navigate("../assignments");
      } catch (error) {
        toast.error(error.message);
        console.error("Failed to update driver vehicle assign:", error);
      }
    }
  };
  return (
    <>
      <span>*** Edit Driver Vehicle Assignment ***</span>
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
          Update
        </Button>

        {isLoading && <Loader />}
      </Form>
    </>
  );
}

export default EditDriverVehicleAssign;
