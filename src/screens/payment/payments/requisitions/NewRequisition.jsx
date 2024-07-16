import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useCreateRequisitionHeaderMutation } from "../../../../slices/payment/requisitionHeaderApiSlice";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function NewRequisition() {
  const [account_number, set_account_number] = useState("");
  const [date, set_date] = useState("");
  const [created_by, set_created_by] = useState("");
  const [createPaymentRequisition] = useCreateRequisitionHeaderMutation();

  const navigate = useNavigate();
  useEffect(() => {
    navigate();
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createPaymentRequisition({
        account_number,
        date,
      }).unwrap();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <span>*** New requisition ***</span>
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
            <Form.Group className="my-2" controlId="amount">
              <Form.Label>Acount Number</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Amount"
                value={account_number}
                onChange={(e) => set_account_number(parseInt(e.target.value))}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="">
              <Form.Label>Date</Form.Label>
              <Form.Control
                required
                type="date"
                placeholder="date"
                value={date}
                onChange={(e) => set_date(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        {/* <Row>
          <Form.Group className="my-2" controlId="reference">
            <Form.Label>Amount in words</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Amounts in words"
              value={reference}
              onChange={(e) => set_reference(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Row> */}
        <Button type="submit" variant="primary" className="mt-3">
          submit
        </Button>

        {/* {isLoading && <Loader />} */}
      </Form>
    </>
  );
}

export default NewRequisition;
