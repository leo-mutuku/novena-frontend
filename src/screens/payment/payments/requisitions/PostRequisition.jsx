import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetRequisitionLineByIdQuery } from "../../../../slices/payment/requisitionLineApiSlice";
import { Table, Row, Col, Button } from "react-bootstrap";

const PostRequisition = () => {
  const { id } = useParams();
  const { data: requisition } = useGetRequisitionLineByIdQuery(id);
  const [total, set_total] = useState(0);

  const navigate = useNavigate();
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
      <hr></hr>
      <Table striped bordered hover>
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
          <Button variant="success">Approve</Button>
        </Col>
      </Row>
    </>
  );
};

export default PostRequisition;
