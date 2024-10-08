import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useCreateDeductionsMutation } from "../../../slices/payroll/deductionsApiSlice";
import { useGetAllStaffQuery } from "../../../slices/administration/staffApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";

function CreateDeduction() {
  const [staff_id, set_staff_id] = useState(null);
  const [naration, set_naration] = useState("");
  const [date, set_date] = useState(null);
  const [amount, set_amount] = useState(null);
  const [created_by, set_created_by] = useState("");
  const [deduction_type, set_deduction_type] = useState("");

  const [createGl, { isLoading }] = useCreateDeductionsMutation();
  const { data: staffData } = useGetAllStaffQuery();
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      set_created_by(userInfo.first_name);
    }
    navigate();
  }, [navigate, userInfo]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createGl({
        staff_id,
        amount,
        naration,
        date,
        created_by,
        deduction_type,
      }).unwrap();
      if (res.status === "success") {
        toast.success("Gl created successfully");
        navigate("../deductionlist");
        return;
      } else {
        toast.error(res?.message || res?.error || "Something went wrong");
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <span>*** Create Deduction ***</span>
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
            <Form.Group className="my-2" controlId="staff_id">
              <Form.Label>Staff Name</Form.Label>
              <Form.Select
                type="text"
                required
                placeholder="Staff Name"
                value={staff_id}
                onChange={(e) => set_staff_id(e.target.value)}
              >
                <option value="">Staff name</option>
                {staffData?.data.map((item, key) => (
                  <option value={item.staff_id} key={key}>
                    {item.first_name} {item.last_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="staff_id">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                required
                placeholder="Amount"
                value={amount}
                onChange={(e) => set_amount(parseInt(e.target.value))}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="my-2" controlId="naration">
              <Form.Label>Date</Form.Label>
              <Form.Control
                required
                type="date"
                placeholder="Date"
                value={date}
                onChange={(e) => set_date(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="naration">
              <Form.Label>Naration</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Naration"
                value={naration}
                onChange={(e) => set_naration(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="my-2" controlId="naration">
              <Form.Label></Form.Label>
              <Form.Select
                required
                type="number"
                placeholder="Naration"
                value={deduction_type}
                onChange={(e) => set_deduction_type(e.target.value)}
              >
                <option value={""}>Type</option>
                <option value="negative">Negative</option>
                <option value="positive"> Positive</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit" variant="primary" className="mt-3">
          submit
        </Button>

        {isLoading && <Loader />}
      </Form>
    </>
  );
}

export default CreateDeduction;
