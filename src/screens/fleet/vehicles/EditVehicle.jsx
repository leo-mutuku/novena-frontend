import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";
import { useGetVehicleQuery, useUpdateVehicleMutation } from "../../../slices/fleet/vehicleApiSlice";

function EditVehicle() {
  const [registration_number, setRegNumber] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  
  const [updateVehicle, { isError, isSuccess, error: errorUpdate }] =
    useUpdateVehicleMutation();

  const { id } = useParams();
  const navigate = useNavigate();

  //call Vehicle get query
  const { data: Vehicle, error, isLoading } = useGetVehicleQuery(id);

  useEffect(() => {
    if (errorUpdate && id) {
      toast.error("Something went wrong: " + errorUpdate.message);
      console.log(JSON.stringify(errorUpdate.message));
    }
  }, [id, errorUpdate]);

  useEffect(() => {
    if (id) {
      if (Vehicle) {
        setRegNumber(Vehicle.data.registration_number);
        setModel(Vehicle.data.model);
        setYear(Vehicle.data.year);
      }
    }
  }, [id, Vehicle]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!registration_number && !model && !year) {
      toast.error("Please provide value into each input field");
    } else {
      const dataVehicle = {
        registration_number,
        model,
        year,
      };
      try {
        const result = await updateVehicle({
          id,
          data: dataVehicle,
        }).unwrap();

        toast.success(result.message);

        navigate("../allvehicles");
      } catch (error) {
        toast.error(error.message);
        console.error("Failed to update vehicle:", error);
      }
    }
  };
  return (
    <>
      <span>*** Edit Vehicle ***</span>
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
            <Form.Group className="my-2" controlId="registration_number">
              <Form.Label>Vehicle Registration</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Registration Number"
                value={registration_number}
                onChange={(e) => setRegNumber(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            {/* */}
            <Form.Group className="my-2" controlId="model">
              <Form.Label>Vehicle Model</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Vehicle Model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="my-2" controlId="year">
              <Form.Label>Year of Manufacture</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Year of Manufacture"
                value={year}
                onChange={(e) => setYear(e.target.value)}
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

export default EditVehicle;
