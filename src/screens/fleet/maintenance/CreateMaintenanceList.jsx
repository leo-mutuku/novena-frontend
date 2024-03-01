import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Loader from "../../../components/Loader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetAllVehiclesQuery } from "../../../slices/fleet/vehicleApiSlice";
import { useAddMaintenanceMutation } from "../../../slices/fleet/maintenanceApiSlice";
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreateMaintenanceList() {
  const [maintenance_date, setMaintenanceDate] = useState("");
  const [maintenance_type, setMaintenanceType] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState();
  const [vehicle_id, setVehicleId] = useState();
  const { data: vehicles } = useGetAllVehiclesQuery();

 
  const [addMaintenance, { isLoading }] = useAddMaintenanceMutation();
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
        // Assuming your date is received as a string from react-datepicker
    const dateStringFromPicker = maintenance_date;

    // Parse the ISO string to moment object
    const parsedDate = moment(dateStringFromPicker);

    // Get the date part in YYYY-MM-DD format
    const formattedDate = parsedDate.format('YYYY-MM-DD');

    console.log(formattedDate); // Output: "2024-02-28"

    try {
      const res = await addMaintenance({
        vehicle_id,
        maintenance_type,
        description,
        cost,
        maintenance_date: formattedDate,
      }).unwrap();
      if (res.status === "failed") {
        toast.error(res.message);
      } else {
        toast.success(res.message);
      }
      navigate("../allmaintenance");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
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

export default CreateMaintenanceList;
