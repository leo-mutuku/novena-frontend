import React from "react";
import { useParams } from "react-router-dom";
import {
  useGetAllStaffByIdQuery,
  useUpdateSalesFixedRateMutation,
} from "../../../slices/administration/staffApiSlice";
import { Row, Col, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const FixedRate = () => {
  const navaigate = useNavigate();
  const { id } = useParams();
  const { data: staff } = useGetAllStaffByIdQuery(id);
  const [fixedRate] = useUpdateSalesFixedRateMutation();
  const [rate_per_day, set_rate_per_day] = React.useState(0);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fixedRate({ id, rate_per_day }).unwrap();
      if (res.status === "success") {
        toast.success("Fixed rate updated successfully");
        Navigate("../staffsetlist");
      } else {
        toast.error(res.message || "Sorry an erro occured");
      }
    } catch (error) {
      toast.error(error.data.message || "Sorry an erro occured");
    }
  };

  return (
    <>
      <span>
        *** Update sales person fixed rate {staff?.data.first_name}{" "}
        {staff?.data.last_name} ***{" "}
      </span>

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
            <Form.Group className="my-2" controlId="account_number">
              <Form.Label>Fixed Rate</Form.Label>
              <Form.Control
                type="number"
                required
                placeholder="Rate"
                value={rate_per_day}
                onChange={(e) => set_rate_per_day(e.target.value)}
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
};

export default FixedRate;
