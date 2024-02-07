import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetDriverQuery,
  useUpdateDriverMutation,
} from "../../../slices/fleet/driverApislice";
import Loader from "../../../components/Loader";
import { useGetAllStaffQuery } from "../../../slices/administration/staffApiSlice";

function EditDriver() {
  const [name, setName] = useState("");
  const [license_number, setLicenseNumber] = useState("");
  const { data: staff } = useGetAllStaffQuery();
  const [staff_id, setStaffId] = useState();
  const [updateDriver, { isError, isSuccess, error: errorUpdate }] =
    useUpdateDriverMutation();
  const { id } = useParams();
  const navigate = useNavigate();

  //call driver get query
  const { data: driver, error, isLoading } = useGetDriverQuery(id)


  useEffect(() => {
    if (error && id) {
      toast.error("Something went wrong: " + error.message);
      console.log(JSON.stringify(error.message));
    }
  }, [id, error]);
  // console.log(driver.data.staff_id);
  useEffect(() => {
    if (id) {
      if (driver) {
        setStaffId(driver.data.staff_id);
        setLicenseNumber(driver.data.license_number);
      }
    }
  }, [id, driver]);

  const handleStaff = (e) => {
    let x = staff?.data?.filter((a) => {
      if (a.staff_id == e.target.value) {
        return a.first_name;
      }
    });
    setStaffId(x[0].staff_id);
    setName(x[0].staff_id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name && !license_number) {
      toast.error("Please provide value into each input field");
    } else {
      const dataDriver = {
        staff_id,
        license_number,
      };
      try {
        const result = await updateDriver({
          id,
          data: dataDriver,
        }).unwrap();

        toast.success(result.message);
        navigate("../alldrivers");
      } catch (error) {
        toast.error(error.message);
        console.error("Failed to update driver:", error);
      }
    }
  };
  return (
    <>
      <span>*** Edit Driver ***</span>
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
          Update
        </Button>

        {isLoading && <Loader />}
      </Form>
    </>
  );
}

export default EditDriver;
