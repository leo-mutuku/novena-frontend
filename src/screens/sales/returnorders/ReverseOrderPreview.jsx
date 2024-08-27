import React, { useEffect, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAllReturnOrdersLinesQuery } from "../../../slices/sales/salesOrderReturnLinesApiSlice";
import TimeDate from "../../../components/TimeDate";
import { toast } from "react-toastify";

const ReverseOrderPreview = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const [created_by, set_created_by] = useState("");

  useEffect(() => {
    if (userInfo) {
      set_created_by(userInfo.first_name);
    }
  }, [userInfo]);

  const timeDate = new TimeDate();
  const { id: _new_id } = useParams();
  const id = parseInt(_new_id);

  const {
    data: returns,
    error,
    isLoading,
  } = useGetAllReturnOrdersLinesQuery(id);
  console.log(returns, "test");

  const [reverse_order, set_reverse_order] = useState([]);
  const [return_order, set_return_order] = useState([]);
  const [order_item, set_order_item] = useState({
    order_item_id: null,
    quantity: null,
    ne_quantity: null,
  });

  useEffect(() => {
    if (returns?.data?.order) {
      set_reverse_order(returns.data.order);
      set_return_order(returns.data.order);
    }
  }, [id, returns]);

  const handleQty = (value, order_line_id) => {
    let original_quantity = 0;
    reverse_order.forEach((item) => {
      if (item.order_line_id === order_line_id) {
        original_quantity = item.quantity;
      }
    });

    if (original_quantity < value) {
      // Handle invalid quantity case
      toast.error("Quantity cannot exceed the original quantity.");
      return;
    }

    set_order_item((prevOrderItem) => ({
      ...prevOrderItem,
      order_item_id: order_line_id,
      quantity: original_quantity,
      ne_quantity: parseInt(value),
    }));
  };

  const handleReverse = async () => {
    try {
      const res = await orderReverse({
        sales_order_number: id,
        created_by,
      }).unwrap();

      if (res.status === "failed") {
        toast.error("Reverse failed");
      } else {
        toast.success("Reversed successfully");
        navigate("../reverseorderlist");
      }
    } catch (error) {
      toast.error("An error occurred while reversing the order.");
    }
  };

  return (
    <>
      <Row>
        <Col> ***Return Order***</Col>
        <Col sm={8}>
          <span>
            Sales Person:&nbsp;
            {returns?.data?.order_header?.first_name}{" "}
            {returns?.data?.order_header?.last_name}
            &nbsp;&nbsp;&nbsp;Order Number:
            {returns?.data?.order_header?.sales_order_number}
            &nbsp;&nbsp;&nbsp;Order Date:{" "}
            {timeDate.date(returns?.data?.order_header?.sales_order_date)}
            &nbsp;&nbsp;&nbsp;
          </span>
        </Col>
        <Col sm={2}>Total: {returns?.data?.order_header?.grand_total}</Col>
      </Row>
      <hr />
      <Row>
        <Col>#</Col>
        <Col>Item Name</Col>
        <Col>Qty</Col>
        <Col>@</Col>
        <Col>Sub Ttl</Col>
        <Col>New Qty</Col>
        <Col>Add</Col>
      </Row>

      {return_order?.map((item) => (
        <Row key={item.order_line_id}>
          <Col>{item.order_line_id}</Col>
          <Col>{item.item_name}</Col>
          <Col>{item.quantity}</Col>
          <Col>{item.cost_per_item}</Col>
          <Col>{item.total}</Col>
          <Col>
            <Form.Control
              type="number"
              value={order_item.ne_quantity || ""}
              onChange={(e) => handleQty(e.target.value, item.order_line_id)}
            />
          </Col>
        </Row>
      ))}
      <hr />
      <Row>
        <Col></Col>
        <Col sm={3}>
          <Stack spacing={2} direction="row">
            <Button variant="outlined" color="error" onClick={handleReverse}>
              Reverse Order
            </Button>
          </Stack>
        </Col>
      </Row>
    </>
  );
};

export default ReverseOrderPreview;
