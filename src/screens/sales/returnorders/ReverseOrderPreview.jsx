import React, { useEffect, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateSalesOrderReverseMutation } from "../../../slices/sales/salesOrderReturnApiSlice";
import { useGetSalesLinesByHeaderIdQuery } from "../../../slices/sales/salesOrderLinesApiSlice";

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
    navigate();
  }, [navigate, userInfo]);
  const timeDate = new TimeDate();
  const { id: _new_id } = useParams();
  const id = parseInt(_new_id);
  const { data: posted_sales_order_line_id } =
    useGetSalesLinesByHeaderIdQuery(id);
  const [orderReverse, { isLoading }] = useCreateSalesOrderReverseMutation();

  const [reverse_order, set_reverse_order] = useState([]);
  const [return_order, set_return_order] = useState([]);
  const [order_item, set_order_item] = useState({
    order_item_id: null,
    quanitiy: null,
    ne_quantity: null,
  });
  useEffect(() => {
    set_reverse_order(posted_sales_order_line_id?.data.order);
    set_return_order(posted_sales_order_line_id?.data.order);
  }, [id, posted_sales_order_line_id]);

  const handleQty = (value, order_line_id) => {
    let orginal_quantity = 0;
    let y = reverse_order.map((item) => {
      if (item.order_line_id == order_line_id) {
        orginal_quantity = item.quantity;
      }
    });

    if (orginal_quantity < value) {
    }

    return_order.map((item) => {
      if (item.order_line_id == order_line_id) {
        set_order_item({
          ...order_item,
          quantity: item.quanitiy,
          ne_quantity: parseInt(value),
        });
      }
    });
  };
  const handleReverse = async (e) => {
    try {
      const res = await orderReverse({
        sales_order_number: id,
        created_by,
      }).unwrap();
      if (res.status == "failed") {
        toast.error("Reverse failed");
      } else {
        toast.success("Reversed successfully");
        navigate("../reverseorderlist");
      }
    } catch (error) {}
  };

  return (
    <>
      <Row>
        <Col> ***Return Order***</Col>
        <Col sm={8}>
          <span>
            Sales Person:&nbsp;
            {posted_sales_order_line_id?.data?.order_header?.first_name}
            {"  "}
            {posted_sales_order_line_id?.data?.order_header?.last_name}
            &nbsp;&nbsp;&nbsp;Order Number:
            {
              posted_sales_order_line_id?.data?.order_header?.sales_order_number
            }{" "}
            &nbsp;&nbsp;&nbsp;Order Date:{" "}
            {timeDate.date(
              posted_sales_order_line_id?.data?.order_header?.sales_order_date
            )}
            &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
          </span>
        </Col>
        <Col sm={2}>
          Total:
          {posted_sales_order_line_id?.data?.order_header?.grand_total}
        </Col>
      </Row>
      <hr></hr>
      <Row>
        <Col>#</Col>
        <Col>Item Name</Col>
        <Col>Qty</Col>
        <Col>@</Col>
        <Col>Sub Ttl</Col>
        <Col>New Qty</Col>
        <Col>Add</Col>
      </Row>

      {return_order?.map((item, index) => (
        <Row>
          <Col>{item.order_line_id}</Col>
          <Col>{item.item_name}</Col>
          <Col>{item.quantity}</Col>
          <Col>{item.cost_per_item}</Col>
          <Col>{item.total}</Col>
        </Row>
      ))}
      <hr></hr>
      <Row>
        <Col></Col>

        <Col sm={3}>
          <Stack spacing={2} direction="row">
            <Button variant="outlined" color="error" onClick={handleReverse}>
              REVERSE ORDER
            </Button>
          </Stack>
        </Col>
      </Row>
    </>
  );
};

export default ReverseOrderPreview;
