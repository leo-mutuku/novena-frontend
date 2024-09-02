import React from "react";
import { useParams } from "react-router-dom";
import { useGetAllStaffByIdQuery } from "../../../slices/administration/staffApiSlice";
import { Row, Col, Form, Button } from "react-bootstrap";

const FixedRate = () => {
  const { id } = useParams();
  const { data: staff } = useGetAllStaffByIdQuery(id);
  const [rate_per_day, set_rate_per_day] = React.useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
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
              <Form.Label>Rate per day</Form.Label>
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
