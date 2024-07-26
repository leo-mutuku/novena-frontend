import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetRequisitionLineByIdQuery } from "../../../../slices/payment/requisitionLineApiSlice";
import { usePostRequisitionMutation } from "../../../../slices/payment/requisitionHeaderApiSlice";
import { Table, Row, Col, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const MakePayment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    navigate();
  }, [navigate]);
  const { data: requisition } = useGetRequisitionLineByIdQuery(id);
  const [postRequisition] = usePostRequisitionMutation();
  const handlepostRequisition = async () => {
    try {
      const res = await postRequisition({ id }).unwrap();
      if (res.status == "success") {
        toast.success("Requisition Posted Successfully");
        navigate("../allpostedrequisition");
      } else {
        toast.error(res.message || "Requisition Not Posted");
      }
    } catch (error) {
      toast.error(error.data?.message || "Requisition Not Posted");
    }
  };

  const [total, set_total] = useState(0);

  useEffect(() => {
    if (requisition?.data) {
      set_total(
        requisition.data.reduce((sum, item) => sum + parseFloat(item.amount), 0)
      );
    }
  }, [requisition]);

  return (
    <>
      <span>
        {" "}
        ** Requisition Number {id} ** Total {total}
      </span>
      <Row>
        <Col>
          {" "}
          <Form.Group className="my-2" controlId="amount">
            <Form.Label>Cash/ Bank</Form.Label>
            <Form.Select
              required
              type="text"
              placeholder="Description"
              value={name}
              onChange={(e) => set_name(e.target.value)}
            >
              <option value="">Select</option>
              <option value="bank">Bank</option>
              <option value="cash">Cash</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          {" "}
          <Form.Group className="my-2" controlId="amount">
            <Form.Label>Account</Form.Label>
            <Form.Select
              required
              type="text"
              placeholder="Description"
              value={name}
              onChange={(e) => set_name(e.target.value)}
            >
              <option value="bank">Bank</option>
              <option value="cash">Cash</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <hr></hr>
      <Table striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th> Name</th>
            <th>Qty</th>
            <th>@</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {requisition?.data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.item_name}</td>
              <td>{item.quantity}</td>
              <td>{item.unit_price}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Row>
        <Col></Col>

        <Col xs={3}>
          <Button variant="danger">Reject</Button> &nbsp;
          <Button onClick={"#"} variant="success">
            Pay
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default MakePayment;
