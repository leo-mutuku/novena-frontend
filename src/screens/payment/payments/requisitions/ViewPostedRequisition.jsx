import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetRequisitionLineByIdQuery } from "../../../../slices/payment/requisitionLineApiSlice";
import { usePostRequisitionMutation } from "../../../../slices/payment/requisitionHeaderApiSlice";
import { Table, Row, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const ViewPostedRequisition = () => {
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

        <Col xs={2}></Col>
      </Row>
    </>
  );
};

export default ViewPostedRequisition;
