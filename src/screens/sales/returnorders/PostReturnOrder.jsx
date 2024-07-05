import React from "react";
import { useParams } from "react-router-dom";
import {
  useGetAllsalesReturnOrdersLinesByHeaderIdQuery,
  usePostReturnOrderMutation,
} from "../../../slices/sales/salesOrderReturnApiSlice";
import { Table, Row, Col, Button } from "react-bootstrap";
import Loader from "../../../components/Loader";
import TimeDate from "../../../components/TimeDate";
import { toast } from "react-toastify";

const PostReturnOrder = () => {
  const { id: _new_id } = useParams();
  const id = parseInt(_new_id);
  const timeDate = new TimeDate();
  const { data: salesReturnOrderLines, isLoading } =
    useGetAllsalesReturnOrdersLinesByHeaderIdQuery(id);
  const [postReturnOrder] = usePostReturnOrderMutation();
  const handlePostReturnOrder = async () => {
    try {
      const res = await postReturnOrder({ id }).unwrap();
      if (res.status == "success") {
        toast.success(res.message);
      } else {
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div>Post RO . No # {id}</div>
      <Table striped style={{ border: "1px solid #ccc" }}>
        <thead>
          <tr>
            <th style={{ position: "initial" }}>#</th>
            <th style={{ position: "initial" }}>RO. NO#</th>
            <th style={{ position: "initial" }}>Item Name</th>

            <th style={{ position: "initial" }}>@</th>

            <th style={{ position: "initial" }}>Quantity</th>
            <th style={{ position: "initial" }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <Loader />
            </tr>
          ) : salesReturnOrderLines?.data[0] === null ? (
            <>No data</>
          ) : (
            salesReturnOrderLines?.data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.order_line_id}</td>

                <td>{item.item_name}</td>

                <td>{item.cost_per_item}</td>

                <td>{item.quantity}</td>
                <td>{item.total}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <Row>
        <Col xs={6} px-2>
          {" "}
          <Button variant="outline-danger">Cancel</Button>&nbsp; &nbsp;
          <Button variant="outline-primary" onClick={handlePostReturnOrder}>
            Post return
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default PostReturnOrder;
