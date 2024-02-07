import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Loader from "../../../components/Loader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAddDriverMutation } from "../../../slices/fleet/driverApislice";
import { useGetAllStaffQuery } from "../../../slices/administration/staffApiSlice";

function CreateDrivers() {
  const [name, setName] = useState("");
  const [license_number, setLicenseNumber] = useState("");
  const { data: staff } = useGetAllStaffQuery();
  const [staff_id, setSaffId] = useState("");
  //call driver add mutation
  const [addDriver, { isLoading }] = useAddDriverMutation();
  const navigate = useNavigate();

  const handleStaff = (e) => {
    let x = staff?.data?.filter((a) => {
      if (a.staff_id == e.target.value) {
        return a.first_name;
      }
    });
    setSaffId(x[0].staff_id);
    setName(x[0].staff_id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await addDriver({
        staff_id,
        license_number,
      }).unwrap();
      toast.success(res.message);
      navigate("../alldrivers");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <span>*** Add Driver ***</span>
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
            <Form.Group className="my-2" controlId="staff_number">
              <Form.Label>Driver Name</Form.Label>
              <Form.Select
                type="text"
                required
                placeholder="Driver Name"
                value={staff_id}
                onChange={handleStaff}
              >
                <option value=""> Select Name</option>
                {staff?.data?.map((item) => (
                  <option key={item.staff_id} value={item.staff_number}>
                    {item.staff_number} | {item.first_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            {/* */}
            <Form.Group className="my-2" controlId="license_number">
              <Form.Label>License Number</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="License Number"
                value={license_number}
                onChange={(e) => setLicenseNumber(e.target.value)}
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

export default CreateDrivers;
