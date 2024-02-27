import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";
import {
  useGetAllVehiclesQuery,
  useUpdateVehicleMutation,
} from "../../../slices/fleet/vehicleApiSlice";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  useGetMaintenanceQuery,
  useUpdateMaintenanceMutation,
} from "../../../slices/fleet/maintenanceApiSlice";

function EditMaintenance() {
  const [maintenance_date, setMaintenanceDate] = useState("");
  const [maintenance_type, setMaintenanceType] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState();
  const [vehicle_id, setVehicleId] = useState();
  const { data: vehicles } = useGetAllVehiclesQuery();

  const [updateMaintenance, { isError, isSuccess, error: errorUpdate }] =
    useUpdateMaintenanceMutation();

  const { id } = useParams();
  const navigate = useNavigate();

  //call Vehicle get query
  const { data: maintenance, error, isLoading } = useGetMaintenanceQuery(id);

  //date picker
  const handleChange = (value) => {
    setMaintenanceDate(value);
  };

  const handleVehicle = (e) => {
    let x = vehicles?.data?.filter((a) => {
      if (a.vehicle_id == e.target.value) {
        return a.registration_number;
      }
    });
    setVehicleId(x[0].vehicle_id);
  };

  useEffect(() => {
    if (errorUpdate && id) {
      toast.error("Something went wrong: " + errorUpdate.message);
      console.log(JSON.stringify(errorUpdate.message));
    }
  }, [id, errorUpdate]);

  useEffect(() => {
    if (id) {
      if (maintenance) {
        setMaintenanceDate(maintenance.data.maintenance_date);
        setMaintenanceType(maintenance.data.maintenance_type);
        setDescription(maintenance.data.description);
        setCost(maintenance.data.cost);
        setVehicleId(maintenance.data.vehicle_id);
      }
    }
  }, [id, maintenance]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !maintenance_date &&
      !maintenance_type &&
      !description &&
      !cost &&
      !vehicle_id
    ) {
      toast.error("Please provide value into each input field");
    } else {
      const dataMaintenance = {
        vehicle_id,
        maintenance_type,
        description,
        cost,
        maintenance_date,
      };
      try {
        const result = await updateMaintenance({
          id,
          data: dataMaintenance,
        }).unwrap();

        toast.success(result.message);

        navigate("../allmaintenance");
      } catch (error) {
        toast.error(error.message);
        console.error("Failed to update vehicle maintenance:", error);
      }
    }
  };
  return (
    <>
      <span>*** Add Vehicle Maintenance ***</span>
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
            {/* */}
            <Form.Group className="my-2" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            {/* */}
            <Form.Group className="my-2" controlId="maintenance_type">
              <Form.Label>Maintenance Type</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Maintenance Type"
                value={maintenance_type}
                onChange={(e) => setMaintenanceType(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            {/* */}
            <Form.Group className="my-2" controlId="cost">
              <Form.Label>Maintenance Cost</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Cost"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            {/* */}
            {/* <DatePicker value={maintenance_date} onChange={handleChange} /> */}
            <Form.Group className="my-2" controlId="maintenance_date">
              <Form.Label>Maintenance Date</Form.Label>
              <DatePicker
                selected={maintenance_date}
                onChange={handleChange}
                dateFormat="yyyy-MM-dd"
                className="form-control" // Applying Bootstrap's form-control class
              />
            </Form.Group>
          </Col>
          <Col></Col>
        </Row>

        <Button type="submit" variant="primary" className="mt-3">
          Submit
        </Button>

        {isLoading && <Loader />}
      </Form>
    </>
  );
}

export default EditMaintenance;
