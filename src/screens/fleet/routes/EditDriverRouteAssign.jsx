import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";
import { useGetAllDriversQuery } from "../../../slices/fleet/driverApislice";

import {
  useGetDriverRouteAssignQuery,
  useUpdateDriverRouteAssignMutation,
} from "../../../slices/fleet/driverRouteAssignApiSlice";
import { useGetAllRoutesQuery } from "../../../slices/fleet/routesApiSlice";

function EditDriverRouteAssign() {
  const [driver_id, setDriverId] = useState();
  const [route_id, setRouteId] = useState();
  const { data: drivers } = useGetAllDriversQuery();
  const { data: routes } = useGetAllRoutesQuery();

  const [updateDriverRouteAssign, { isError, isSuccess, error: errorUpdate }] =
    useUpdateDriverRouteAssignMutation();

  const { id } = useParams();
  const navigate = useNavigate();

  //call driver get query
  const {
    data: driverRouteAssign,
    error,
    isLoading,
  } = useGetDriverRouteAssignQuery(id);

  useEffect(() => {
    if (errorUpdate && id) {
      toast.error("Something went wrong: " + error.message);
      console.log(JSON.stringify(error.message));
    }
  }, [id, error]);
  // console.log(driver.data.staff_id);
  useEffect(() => {
    if (id) {
      if (driverRouteAssign) {
        setDriverId(driverRouteAssign.data.driver_id);
        setRouteId(driverRouteAssign.data.route_id);
      }
    }
  }, [id, driverRouteAssign]);

  const handleDriver = (e) => {
    let x = drivers?.data?.filter((a) => {
      if (a.driver_id == e.target.value) {
        return a.driver_name;
      }
    });
    setDriverId(x[0].driver_id);
  };

  const handleRoute = (e) => {
    let x = routes?.data?.filter((a) => {
      if (a.route_id == e.target.value) {
        return a.name;
      }
    });
    setRouteId(x[0].route_id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!driver_id && !route_id) {
      toast.error("Please provide value into each input field");
    } else {
      const dataDriver = {
        driver_id,
        route_id,
      };
      try {
        const res = await updateDriverRouteAssign({
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
        console.error("Failed to update driver route assign:", error);
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
            <Form.Group className="my-2" controlId="route_id">
              <Form.Label>Route Name</Form.Label>
              <Form.Select
                type="text"
                required
                value={route_id}
                onChange={handleRoute}
              >
                <option value="">Select Route Name</option>
                {routes?.data?.map((item) => (
                  <option key={item.route_id} value={item.route_id}>
                    {item.name}
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

export default EditDriverRouteAssign;
