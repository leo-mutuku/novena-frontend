import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAllStaffByIdQuery } from "../../../slices/administration/staffApiSlice";
import { Button, Col, Form, Row } from "react-bootstrap";

const EditBiweeklyRegister = () => {
  const { id } = useParams();
  const { data: staff, isSuccess: staffSuccess } = useGetAllStaffByIdQuery(id);
  const [no_of_days, set_no_of_days] = React.useState(0);
  const [rate_per_day, set_rate_per_day] = React.useState(0);

  React.useEffect(() => {
    if (staffSuccess) {
      set_no_of_days(staff?.data.days_attended);
      set_rate_per_day(parseFloat(staff?.data.fixed_rate));
    }
  }, [id, staffSuccess, staff?.data]);

  console.log(staff?.data.days_attended);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/payroll/biweeklyregister");
  };

  return (
    <>
      <span>
        *** Update staff biweekly {staff?.data.first_name}{" "}
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
            <Form.Group className="my-2" controlId="account_name">
              <Form.Label>No of days</Form.Label>
              <Form.Control
                type="number"
                required
                placeholder="account_name"
                value={no_of_days}
                onChange={(e) => set_no_of_days(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
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

export default EditBiweeklyRegister;
