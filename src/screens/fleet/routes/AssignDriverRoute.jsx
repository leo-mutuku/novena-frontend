import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Loader from "../../../components/Loader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetAllDriversQuery } from "../../../slices/fleet/driverApislice";
import DriverRouteAssignmentsList from "./DriverRouteAssignmentsList";
import { useGetAllRoutesQuery } from "../../../slices/fleet/routesApiSlice";
import { useAddDriverRouteAssignMutation } from "../../../slices/fleet/driverRouteAssignApiSlice";

function AssignDriverRoute() {
  const [driver_id, setDriverId] = useState();
  const [route_id, setRouteId] = useState();
  const { data: drivers } = useGetAllDriversQuery();
  const { data: routes } = useGetAllRoutesQuery();
  //call driver vehicle assign add mutation
  const [addDriverRouteAssign, { isLoading }] =
    useAddDriverRouteAssignMutation();

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
    try {
      const res = await addDriverRouteAssign({
        driver_id,
        route_id,
      }).unwrap();

      if (res.status === "failed") {
        toast.error(res.message);
      } else {
        toast.success(res.message);
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <span>*** Add Driver Route Assignment ***</span>
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
          Assign
        </Button>
        {isLoading && <Loader />}
      </Form>
      <br />
      <DriverRouteAssignmentsList />
    </>
  );
}

export default AssignDriverRoute;
